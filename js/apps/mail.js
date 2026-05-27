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
                .sort((a, b) => {
                    if (a.unread && !b.unread) return -1;
                    if (!a.unread && b.unread) return 1;
                    if (a.pinned && !b.pinned) return -1;
                    if (!a.pinned && b.pinned) return 1;
                    
                    return 0; 
                });
        },

        getUnreadCount(folderName) {
            return this.$store.system.mailData.filter(msg => msg.folder === folderName && msg.unread).length;
        }
    }));
});