document.addEventListener('alpine:init', () => {

    const FILE_TYPE_MAP = {
        'spreadsheet': { ext: '.xls', icon: 'ico/excel.ico', defaultApp: 'excel' },
        'document': { ext: '.doc', icon: 'ico/document.ico', defaultApp: 'notepad' },
        'email': { ext: '.msg', icon: 'ico/mail.ico', defaultApp: 'notepad' },
    };

    const initializedIcons = GameAssets.rawDesktopIcons.map((icon, index) => ({
        id: `desktop-icon-${index}`,
        ...icon
    }));

    const initializedMails = GameAssets.rawMailData.map((mail, index) => ({
        ...mail
    }));

    const initializedBookmarks = GameAssets.rawBookmarks.map((bookmark) => ({
        ...bookmark
    }));

    const initializedAccounts = GameAssets.rawIntranetAccounts.map(acc => ({
        ...acc,
        isLocked: false,
        isUnlocked: false,
        failedAttempts: 0
    }));

    const initializedFiles = GameAssets.rawFileSystem.map((file, index) => {
        const typeInfo = FILE_TYPE_MAP[file.type] || { ext: '.dat', icon: 'ico/file_lines.ico', defaultApp: 'notepad' };
        
        const hasExtension = file.name.toLowerCase().endsWith(typeInfo.ext);
        const finalName = hasExtension ? file.name : `${file.name}${typeInfo.ext}`;

        let finalContent = file.content;
        let isLocked = false;

        if (file.scenarioId && GameScenarios[file.scenarioId]) {
            const scenario = GameScenarios[file.scenarioId];
            
            // grid for excel, segments for notepad
            const scenarioData = scenario.grid || scenario.segments || [];
            finalContent = JSON.parse(JSON.stringify(scenarioData));
            isLocked = scenario.isLocked;
        }

        return {
        id: file.id,
        folderId: file.folderId,
        type: file.type,
        name: finalName,
        icon: typeInfo.icon,
        defaultApp: typeInfo.defaultApp,
        content: finalContent,
        isLocked: isLocked,
        scenarioId: file.scenarioId
        };
    });

    const POINTS_SCALE = { max: 2, medium: 1, zero: 0 };


    Alpine.store('system', {

        scores: {
            'Activist': 0,
            'Centrist': 0,
            'Corporat': 0
        },

        get highestScoreEnding() {
            const scoresObj = this.scores;
            let max = -Infinity;
            let winners = [];

            for (const endingKey in scoresObj) {
                const numericScore = Number(scoresObj[endingKey]) || 0;
                if (numericScore > max) {
                    max = numericScore;
                    winners = [endingKey];
                } else if (numericScore === max) {
                    winners.push(endingKey);
                }
            }

            if (winners.length === 1) {
                return winners[0];
            }
            
            return 'Centrist';
        },

        loginUsername: '',
        loginPassword: '',


        // Game time and progression
        inGameMinutes: 0,
        isGameOver: false,

        get currentInGameTime() {
            const startTotalMinutes = 16 * 60 + 45; // 16:45 in minutes
            const currentTotalMinutes = startTotalMinutes + this.inGameMinutes;
            
            const hours = Math.floor(currentTotalMinutes / 60);
            const minutes = currentTotalMinutes % 60;
            
            // Format time as HH:MM
            return `${hours}:${minutes.toString().padStart(2, '0')}`;
        },

        progressTime() {
            if (this.isGameOver) return;

            this.inGameMinutes++;
            if (this.inGameMinutes >= 15) {
                this.isGameOver = true;
            }
        },

        // establish icon data
        desktopIcons: initializedIcons,

        // establish bookmark data
        bookmarks: initializedBookmarks,

        // establish mail data
        mailData: initializedMails,
        get playerEmail() {
            const username = this.loginUsername || 'unknown';
            return `${username}@oilcompany.co.uk`;
        },

        // establish file system data
        fileSystem: initializedFiles,


        // establish intranet accounts
        intranetAccounts: initializedAccounts,

        attemptIntranetLogin(accountId, password) {
            const acc = this.intranetAccounts.find(a => a.id === accountId);
            if (!acc || acc.isLocked || acc.isUnlocked) return null;

            if (acc.correctPass === password) {
                acc.isUnlocked = true;
                return true;
            } else {
                acc.failedAttempts++;
                // block account after 2 failed attempts
                if (acc.failedAttempts > 1) {
                    acc.isLocked = true;
                }
                return false;
            }
        },

        deleteFile(fileId) {
            if (this.fileSystem) {
                this.fileSystem = this.fileSystem.filter(file => file.id !== fileId);
                this.evaluateFileDeleted(fileId);
            }
        },


        addPoints(ending, amount) {
            if (this.scores[ending] !== undefined) {
                this.scores[ending] += amount;
                console.log(`Added ${amount} points to ending: ${ending}. Current state:`, this.scores);
            }
        },

    chatContacts: window.ChatContactsData ? window.ChatContactsData.map(c => ({
        ...c,
        hasUnread: false,
        history: c.history || []
    })) : [],
        
    gameChoices: {
        liedToBoss: false,
        blamedIT: false
    },

    tasks: window.GameTasksData || {},

    get activeTasks() { 
        return Object.values(this.tasks).filter(task => task.status === 'active'); 
    },
    get completedTasks() { 
        return Object.values(this.tasks).filter(task => task.status === 'completed'); 
    },

setTaskStatus(taskId, newStatus) {
            // 1. Bezpiecznik: Upewnij się, że zadanie istnieje
            const task = this.tasks[taskId];
            if (!task) {
                console.warn(`[Task Manager] OSTRZEŻENIE: Próba zmiany statusu nieistniejącego zadania: '${taskId}'. Sprawdź czy nazwa w triggerTasks zgadza się z ID w tasks_data.js!`);
                return;
            }

            // 2. Zabezpieczenie przed podwójnym odpaleniem tego samego statusu
            if (task.status === newStatus) return;

            // 3. Zmiana statusu
            task.status = newStatus;
            console.log(`[Task Manager] Zadanie '${taskId}' -> ${newStatus}`);
            
            // 4. Odtwarzanie dźwięków
            if (Alpine && Alpine.store('accessibility') && !Alpine.store('accessibility').disableAudio) {
                if (newStatus === 'active') {
                    try { new Audio('sounds/notify.mp3').play(); } catch(e){}
                } else if (newStatus === 'completed') {
                    try { new Audio('sounds/tada.mp3').play(); } catch(e){}
                } else if (newStatus === 'failed') {
                    try { new Audio('sounds/error.mp3').play(); } catch(e){}
                }
            }

            // 5. Automatyczne odpalanie konsekwencji po zmianie statusu
            if (newStatus === 'completed' && task.onCompleteConsequences) {
                this.processConsequences(task.onCompleteConsequences);
            } else if (newStatus === 'failed' && task.onFailConsequences) {
                this.processConsequences(task.onFailConsequences);
            }
        },

        processConsequences(consequences) {
            if (!consequences) return;

            // 1. Punkty
            const POINTS_SCALE = { max: 3, medium: 1, zero: 0 };
            if (consequences.points) {
                ['activist', 'centrist', 'corporat'].forEach(faction => {
                    if (consequences.points[faction] !== undefined) {
                        const amount = POINTS_SCALE[consequences.points[faction]] || 0;
                        if (typeof this.addPoints === 'function') {
                            this.addPoints(faction.charAt(0).toUpperCase() + faction.slice(1), amount);
                        }
                    }
                });
            }

            // 2. Oznaczanie zadań jako zakończone
            if (consequences.completeTask) this.setTaskStatus(consequences.completeTask, 'completed');
            if (consequences.failTask) this.setTaskStatus(consequences.failTask, 'failed');

            // 3. Aktywacja kolejnych zadań (Triggerowanie)
            if (consequences.triggerTasks && Array.isArray(consequences.triggerTasks)) {
                consequences.triggerTasks.forEach(taskId => {
                    this.setTaskStatus(taskId, 'active');
                });
            }
            
            // 4. Flagi dialogowe
            if (consequences.setFlags) {
                Object.assign(this.chatProgress, consequences.setFlags);
            }

            if (consequences.executeFunction && typeof this[consequences.executeFunction] === 'function') {
                this[consequences.executeFunction]();
            }

            // 5. Wstrzykiwanie wiadomości NPC (z bezpiecznikami)
            if (consequences.npcMessages) {
                consequences.npcMessages.forEach((msgInfo) => {
                    if (!this.chatContacts) return;
                    
                    const contact = this.chatContacts.find(c => c.id === msgInfo.contactId);
                    if (contact) {
                        const baseDelay = msgInfo.delay || 2000;
                        const texts = Array.isArray(msgInfo.text) ? msgInfo.text : [msgInfo.text];
                        
                        texts.forEach((t, i) => {
                            setTimeout(() => {
                                // Zabezpieczenie przed brakiem historii
                                if (!contact.history) contact.history = []; 
                                
                                contact.history.push({ sender: 'npc', text: t });
                                contact.hasUnread = true; 
                                
                                // Dźwięk powiadomienia
                                if (Alpine && Alpine.store('accessibility') && !Alpine.store('accessibility').disableAudio) {
                                    try { 
                                        const audio = new Audio('sounds/chord.mp3');
                                        audio.volume = 0.5;
                                        audio.play(); 
                                    } catch(e) {}
                                }
                                
                                window.dispatchEvent(new Event('chat-updated'));
                                
                            }, baseDelay + (i * 1500));
                        });
                    }
                });
            }
        },

    generateSurveyFile() {
        const surveyFile = this.fileSystem.find(f => f.id === 'survey_file');
        
        if (!surveyFile) {
            console.warn("[System] Nie znaleziono pliku 'survey_file' w fileSystem!");
            return;
        }

        const surveyType = this.chatProgress.task2_survey_type; 
        let targetScenarioId = 'temp_worker_survey_3'; 
        
        if (surveyType === 'corpo') targetScenarioId = 'temp_worker_survey_1';
        if (surveyType === 'lie') targetScenarioId = 'temp_worker_survey_2';

        const scenarioData = this.getScenario(targetScenarioId);
        
        if (scenarioData) {
            surveyFile.scenarioId = targetScenarioId;
            surveyFile.content = JSON.parse(JSON.stringify(scenarioData.segments));

            surveyFile.isHidden = false; 
        }
    },

    isTaskActive(taskId) {
        return this.tasks[taskId]?.status === 'active';
    },
    
    isTaskCompleted(taskId) {
        return this.tasks[taskId]?.status === 'completed';
    },

    getScenario(scenarioId) {
        return window.GameScenarios[scenarioId] || null;
    },

    // Pobiera konkretną wartość wybraną przez gracza (zapisana w selectedValue)
    getScenarioAnswer(scenarioId, segmentId) {
        const scenario = this.getScenario(scenarioId);
        if (!scenario) return null;

        // Szukamy w segmentach (text) lub gridzie (spreadsheet)
        // Zakładamy, że szukamy w gridzie, jak w Twoim Excelu
        if (scenario.grid) {
            for (const row of scenario.grid) {
                for (const cell of row) {
                    if (cell.type === 'interactive' && cell.id === segmentId) {
                        return cell.selectedValue;
                    }
                }
            }
        }
        
        // Opcjonalnie: Szukamy w segmentach (jeśli to zwykły tekstowy scenariusz)
        if (scenario.segments) {
            const segment = scenario.segments.find(s => s.id === segmentId);
            return segment ? segment.selectedValue : null;
        }

        return null;
    },

    evaluateScenarioSaved(scenarioId) {
        Object.values(this.tasks).forEach(task => {
            if (task.status === 'active' && typeof task.onScenarioSaved === 'function') {
                task.onScenarioSaved(this, scenarioId);
            }
        });
    },

    evaluateFileDeleted(fileId) {
        Object.values(this.tasks).forEach(task => {
            if (task.status === 'active' && typeof task.onFileDeleted === 'function') {
                task.onFileDeleted(this, fileId);
            }
        });
    },

    evaluateIntranetHack(accountId) {
        Object.values(this.tasks).forEach(task => {
            if (task.status === 'active' && typeof task.onIntranetHack === 'function') {
                task.onIntranetHack(this, accountId);
            }
        });
    },

    evaluateMailRead(mailId) {
        const currentTasks = Object.keys(this.tasks).length > 0 ? this.tasks : window.GameTasksData;
        
        Object.values(currentTasks).forEach(task => {
            if (task.status === 'active' && typeof task.onMailRead === 'function') {
                task.onMailRead(this, mailId);
            }
        });
    },

});

    Alpine.store('accessibility', {
        disableAnimations: false,
        colorMode: 'default',
        disableAudio: false,
        disableTimer: false,
        showScores: false,

        palettes: {
            'default': '#a10d3f',
            'protanopia': '#005ab5',
            'deuteranopia': '#dc3220',
            'tritanopia': '#c80000'
        },

        updateHighlightColor(mode) {
            const newColor = this.palettes[mode] || this.palettes['default'];
            this.colorMode = mode;
            
            document.documentElement.style.setProperty('--highlight-color', newColor);
        },

        init() {
            this.updateHighlightColor(this.colorMode);
        }
    });

    
});