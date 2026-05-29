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

            // BEZPIECZNA SYNCHRONIZACJA
            if (this.fileData.scenarioId && window.GameScenarios[this.fileData.scenarioId]) {
                const globalScenario = window.GameScenarios[this.fileData.scenarioId];
                
                globalScenario.isLocked = true;
                
                console.warn(`[EDYTOR] Rozpoczynam synchronizację pliku: ${this.fileData.scenarioId}`);

                globalScenario.segments.forEach(globalSeg => {
                    if (globalSeg.type === 'interactive') {
                        // DRY: Szukamy dokładnie tego samego segmentu po jego ID, a nie po indeksie
                        const localSeg = this.fileData.content.find(s => s.id === globalSeg.id);
                        
                        if (localSeg) {
                            globalSeg.selectedValue = localSeg.selectedValue;
                            console.log(`[EDYTOR] Skopiowano: ${globalSeg.id} -> ${globalSeg.selectedValue}`);
                        }
                    }
                });
            } else {
                // Jeśli ten błąd się pokaże, oznacza to, że w Twojej definicji 
                // systemu plików brakuje właściwości 'scenarioId'
                console.error("[EDYTOR BŁĄD KRYTYCZNY] Plik nie ma podpiętego prawidłowego scenarioId!");
            }

            // ODPALENIE ZADAŃ
            if (this.$store.system.evaluateScenarioSaved) {
                console.log("[EDYTOR] Wysyłam sygnał do Task Managera...");
                this.$store.system.evaluateScenarioSaved(this.fileData.scenarioId);
            }
        },

        requestDelete() {
            if (confirm(`Do you really want to delete the file "${this.fileData.name}"? This action cannot be undone.`)) {
                
                const deletedFileId = this.fileData.id;

                this.$store.system.deleteFile(deletedFileId);
                
                if (this.$store.system.evaluateFileDeleted) {
                    this.$store.system.evaluateFileDeleted(deletedFileId);
                }
                
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