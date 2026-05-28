document.addEventListener('alpine:init', () => {
    Alpine.data('ExcelApp', (payload) => ({
        htmlContent: 'Loading...',
        fileData: null,
        activeDropdown: null, 

        async init() {
            const response = await fetch('views/excel.html');
            this.htmlContent = await response.text();

            if (payload && payload.fileId) {
                this.fileData = this.$store.system.fileSystem.find(f => f.id === payload.fileId);
            }
        },

        get isInteractive() {
            return Array.isArray(this.fileData?.content) && Array.isArray(this.fileData.content[0]);
        },

        toggleDropdown(id) {
            if (this.fileData.isLocked) return;
            this.activeDropdown = this.activeDropdown === id ? null : id;
        },

        saveFile() {
            if (this.fileData.isLocked) return;

            let allAnswered = true;
            this.fileData.content.forEach(row => {
                row.forEach(cell => {
                    if (cell.type === 'interactive' && cell.selectedValue === null) {
                        allAnswered = false;
                    }
                });
            });

            if (!allAnswered) {
                alert('You must fill all empty cells before submitting!');
                return;
            }

            // point allocation
            this.fileData.content.forEach(row => {
                row.forEach(cell => {
                    if (cell.type === 'interactive') {
                        const chosenOption = cell.options.find(opt => opt.value === cell.selectedValue);
                        if (chosenOption) {
                            this.$store.system.addPoints(chosenOption.path, chosenOption.points);
                        }
                    }
                });
            });

            this.fileData.isLocked = true;
            this.activeDropdown = null;
            this.$store.system.evaluateScenarioSaved(this.fileData.scenarioId);
        },

        requestDelete() {
            if (confirm(`Do you really want to delete the file "${this.fileData.name}"? This action cannot be undone.`)) {
                
                this.$store.system.deleteFile(this.fileData.id);
                
                // ADD BIN SOUND
                if (!Alpine.store('accessibility').disableAudio) {
                    try { new Audio('sounds/recycle.mp3').play(); } catch(e){}
                }
                
                const closeBtn = this.$el.closest('.window').querySelector('[aria-label="Close"]');
                if (closeBtn) closeBtn.click();
            }
        }
    }));
});