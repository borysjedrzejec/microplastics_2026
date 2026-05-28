const ChatContactsData = [
    {
        id: 'boss',
        name: 'Director Smith',
        status: 'Online',
        history: [
            { sender: 'npc', text: 'I\'ve noticed changes in the Q3 financial spreadsheet. What did you find?' }
        ],
        options: [
            {
                id: 'boss_report_truth',
                text: '[Truth] I changed the forecasts. The system was double-taxing.',
                used: false,
                condition: (system) => system.chatProgress.boss === 'report_investigation' && 
                                       window.GameScenarios['finance_q3']?.isLocked,
                action: (system) => {
                    system.chatProgress.boss = 'report_resolved_truth';
                },
                reply: 'Good work. I\'ll send the updated file to management.'
            }
        ]
    },
    // add other contacts here
];