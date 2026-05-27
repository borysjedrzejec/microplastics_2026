document.addEventListener('alpine:init', () => {
    Alpine.data('FileExplorerApp', (payload) => ({
        htmlContent: 'Loading files...',
        
        currentFolderId: payload && payload.folderId ? payload.folderId : 'project_files',

        async init() {
            const response = await fetch('views/file_explorer.html');
            this.htmlContent = await response.text();
        },

        get folderFiles() {
            const files = this.$store.system.fileSystem.filter(file => file.folderId === this.currentFolderId);
            return files;
        }
    }));
});