document.addEventListener('alpine:init', () => {
    Alpine.data('ShutdownScreenApp', () => ({
        htmlContent: '',

        async init() {
            const response = await fetch('views/shutdown.html');
            this.htmlContent = await response.text();
        }
    }));
});