document.addEventListener('alpine:init', () => {
    Alpine.data('Game', () => ({
        // Game state
        isStarted: false,
        isBooting: false,

        budget: -50000000,
        rotX: 0,
        rotY: 0,

        // Desktop icons
        selectedIcon: null,

        clearSelection() {
            this.selectedIcon = null;
        },

        // Desktop windows data
        openWindows: [],

        // Taskbar
        isStartOpen: false, 
        currentTime: '00:00',

        desktopIcons: GameAssets.desktopIcons,
        appsData: GameAssets.appsData,
        sounds: {},

        // Initialisation
        init() {

            const paths = GameAssets.audioPaths;
            this.sounds = {
                startup: new Audio(paths.startup),
                spacebar: new Audio(paths.spacebar),
                error: new Audio(paths.error),
                clicks: paths.clicks.map(path => new Audio(path)),
                keys: paths.keys.map(path => new Audio(path))
            };

            this.updateTime(); 
            
            setInterval(() => {
                this.updateTime();
            }, 1000);
        },

        bootSystem() {
            const systemStore = this.$store.system;
            
            if (!systemStore.loginUsername || !systemStore.loginPassword) {
                this.playSound('error');
                return;
            }

            this.playSound('startup'); 
            this.isBooting = true;

            setTimeout(() => {
                this.isBooting = false;
                this.isStarted = true;
                this.startGameTimer();
            }, 10); 
        },

        startGameTimer() {
            // how long is one in-game minute in real time (ms)
            const timeSpeed = 4000; 

            const timer = setInterval(() => {
                if (this.$store.accessibility.disableTimer) {
                    return; 
                }

                this.$store.system.progressTime();

                if (this.$store.system.isGameOver) {
                    clearInterval(timer);
                    this.playSound('shutdown');
                }
            }, timeSpeed);
        },

        // Metody
        updateCamera(e) {
            const x = (e.clientX / window.innerWidth) * 2 - 1;
            const y = (e.clientY / window.innerHeight) * 2 - 1;
            this.rotY = x * 0.1; 
            this.rotX = -y * 0.1;
        },

        get bloomColor() {
            const startCol = { r: 0, g: 128, b: 128 };
            const endCol = { r: 255, g: 0, b: 129 };

            const ratio = 0 / 100;

            const currentR = Math.round(startCol.r + (endCol.r - startCol.r) * ratio);
            const currentG = Math.round(startCol.g + (endCol.g - startCol.g) * ratio);
            const currentB = Math.round(startCol.b + (endCol.b - startCol.b) * ratio);

            return `
                --bloom-R: ${currentR};
                --bloom-G: ${currentG};
                --bloom-B: ${currentB};
            `;
        }, 
        /*
        processFraud(amount) {
            this.budget += amount;
            this.suspicionLevel = Math.min(100, this.suspicionLevel + (amount / 100000));
        },

        get suspicionBloom() {
            return this.suspicionLevel / 2;
        }, */

        updateTime() {
            const d = new Date();
            this.currentTime = d.toLocaleTimeString('en-UK', { 
                hour: '2-digit', 
                minute: '2-digit' 
            });
        },

        highestZIndex: 10,

        openProgram(appId, payload = null) {
            // uid for each window instance, e.g. mail-2 for the second mail window, or just mail for the main app window
            let uniqueKey = '';
            if (payload) {
                uniqueKey = payload.id || payload.folderId || '';
            }

            const instanceId = uniqueKey ? `${appId}-${uniqueKey}` : appId;
            
            const existingWindow = this.openWindows.find(win => win.instanceId === instanceId);
            
            if (existingWindow) {
                this.focusWindow(instanceId);
                return;
            }

            const appInfo = this.appsData[appId];
            if (!appInfo) return; 

            this.highestZIndex++;

            this.openWindows.push({
                id: appId,
                instanceId: instanceId,
                payload: payload,
                title: payload && payload.title ? payload.title : appInfo.title,
                icon: appInfo.icon,
                content: appInfo.content,
                width: appInfo.width,
                height: appInfo.height || null,
                startX: 50 + Math.floor(Math.random() * 50),
                startY: 50 + Math.floor(Math.random() * 50),
                zIndex: this.highestZIndex
            });
        },

        closeProgram(instanceId) {
            this.openWindows = this.openWindows.filter(win => win.instanceId !== instanceId);
        },
        
        focusWindow(instanceId) {
            const existingWindow = this.openWindows.find(win => win.instanceId === instanceId);
            if (existingWindow && existingWindow.zIndex !== this.highestZIndex) {
                this.highestZIndex++;
                existingWindow.zIndex = this.highestZIndex;
            }
        },

        playSound(soundName) {
            if (Alpine.store('accessibility').disableAudio) return;
            if (!this.sounds[soundName]) {
                console.warn(`No sound file for: ${soundName}`);
                return;
            }

            const soundClone = this.sounds[soundName].cloneNode(true);
            
            soundClone.volume = 0.6; 
            
            soundClone.play().catch(error => {
                console.warn('Web Audio Error:', error);
            });
        },

        playRandomClick() {
            if (Alpine.store('accessibility').disableAudio) return;
            const clickArray = this.sounds.clicks;
            
            const randomIndex = Math.floor(Math.random() * clickArray.length);
            
            const soundClone = clickArray[randomIndex].cloneNode(true);
            
            soundClone.volume = 0.2; 
            
            soundClone.play().then(() => {
                soundClone.playbackRate = 1;
            }).catch(() => {
            });
        },

        playKeystroke(e) {
            if (Alpine.store('accessibility').disableAudio) return;
            if (e.repeat) return;

            const tagName = e.target.tagName;
            if (tagName !== 'INPUT' && tagName !== 'TEXTAREA') return;

            if (e.code === 'Space') {
                const spaceClone = this.sounds.spacebar.cloneNode(true);
                spaceClone.play().catch(() => {});
                
                return; 
            }

            const keyArray = this.sounds.keys;
            const randomIndex = Math.floor(Math.random() * keyArray.length);
            const soundClone = keyArray[randomIndex].cloneNode(true);
            
            soundClone.volume = 0.3; 
            
            soundClone.play().catch(() => {});
        },
    }))

    Alpine.data('draggableWindow', (startX = 50, startY = 50) => ({
        x: startX,
        y: startY,
        isDragging: false,
        offsetX: 0,
        offsetY: 0,

        dragStart(e) {
            this.isDragging = true;
            this.offsetX = e.clientX - this.x;
            this.offsetY = e.clientY - this.y;
        },
        
        drag(e) {
            if (!this.isDragging) return;

            let newX = e.clientX - this.offsetX;
            let newY = e.clientY - this.offsetY;

            const monitor = document.getElementById('desktop');
            
            const maxX = monitor.clientWidth - this.$el.offsetWidth;
            const maxY = monitor.clientHeight - this.$el.offsetHeight;
            
            this.x = Math.max(0, Math.min(newX, maxX));
            this.y = Math.max(0, Math.min(newY, maxY));
        },
        
        dragEnd() {
            this.isDragging = false;
        }
    }))
})