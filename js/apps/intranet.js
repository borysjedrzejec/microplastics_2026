document.addEventListener('alpine:init', () => {
    
    Alpine.data('intranetApp', (payload) => ({
        view: 'list', 
        selectedAccount: null,
        errorMessage: '',
        
        selectedPassword: '',
        
        isLoadingView: true,
        viewError: false,

        get accounts() {
            return this.$store.system.intranetAccounts;
        },

        init() {
            fetch('views/intranet.html')
                .then(res => {
                    if (!res.ok) throw new Error('Brak pliku widoku');
                    return res.text();
                })
                .then(html => {
                    this.$refs.viewContainer.innerHTML = html;
                    this.isLoadingView = false;
                })
                .catch(err => {
                    this.viewError = true;
                    this.isLoadingView = false;
                });
        },

        openLogin(account) {
            this.selectedAccount = account;
            this.errorMessage = '';
            this.selectedPassword = '';
            
            if (account.isUnlocked) {
                this.view = 'success';
            } else {
                this.view = 'login';
            }
        },

        goBack() {
            this.selectedAccount = null;
            this.errorMessage = '';
            this.selectedPassword = '';
            this.view = 'list';
        },

        submitPassword() {
            if (this.selectedAccount.isLocked || !this.selectedPassword) return;

            const success = this.$store.system.attemptIntranetLogin(this.selectedAccount.id, this.selectedPassword);

            if (success) {
                if (!Alpine.store('accessibility').disableAudio) {
                    // CHOOSE A DIFFERENT SOUND FOR SUCCESSFUL LOGIN
                    try { new Audio('sounds/startup.mp3').play(); } catch(e){}
                }
                this.view = 'success';
            } else {
                if (!Alpine.store('accessibility').disableAudio) {
                    try { new Audio('sounds/error.mp3').play(); } catch(e){}
                }
                
                if (this.selectedAccount.isLocked) {
                    this.errorMessage = ''; 
                } else {
                    this.errorMessage = 'Invalid password. 1 attempt remaining.';
                    this.selectedPassword = ''; 
                }
            }
        },

        openUserFolder() {
            if (!this.selectedAccount || !this.selectedAccount.isUnlocked) return;
            
            this.$dispatch('open-app', { 
                id: 'file_explorer', 
                payload: { 
                    folderId: this.selectedAccount.targetFolderId, 
                    title: `Intranet: ${this.selectedAccount.name}` 
                } 
            });
        }
    }));
});