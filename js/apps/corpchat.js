document.addEventListener('alpine:init', () => {
    Alpine.data('corpChatApp', (payload) => ({
        isLoadingView: true,
        viewError: false,
        selectedContact: null,

        get contacts() {
            let storeContacts = this.$store.system.chatContacts;
            if (!storeContacts || storeContacts.length === 0) {
                storeContacts = window.ChatContactsData || [];
                // Inicjalizacja flagi z gwarancją reaktywności w Alpine
                storeContacts.forEach(c => {
                    if (typeof c.hasUnread === 'undefined') c.hasUnread = false;
                });
                this.$store.system.chatContacts = storeContacts; 
            }
            return storeContacts;
        },

        get visibleOptions() {
            if (!this.selectedContact || !this.selectedContact.options) return [];
            
            return this.selectedContact.options.filter(option => {
                if (option.used) return false;
                if (typeof option.condition !== 'function') return true;
                return option.condition(this.$store.system);
            });
        },

        init() {
            window.addEventListener('chat-updated', () => this.scrollToBottom());
            
            // 2. NOWY EVENT DO ODŚWIEŻANIA CZATU
            window.addEventListener('force-chat-update', () => {
                if (this.selectedContact) {
                    // Trik Alpine: Rozbicie obiektu wymusza re-render widoku
                    this.selectedContact.options = [...this.selectedContact.options];
                }
            });

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

            const targetContact = this.selectedContact;
            option.used = true;

            // 1. Wiadomość gracza leci od razu
            targetContact.history.push({
                sender: 'player',
                text: option.text
            });

            this.playSound('ding');
            this.scrollToBottom();

            // DRY: Obsługa odpowiedzi NPC (tablica lub pojedynczy string)
            if (option.reply) {
                const messages = Array.isArray(option.reply) ? option.reply : [option.reply];
                const totalMessages = messages.length; // Sprawdzamy ile jest wiadomości

                messages.forEach((msg, index) => {
                    setTimeout(() => {
                        targetContact.history.push({
                            sender: 'npc',
                            text: msg
                        });
                        
                        this.playSound('chord'); // Sygnał nadejścia wiadomości
                        
                        // Zabezpieczenie: jeśli gracz zmienił kontakt, oznaczamy jako nieprzeczytane
                        if (!this.selectedContact || this.selectedContact.id !== targetContact.id) {
                            targetContact.hasUnread = true;
                        } else {
                            this.scrollToBottom();
                        }

                        // OPTYMALIZACJA: Wywołanie konsekwencji dopiero przy OSTATNIEJ wiadomości NPC
                        if (index === totalMessages - 1) {
                            if (typeof option.action === 'function') {
                                option.action(this.$store.system, option);
                            }
                        }
                    }, (index + 1) * 1200); // Kaskadowe opóźnienie dla każdej wiadomości
                });
            } else {
                // Zabezpieczenie: Jeśli opcja dialogowa z jakiegoś powodu nie ma tekstu (reply), 
                // odpal akcję od razu, żeby gra nie utknęła.
                if (typeof option.action === 'function') {
                    option.action(this.$store.system, option);
                }
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