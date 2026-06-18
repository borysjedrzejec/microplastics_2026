document.addEventListener('alpine:init', () => {

    Alpine.data('Game', () => ({
        // Game state
        isStarted: false,
        isBooting: false,

        systemScale: 1,
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

            const hardwareWidth = 800;  
            const hardwareHeight = 600;

            const updateScale = () => {
                const scaleX = window.innerWidth / hardwareWidth;
                const scaleY = window.innerHeight / hardwareHeight;
                this.systemScale = Math.min(scaleX, scaleY, 1) * 0.98;
            };

            updateScale();
            window.addEventListener('resize', updateScale);
            

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

                this.openProgram('accessibility');
            }, 10); 
        },

        startGameTimer() {
            // how long is one in-game minute in real time (ms)
            const timeSpeed = 60000; 

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

        updateTime() {
            const d = new Date();
            this.currentTime = d.toLocaleTimeString('en-UK', { 
                hour: '2-digit', 
                minute: '2-digit' 
            });
        },

        highestZIndex: 10,

    openProgram(appId, payload = null) {
        const uniqueKey = payload?.id || payload?.folderId || '';
        const instanceId = uniqueKey ? `${appId}-${uniqueKey}` : appId;
        
        const existingWindow = this.openWindows.find(win => win.instanceId === instanceId);
        if (existingWindow) return this.focusWindow(instanceId);

        const appInfo = this.appsData[appId];
        if (!appInfo) return; 

        const VIRTUAL_WIDTH = 800;
        const TASKBAR_HEIGHT = 36; 
        const VIRTUAL_HEIGHT = 600 - TASKBAR_HEIGHT;

        const safeWidth = Math.min(appInfo.width || 400, VIRTUAL_WIDTH);
        
        const safeHeight = appInfo.height ? Math.min(appInfo.height, VIRTUAL_HEIGHT) : null;

        const maxStartX = Math.max(0, VIRTUAL_WIDTH - safeWidth);
        
        const assumedHeight = safeHeight || 350; 
        const maxStartY = Math.max(0, VIRTUAL_HEIGHT - assumedHeight);

        const startX = Math.min(Math.floor(Math.random() * 40), maxStartX);
        const startY = Math.min(Math.floor(Math.random() * 40), maxStartY);

        this.highestZIndex++;

        this.openWindows.push({
            id: appId,
            instanceId,
            payload,
            title: payload?.title || appInfo.title,
            icon: appInfo.icon,
            content: appInfo.content,
            width: safeWidth,
            height: safeHeight,
            startX, 
            startY, 
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