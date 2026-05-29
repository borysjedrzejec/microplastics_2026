document.addEventListener('alpine:init', () => {
    Alpine.data('MailReaderApp', (payload) => ({
        htmlContent: 'Loading message...',
        message: null,

        async init() {
            const response = await fetch('views/mail_reader.html');
            this.htmlContent = await response.text();
            
            if (payload && payload.id) {
                this.message = this.$store.system.mailData.find(m => m.id === payload.id);
                
                if (this.message) {
                    this.message.unread = false; 
                    
                    if (this.$store.system.evaluateMailRead) {
                        this.$store.system.evaluateMailRead(this.message.id);
                    }
                }
            }
        }
    }));
});