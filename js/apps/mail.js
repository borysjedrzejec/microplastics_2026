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
            return this.$store.system.mailData
                .filter(msg => msg.folder === this.currentFolder)
                .sort((a, b) => (b.pinned ? 1 : 0) - (a.pinned ? 1 : 0) || (b.unread ? 1 : 0) - (a.unread ? 1 : 0));
        },

        getUnreadCount(folderName) {
            return this.$store.system.mailData.filter(msg => msg.folder === folderName && msg.unread).length;
        }
    }));
});