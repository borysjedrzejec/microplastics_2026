document.addEventListener('alpine:init', () => {
    Alpine.data('MailApp', () => ({
        htmlContent: 'Loading...',
        messages: [],
        currentFolder: 'inbox',

        async init() {
            const response = await fetch('views/mail.html');
            this.htmlContent = await response.text();
        },

        get filteredMessages() {
            return this.$store.system.mailData.filter(msg => msg.folder === this.currentFolder);
        }
    }));
});