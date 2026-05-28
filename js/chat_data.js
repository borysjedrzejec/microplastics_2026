window.ChatContactsData = [
    {
        id: 'boss',
        name: 'Director Smith',
        status: 'Online',
        history: [
            { sender: 'npc', text: 'Take care of Directive 089. Extract consequences from the guilty and secure our budget.' }
        ],
        options: [
            {
                id: 'boss_directive_working',
                text: 'I\'m still working on it.',
                used: false,
                condition: (system) => system.isTaskActive('update_board_directive'),
                action: (system) => {},
                reply: 'The management is expecting results. Hurry up.'
            },
            
            // 'increase_budget' + 'fire_without_severance'
            {
                id: 'boss_directive_success',
                text: 'Directive updated. Budget secured, admin fired.',
                used: false,
                condition: (system) => system.isTaskCompleted('update_board_directive'),
                action: (system) => {
                    system.chatProgress.boss = 'directive_done';
                },
                reply: 'Excellent. I\'m glad you understand the priorities of this company.'
            },

            // 'slash_budget'
            {
                id: 'boss_directive_failed',
                text: 'I have made the changes. I slashed the IT budget according to the cutting procedure.',
                used: false,
                condition: (system) => system.tasks['update_board_directive']?.status === 'failed',
                action: (system) => {
                    system.chatProgress.boss = 'furious';
                },
                reply: 'You slashed our own budget for security?! You are fired!'
            }
        ]
    }
];