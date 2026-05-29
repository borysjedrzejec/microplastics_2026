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

        // DANE PERSONALIZACJI
        avatars: ['images/avatars/profile1.png', 'images/avatars/profile2.png', 'images/avatars/profile3.png'],
        selectedAvatar: null,
        
        availablePets: ['none', 'cat', 'dog', 'rabbit', 'hamster'],
        selectedPet: null,
        
        availableInterests: ['Cooking & Baking', 'Gardening', 'Magic', 'Sea creatures', 'Video Games'],
        selectedInterests: [],
        
        globalChipLimit: 3,

        // Obliczana właściwość zliczająca aktualnie zajęte sloty
        get totalChipsUsed() {
            let count = 0;
            if (this.selectedPet) count += 1;
            count += this.selectedInterests.length;
            return count;
        },

        // Logika wyboru zwierzaka (tylko 1)
        togglePet(pet) {
            // Jeśli klikamy w już wybrany, odznaczamy go
            if (this.selectedPet === pet) {
                this.selectedPet = null;
                return;
            }
            // Zabezpieczenie przed przekroczeniem globalnego limitu
            if (!this.selectedPet && this.totalChipsUsed >= this.globalChipLimit) return;
            
            this.selectedPet = pet;
        },

        // Logika wyboru zainteresowań (max 2)
        toggleInterest(interest) {
            const index = this.selectedInterests.indexOf(interest);
            
            if (index > -1) {
                // Odznaczanie
                this.selectedInterests.splice(index, 1);
            } else {
                // Zaznaczanie (sprawdzamy limit subsekcji oraz globalny)
                if (this.selectedInterests.length < 2 && this.totalChipsUsed < this.globalChipLimit) {
                    this.selectedInterests.push(interest);
                }
            }
        },

        // Warunek aktywacji przycisku Boot System
        get canBoot() {
            return this.selectedAvatar !== null && this.totalChipsUsed > 0;
        },

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
            const wallpaperFileName = this.selectedPet ? `${this.selectedPet}.jpg` : '';
            
            Alpine.store('system').desktopWallpaper = (wallpaperFileName === 'none' || !wallpaperFileName) 
                ? 'none' 
                : `images/wallpapers/${wallpaperFileName}`;
            Alpine.store('system').selectedAvatar = this.selectedAvatar;
            Alpine.store('system').selectedPet = this.selectedPet;
            Alpine.store('system').selectedInterests = this.selectedInterests;
            
            const personalizedEmails = ConditionalMailsData.filter(mail => 
                this.selectedInterests.includes(mail.requiredInterest)
            );

            const formattedPersonalizedEmails = personalizedEmails.map((mail, index) => ({
                id: `sys-mail-interest-${index}`,
                ...mail
            }));

            Alpine.store('system').mailData.push(...formattedPersonalizedEmails);
        

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