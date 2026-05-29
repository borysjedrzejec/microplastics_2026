document.addEventListener('alpine:init', () => {
    
    Alpine.data('corpChatApp', (payload) => ({
        isLoadingView: true,
        viewError: false,
        selectedContact: null,

        get contacts() {
            let storeContacts = this.$store.system.chatContacts;
            if (!storeContacts || storeContacts.length === 0) {
                storeContacts = window.ChatContactsData || [];
                // Inicjalizacja flagi nieprzeczytanych wiadomości dla pewności
                storeContacts.forEach(c => c.hasUnread = c.hasUnread || false);
                this.$store.system.chatContacts = storeContacts; 
            }
            return storeContacts;
        },

        init() {
            fetch('views/corpchat.html')
                .then(res => {
                    if (!res.ok) throw new Error('No view found for: corpchat.html');
                    return res.text();
                })
                .then(html => {
                    this.$refs.viewContainer.innerHTML = html;
                    this.isLoadingView = false;
                    
                    if (this.contacts && this.contacts.length > 0) {
                        this.selectContact(this.contacts[0]);
                    }
                })
                .catch(err => {
                    console.error("Critical error in CorpChat:", err);
                    this.viewError = true;
                    this.isLoadingView = false;
                });
        },

        selectContact(contact) {
            this.selectedContact = contact;
            this.selectedContact.hasUnread = false; // Odczytanie kasuje miganie
            this.scrollToBottom();
        },

        canSeeOption(option) {
            if (option.used) return false;
            if (typeof option.condition !== 'function') return true;
            return option.condition(this.$store.system);
        },

        // DRY: Wydzielona funkcja do odtwarzania dźwięku
        playSound(filename) {
            if (!Alpine.store('accessibility').disableAudio) {
                try { 
                    const audio = new Audio(`sounds/${filename}.mp3`);
                    audio.volume = 0.5;
                    audio.play(); 
                } catch(e) {}
            }
        },

        sendMessage(option) {
            if (!this.selectedContact) return;

            // Zabezpieczenie przed błędem asynchronicznym! Zapisujemy referencję do obecnego kontaktu.
            const targetContact = this.selectedContact;

            option.used = true;

            if (typeof option.action === 'function') {
                option.action(this.$store.system);
            }

            targetContact.history.push({
                sender: 'player',
                text: option.text
            });

            this.playSound('ding');
            this.scrollToBottom();

            // NPC Response Delay
            if (option.reply) {
                setTimeout(() => {
                    targetContact.history.push({
                        sender: 'npc',
                        text: option.reply
                    });
                    
                    this.playSound('chord');
                    
                    // Jeśli gracz w międzyczasie zmienił okno chatu na inne, ustawiamy powiadomienie
                    if (this.selectedContact?.id !== targetContact.id) {
                        targetContact.hasUnread = true;
                    } else {
                        // Jeśli nadal jesteśmy w tym samym czacie, po prostu zjedź w dół
                        this.scrollToBottom();
                    }
                }, 1500); 
            }
        },

        scrollToBottom() {
            this.$nextTick(() => {
                const container = document.getElementById('chat-history-container');
                if (container) {
                    container.scrollTop = container.scrollHeight;
                }
            });
        }
    }));
});