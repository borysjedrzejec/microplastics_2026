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
        captchaCells: [],
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
            const intervalTime = duration / 5; 
            const loader = setInterval(() => {
                this.progress += Math.floor(Math.random() * 7) + 2; 
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

        // Pomocnicza funkcja do tasowania tablic (algorytm Fisher-Yates) - bardzo przydatna i DRY
        shuffleArray(array) {
            let currentIndex = array.length, randomIndex;
            while (currentIndex !== 0) {
                randomIndex = Math.floor(Math.random() * currentIndex);
                currentIndex--;
                [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
            }
            return array;
        },

        loadRandomCaptcha() {
            const captchas = (typeof GameAssets !== 'undefined' ? GameAssets.rawCaptchas : []) || [];
            
            if (captchas.length === 0) {
                console.error("Błąd systemu: Brak tablicy rawCaptchas!");
                return;
            }
            
            const randomIndex = Math.floor(Math.random() * captchas.length);
            this.currentCaptcha = JSON.parse(JSON.stringify(captchas[randomIndex]));
            this.selectedTiles = [];
            this.captchaError = false;
            this.currentCaptcha.correctTiles = [];

            const totalCells = this.currentCaptcha.gridSize * this.currentCaptcha.gridSize;
            let cells = Array(totalCells).fill({ image: null, isCorrect: false });
            let availableIndices = this.shuffleArray([...Array(totalCells).keys()]);

            // --- ZASTOSOWANIE DRY ---
            // Uniwersalna funkcja pomocnicza do rozstawiania dowolnego typu obiektów
            const placeObjects = (count, imagePool, isCorrect) => {
                for (let i = 0; i < count; i++) {
                    if (availableIndices.length === 0) break;
                    
                    const idx = availableIndices.pop();
                    const randomImg = imagePool[Math.floor(Math.random() * imagePool.length)];
                    const randomRotation = Math.floor(Math.random() * 91) - 45; // Od -45 do +45 stopni
                    
                    cells[idx] = { 
                        image: randomImg, 
                        isCorrect: isCorrect, 
                        rotation: randomRotation 
                    };
                    
                    // Zapisujemy indeks tylko dla poprawnych odpowiedzi
                    if (isCorrect) {
                        this.currentCaptcha.correctTiles.push(idx);
                    }
                }
            };

            // 1. Rozkładamy poprawne obiekty
            placeObjects(this.currentCaptcha.targetCount, this.currentCaptcha.targetObjects, true);

            // 2. Rozkładamy zmyłki (decoys)
            placeObjects(this.currentCaptcha.decoyCount, this.currentCaptcha.decoyObjects, false);

            this.captchaCells = cells;
            this.currentCaptcha.correctTiles.sort((a, b) => a - b);
        },

        toggleTile(index) {
            this.captchaError = false; 
            
            const position = this.selectedTiles.indexOf(index);
            if (position !== -1) {
                this.selectedTiles.splice(position, 1); // Optymalizacja: splice zamiast filter() jest szybsze
            } else {
                this.selectedTiles.push(index);
            }
        },

        solveCaptcha() {
            if (!this.currentCaptcha) return;
            
            // Sortujemy zaznaczenia gracza i sprawdzamy zgodność
            const playerSelection = [...this.selectedTiles].sort((a, b) => a - b);
            const isCorrect = JSON.stringify(playerSelection) === JSON.stringify(this.currentCaptcha.correctTiles);

            if (isCorrect) {
                this.captchaError = false;
                this.currentSite.verified = true; 
                this.runLoader(2000, 'site');     
            } else {
                if (!Alpine.store('accessibility').disableAudio) {
                    new Audio('sounds/error.mp3').play().catch(()=>{});
                }
                
                // Generuje nową captchę natychmiast przy błędzie (zgodnie z logiką gier)
                this.loadRandomCaptcha();
                this.captchaError = true;
            }
        }
    }));
});