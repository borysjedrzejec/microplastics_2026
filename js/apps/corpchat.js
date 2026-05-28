document.addEventListener('alpine:init', () => {
    
    Alpine.data('corpChatApp', (payload) => ({
        isLoadingView: true,
        viewError: false,
        
        selectedContact: null,

        get contacts() {
            return this.$store.system.chatContacts || [];
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
                    
                    if (this.contacts.length > 0) {
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
            this.scrollToBottom();
        },

        canSeeOption(option) {
            if (option.used) return false;
            
            if (typeof option.condition !== 'function') return true;
            
            return option.condition(this.$store.system);
        },

        sendMessage(option) {
            if (!this.selectedContact) return;

            option.used = true;

            if (typeof option.action === 'function') {
                option.action(this.$store.system);
            }

            this.selectedContact.history.push({
                sender: 'player',
                text: option.text
            });

            // UPLOAD SOUND
            if (!Alpine.store('accessibility').disableAudio) {
                try { 
                    const ding = new Audio('sounds/ding.mp3');
                    ding.volume = 0.5;
                    ding.play(); 
                } catch(e) {}
            }

            this.scrollToBottom();

            // npc response delay
            if (option.reply) {
                setTimeout(() => {
                    this.selectedContact.history.push({
                        sender: 'npc',
                        text: option.reply
                    });
                    
                    // UPLOAD SOUND
                    if (!Alpine.store('accessibility').disableAudio) {
                        try { 
                            const chord = new Audio('sounds/chord.mp3');
                            chord.volume = 0.5;
                            chord.play(); 
                        } catch(e) {}
                    }
                    
                    this.scrollToBottom();
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