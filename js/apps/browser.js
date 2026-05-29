document.addEventListener('alpine:init', () => {
    
    Alpine.data('browserApp', (payload) => ({
        view: 'closed', 
        nextView: '',
        progress: 0,
        currentSite: null,
        siteContent: null,
        
        isLoadingView: true,
        viewError: false,
        
        currentCaptcha: null,
        selectedTiles: [],
        captchaError: false,

        get bookmarks() {
            return this.$store.system.bookmarks || [];
        },

        init() {
            fetch('views/browser.html')
                .then(res => {
                    if (!res.ok) throw new Error('Brak pliku widoku');
                    return res.text();
                })
                .then(html => {
                    this.$refs.viewContainer.innerHTML = html;
                    this.isLoadingView = false;
                    
                    this.startBrowser(payload); 
                })
                .catch(err => {
                    console.error("Błąd krytyczny przeglądarki:", err);
                    this.viewError = true;
                    this.isLoadingView = false;
                });
        },

        startBrowser(payload) {
            if (payload && payload.targetSiteId) {
                const target = this.bookmarks.find(b => b.id === payload.targetSiteId);
                if (target) {
                    this.playSound();
                    this.openBookmark(target);
                    return;
                }
            }
            this.playSound();
            this.runLoader(4000, 'bookmarks');
        },

        runLoader(duration, targetView) {
            this.view = 'loading';
            this.nextView = targetView;
            this.progress = 0;
            const intervalTime = duration / 20; 
            const loader = setInterval(() => {
                this.progress += Math.floor(Math.random() * 10) + 2; 
                if (this.progress >= 100) {
                    this.progress = 100;
                    clearInterval(loader);
                    setTimeout(() => { this.view = this.nextView; }, 200); 
                }
            }, intervalTime);
        },

        openBookmark(site) {
            this.currentSite = site;
            if (typeof WebsitesContent !== 'undefined' && WebsitesContent[site.id]) {
                this.siteContent = WebsitesContent[site.id];
            } else {
                this.siteContent = { content: '<h2 style="color:red; text-align:center;">Error 404: Page not found</h2>' };
            }
            
            if (this.currentSite.verified) {
                this.runLoader(1000, 'site');
            } else {
                this.loadRandomCaptcha();
                this.runLoader(1500, 'captcha');
            }
        },

        goHome() {
            this.currentSite = null;
            this.siteContent = null;
            this.view = 'bookmarks';
        },

        playSound() {
            if (Alpine.store('accessibility').disableAudio) return;
            try {
                const dialUpSound = new Audio('sounds/dialup.mp3');
                dialUpSound.volume = 0.5;
                dialUpSound.play();
            } catch (e) { console.warn("Błąd audio:", e); }
        },

        // Captcha
        getTileId(index1Based, columns) {
            const i = index1Based - 1; 
            const x = Math.floor(i / columns);
            const y = i % columns;
            return `${y}${x}`; 
        },

        loadRandomCaptcha() {
            const captchas = (typeof GameAssets !== 'undefined' ? GameAssets.rawCaptchas : []) || [];
            
            if (captchas.length === 0) {
                console.error("Błąd systemu: Brak tablicy rawCaptchas w pliku assets.js!");
                return;
            }
            
            const randomIndex = Math.floor(Math.random() * captchas.length);
            this.currentCaptcha = captchas[randomIndex];
            this.selectedTiles = [];
            this.captchaError = false;
        },

        toggleTile(tileId) {
            this.captchaError = false; 
            
            if (this.selectedTiles.includes(tileId)) {
                this.selectedTiles = this.selectedTiles.filter(t => t !== tileId);
            } else {
                this.selectedTiles.push(tileId);
            }
        },

        solveCaptcha() {
            if (!this.currentCaptcha) return;
            const playerSelection = [...this.selectedTiles].sort();
            const correctSelection = [...this.currentCaptcha.correctTiles].sort();
            const isCorrect = JSON.stringify(playerSelection) === JSON.stringify(correctSelection);

            if (isCorrect) {
                this.captchaError = false;
                this.currentSite.verified = true; 
                this.runLoader(2000, 'site');     
            } else {
                if (!Alpine.store('accessibility').disableAudio) {
                    new Audio('sounds/error.mp3').play().catch(()=>{});
                }
                
                this.loadRandomCaptcha();
                
                this.captchaError = true;
            }
        }
    }));
});