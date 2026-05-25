document.addEventListener('alpine:init', () => {

    const initializedMails = GameAssets.rawMailData.map((mail, index) => ({
        id: `sys-mail-${index}`,
        ...mail
    }));

    Alpine.store('system', {
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


        // establish mail data
        mailData: initializedMails,
        get playerEmail() {
            const username = this.loginUsername || 'unknown';
            return `${username}@oilcompany.co.uk`;
        },
    });

    Alpine.store('accessibility', {
        disableAnimations: false,
        disableAudio: false,
        disableTimer: false
    });

    
});