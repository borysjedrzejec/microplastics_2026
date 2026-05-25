document.addEventListener('alpine:init', () => {
    Alpine.data('MailApp', () => ({
        htmlContent: 'Ładowanie...',
        messages: [],
        currentFolder: 'inbox',

        async init() {
            const response = await fetch('views/mail.html');
            this.htmlContent = await response.text();
            this.messages = GameAssets.mailData;
        },

        get filteredMessages() {
            return this.messages.filter(msg => msg.folder === this.currentFolder);
        }
    }));
});