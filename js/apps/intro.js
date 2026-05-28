document.addEventListener('alpine:init', () => {
    Alpine.data('IntroApp', () => ({
        htmlContent: '',
        phase: 'loading',
        activeStep: 0,
        
        isGlitching: false, 
        
        teamImages: [
            'images/team_name/1.png', 
            'images/team_name/2.png', 
            'images/team_name/3.png'
        ],
        gameImages: [
            'images/game_title/1.png', 
            'images/game_title/2.png', 
            'images/game_title/3.png'
        ],

        async init() {
            try {
                const response = await fetch('views/intro.html');
                this.htmlContent = await response.text();
            } catch (error) {
                console.error("Błąd:", error);
                return;
            }

            await this.preloadImages([...this.teamImages, ...this.gameImages]);
            this.runSequenceFlow();
        },

        async runSequenceFlow() {
            this.phase = 'team';
            await this.animateLayers(this.teamImages.length);
            await this.sleep(4000);

            this.phase = 'game';
            this.activeStep = 0;
            await this.animateLayers(this.gameImages.length);
            await this.sleep(4000); 

            this.isGlitching = true;
            await this.sleep(400);

            this.phase = 'customization';
            this.isGlitching = false;
        },

        async animateLayers(totalSteps) {
            for(let i = 1; i <= totalSteps; i++) {
                await this.sleep(2000);
                this.activeStep = i;
            }
        },

        finishIntro() {
            this.phase = 'finished';
        },

        sleep(ms) {
            return new Promise(resolve => setTimeout(resolve, ms));
        },

        preloadImages(urls) {
            return Promise.all(urls.map(url => {
                return new Promise((resolve) => {
                    const img = new Image();
                    img.src = url;
                    img.onload = resolve;
                    img.onerror = resolve;
                });
            }));
        }
    }));
});