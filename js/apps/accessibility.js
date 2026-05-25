document.addEventListener('alpine:init', () => {
    Alpine.data('AccessibilityApp', () => ({
        htmlContent: 'Loading...',
        settings: [],

        async init() {
            const response = await fetch('views/accessibility.html');
            this.htmlContent = await response.text();
            
            this.settings = GameAssets.accessibilityData;
        }
    }));
});