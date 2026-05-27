const GameScenarios = {
        'board_directive_089': {
            isLocked: false,
            segments: [
                { type: 'text', text: 'Following the recent unauthorized data access, the executive board has decided that the cybersecurity budget will be ' },
                { 
                    type: 'interactive', 
                    id: 'q1', 
                    selectedValue: null,
                    options: [
                        { text: 'kept unchanged', value: 'opt1', points: 0, ending: 'neutral' },
                        { text: 'immediately slashed by 50%', value: 'opt2', points: 15, ending: 'bad' },
                        { text: 'increased to match industry standards', value: 'opt3', points: 15, ending: 'good' }
                    ]
                },
                { type: 'text', text: '.\nFurthermore, the system administrator responsible for the incident will be ' },
                { 
                    type: 'interactive', 
                    id: 'q2', 
                    selectedValue: null,
                    options: [
                        { text: 'terminated with severance', value: 'opt1', points: 0, ending: 'neutral' },
                        { text: 'terminated without severance', value: 'opt2', points: 20, ending: 'bad' },
                        { text: 'sent to mandatory compliance training', value: 'opt3', points: 10, ending: 'good' }
                    ]
                },
                { type: 'text', text: ' effective immediately.' }
            ]
        }
        // other scenarios can be added here
};