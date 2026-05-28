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
        },

        'q4_audit_report': {
        isLocked: false,
        grid: [
            [ 
                { type: 'header', value: 'Department' }, 
                { type: 'header', value: 'Initial Budget' }, 
                { type: 'header', value: 'Adjustment (Decision)' } 
            ],
            [ 
                { type: 'text', value: 'Public Relations' }, 
                { type: 'text', value: '£85,000' }, 
                { type: 'text', value: 'Approved - No changes' } 
            ],
            [ 
                { type: 'text', value: 'IT & Cybersecurity' }, 
                { type: 'text', value: '£12,000' }, 
                { 
                    type: 'interactive', 
                    id: 'cell_cyber_budget', 
                    selectedValue: null,
                    options: [
                        { text: '-- Select Action --', value: null, points: 0, path: 'neutral' },
                        { text: 'Slash to £5,000', value: 'opt1', points: 15, path: 'bad' },
                        { text: 'Increase to £50,000', value: 'opt2', points: 20, path: 'good' },
                        { text: 'Maintain current funding', value: 'opt3', points: 5, path: 'neutral' }
                    ]
                }
            ],
            [ 
                { type: 'text', value: 'R&D (Project "Ouroboros")' }, 
                { type: 'text', value: '£2,500,000' }, 
                { 
                    type: 'interactive', 
                    id: 'cell_rnd_budget', 
                    selectedValue: null,
                    options: [
                        { text: '-- Select Action --', value: null, points: 0, path: 'neutral' },
                        { text: 'Authorize full release', value: 'opt1', points: 25, path: 'bad' },
                        { text: 'Halt operations immediately', value: 'opt2', points: 15, path: 'good' },
                        { text: 'Request internal audit', value: 'opt3', points: 10, path: 'neutral' }
                    ]
                }
            ]
        ]
    }
};