document.addEventListener('alpine:init', () => {
    

    const ENDING = {
        ENDING_A: 'good',
        ENDING_B: 'neutral',
        ENDING_C: 'bad'
    };

    const FILE_TYPE_MAP = {
        'spreadsheet': { ext: '.xls', icon: 'ico/excel.ico', defaultApp: 'excel' },
        'document': { ext: '.doc', icon: 'ico/document.ico', defaultApp: 'notepad' },
    };

    const initializedIcons = GameAssets.rawDesktopIcons.map((icon, index) => ({
        id: `desktop-icon-${index}`,
        ...icon
    }));

    const initializedMails = GameAssets.rawMailData.map((mail, index) => ({
        id: `sys-mail-${index}`,
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
        id: `sys-file-${index}`,
        folderId: file.folderId,
        type: file.type,
        name: finalName,
        icon: typeInfo.icon,
        defaultApp: typeInfo.defaultApp,
        content: finalContent,
        isLocked: isLocked
        };
    });

    Alpine.store('system', {

        scores: {
            [ENDING.ENDING_A]: 0,
            [ENDING.ENDING_B]: 0,
            [ENDING.ENDING_C]: 0
        },

        loginUsername: '',
        loginPassword: '',


        // Game time and progression
        inGameMinutes: 0,
        isGameOver: false,

        get currentInGameTime() {
            const startTotalMinutes = 16 * 60 + 40; // 16:40 in minutes
            const currentTotalMinutes = startTotalMinutes + this.inGameMinutes;
            
            const hours = Math.floor(currentTotalMinutes / 60);
            const minutes = currentTotalMinutes % 60;
            
            // Format time as HH:MM
            return `${hours}:${minutes.toString().padStart(2, '0')}`;
        },

        progressTime() {
            if (this.isGameOver) return;

            this.inGameMinutes++;
            if (this.inGameMinutes >= 20) {
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
            }
        },


        addPoints(ending, amount) {
            if (this.scores[ending] !== undefined) {
                this.scores[ending] += amount;
                console.log(`Added ${amount} points to ending: ${ending}. Current state:`, this.scores);
            }
        }
    });

    Alpine.store('accessibility', {
        disableAnimations: false,
        colorMode: 'default',
        disableAudio: false,
        disableTimer: false,

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