document.addEventListener('alpine:init', () => {
    Alpine.data('NotepadApp', (payload) => ({
        htmlContent: 'Loading...',
        fileData: null,
        activeDropdown: null,

        async init() {
            const response = await fetch('views/notepad.html');
            this.htmlContent = await response.text();

            if (payload && payload.fileId) {
                this.fileData = this.$store.system.fileSystem.find(f => f.id === payload.fileId);
            }
        },

        get isInteractive() {
            return Array.isArray(this.fileData?.content);
        },

        toggleDropdown(id) {
            if (this.fileData.isLocked) return;
            this.activeDropdown = this.activeDropdown === id ? null : id;
        },

        saveFile() {
            if (this.fileData.isLocked) return;

            const allAnswered = this.fileData.content
                .filter(seg => seg.type === 'interactive')
                .every(seg => seg.selectedValue !== null);

            if (!allAnswered) {
                alert('You must fill in all the blanks before saving the document!');
                return;
            }

            this.fileData.content.forEach(seg => {
                if (seg.type === 'interactive') {
                    const chosenOption = seg.options.find(opt => opt.value === seg.selectedValue);
                    if (chosenOption) {
                        this.$store.system.addPoints(chosenOption.ending, chosenOption.points);
                    }
                }
            });

            this.fileData.isLocked = true;
            this.activeDropdown = null; 

            if (this.fileData.scenarioId && window.GameScenarios[this.fileData.scenarioId]) {
                const globalScenario = window.GameScenarios[this.fileData.scenarioId];
                
                globalScenario.isLocked = true;
                
                globalScenario.segments.forEach((globalSeg, index) => {
                    if (globalSeg.type === 'interactive' && this.fileData.content[index]) {
                        globalSeg.selectedValue = this.fileData.content[index].selectedValue;
                    }
                });
            }

            if (this.$store.system.evaluateScenarioSaved) {
                this.$store.system.evaluateScenarioSaved(this.fileData.scenarioId);
            }
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