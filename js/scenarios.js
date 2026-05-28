const GameScenarios = {
        'board_directive_089': {
            isLocked: false,
            segments: [
                { type: 'text', text: 'Following the recent unauthorized data access, the executive board has decided that the cybersecurity budget will be ' },
                { 
                    type: 'interactive', 
                    id: 'budget_decision', 
                    selectedValue: null,
                    options: [
                        { text: 'kept unchanged', value: 'keep_budget', points: 0, ending: 'neutral' },
                        { text: 'immediately slashed by 50%', value: 'slash_budget', points: 15, ending: 'bad' },
                        { text: 'increased to match industry standards', value: 'increase_budget', points: 15, ending: 'good' }
                    ]
                },
                { type: 'text', text: '.\nFurthermore, the system administrator responsible for the incident will be ' },
                { 
                    type: 'interactive', 
                    id: 'admin_fate', 
                    selectedValue: null,
                    options: [
                        { text: 'terminated with severance', value: 'fire_with_severance', points: 0, ending: 'neutral' },
                        { text: 'terminated without severance', value: 'fire_without_severance', points: 20, ending: 'bad' },
                        { text: 'sent to mandatory compliance training', value: 'send_to_training', points: 10, ending: 'good' }
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
                        { text: 'Slash to £5,000', value: 'slash_cyber_budget', points: 15, path: 'bad' },
                        { text: 'Increase to £50,000', value: 'increase_cyber_budget', points: 20, path: 'good' },
                        { text: 'Maintain current funding', value: 'maintain_cyber_budget', points: 5, path: 'neutral' }
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
                        { text: 'Authorize full release', value: 'authorize_full_release', points: 25, path: 'bad' },
                        { text: 'Halt operations immediately', value: 'halt_operations', points: 15, path: 'good' },
                        { text: 'Request internal audit', value: 'request_audit', points: 10, path: 'neutral' }
                    ]
                }
            ]
        ]
    }
};