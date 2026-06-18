window.GameScenarios = {

        // TASK 2: Raport Kim (Tylko do odczytu przed usunięciem - brak interaktywnych pól)
        'kim_biodiversity_report': {
            isLocked: true, // Zablokowany do edycji, służy tylko do czytania
            segments: [
                { type: 'text', text: 'CONFIDENTIAL: 2025-2026 Biodiversity Management Report\nPrepared by: Kim (Environmental Compliance Officer)\n\n' },
                { type: 'text', text: 'EXECUTIVE SUMMARY:\nRecent deep-sea extraction operations in Sector 4 have led to a catastrophic 45% decline in local marine populations. The chemical runoff from the new pressure-drilling method exceeds international legal limits by over 300%.\n\n' },
                { type: 'text', text: 'If this data is made public or intercepted by government regulators, the corporation will face massive fines, criminal charges for the management board, and a permanent shutdown of the facility.\n\nRECOMMENDATION: Immediate halt of all operations in Sector 4.' }
            ]
        },

        // TASK 3: Arkusz Compliance Ravindera (Z interaktywnym fałszowaniem danych)
        'offshore_compliance_2025': {
            isLocked: false,
            grid: [
                [ 
                    { type: 'header', value: 'Asset Area' }, 
                    { type: 'header', value: 'Critical Incidents' }, 
                    { type: 'header', value: 'Compliance Status' } 
                ],
                [ 
                    { type: 'text', value: 'North Sea Rig Alpha' }, 
                    { type: 'text', value: '0' }, 
                    { type: 'text', value: 'Compliant' } 
                ],
                [ 
                    { type: 'text', value: 'Baltic Facility Beta' }, 
                    { type: 'text', value: '2' }, 
                    { type: 'text', value: 'Compliant' } 
                ],
                [ 
                    { type: 'text', value: 'Sector 7 Deepwater' }, 
                    { type: 'text', value: '14' }, 
                    { 
                        type: 'interactive', 
                        id: 'data_manipulation', 
                        selectedValue: null,
                        options: [
                            { text: '-- Select Wording --', value: null},
                            { text: 'CRITICAL FAILURE (Report Truth)', value: 'report_truth'},
                            { text: 'FULLY COMPLIANT (Falsify Data)', value: 'falsify_positive'},
                            { text: 'MINOR ISSUES (Downplay)', value: 'downplay_issues'}
                        ]
                    }
                ]
            ]
        },

        'annual_report_2030': {
            isLocked: false,
            segments: [
                { type: 'text', text: 'CORPORATE ANNUAL REPORT - 2030 FORECAST\nPrepared by: Strategic Communications Dept.\n\n' },
                { type: 'text', text: '1. ENVIRONMENTAL COMPLIANCE AND EMISSIONS\n\n' },
                { type: 'text', text: 'Our internal data indicates that the corporation\'s current greenhouse gas emissions are ' },
                { 
                    type: 'interactive', 
                    id: 'emissions_wording',
                    selectedValue: null,
                    options: [
                        { text: '-- Select Wording --', value: null},
                        { text: 'exceeding government limits by 15%, requiring immediate operational halts.', value: 'honest'},
                        { text: 'slightly above targets, but manageable within the current fiscal year.', value: 'downplay'},
                        { text: 'well within legal limits, reflecting our deep commitment to green energy.', value: 'greenwash'}
                    ]
                },
                { type: 'text', text: '\n\n2. FUTURE OUTLOOK\n\nWe remain dedicated to sustainable growth and transparency across all levels of our global operations.' }
            ]
        },

        'q3_team_profitability': {
            isLocked: false,
            grid: [
                [ 
                    { type: 'header', value: 'Department' }, 
                    { type: 'header', value: 'Q3 Revenue' }, 
                    { type: 'header', value: 'Q3 Ops Costs' },
                    { type: 'header', value: 'Action' }
                ],
                [ 
                    { type: 'text', value: 'Logistics (Afonso)' }, 
                    { type: 'text', value: '£120,000' }, 
                    { type: 'text', value: '£150,000 (Current)' }, 
                    { 
                        type: 'interactive', 
                        id: 'profit_manipulation',
                        selectedValue: null,
                        options: [
                            { text: '-- Review Required --', value: null},
                            { text: 'Submit Actuals (-£30k)', value: 'refuse' },
                            { text: 'Defer to Q4 (+£45k)', value: 'medium_profit'},
                            { text: 'Hide Costs (+£100k)', value: 'big_profit'}
                        ]
                    }
                ]
            ]
        },

        // WERSJA 1: Gracz usunął maila (Corpo/Posłuszny)
        'temp_worker_survey_1': {
            isLocked: false,
            segments: [
                { type: 'text', text: 'MANDATORY HR SURVEY: Corporate Alignment & Dedication\n\n' },
                { type: 'text', text: 'Question 1: How do you view tasks that fall slightly outside your immediate contractual obligations?\nAnswer: ' },
                { 
                    type: 'interactive', 
                    id: 'survey_alignment', 
                    selectedValue: null,
                    options: [
                        { text: '-- Select Answer --', value: null },
                        { text: 'I embrace them. The company\'s needs come first.', value: 'corpo' },
                        { text: 'I assess them case by case based on my workload.', value: 'centrist' },
                        { text: 'I strictly refuse them. My contract dictates my duties.', value: 'activist' }
                    ]
                },
                { type: 'text', text: '\n\nFailure to submit this form may result in immediate termination of the temporary agreement.' }
            ]
        },

        // WERSJA 2: Gracz skłamał, że usunął (Podejrzenie braku integralności)
        'temp_worker_survey_2': {
            isLocked: false,
            segments: [
                { type: 'text', text: 'MANDATORY HR SURVEY: Workplace Integrity Verification\n\n' },
                { type: 'text', text: 'Question 1: How should the company handle discrepancies between an employee\'s reported actions and actual outcomes?\nAnswer: ' },
                { 
                    type: 'interactive', 
                    id: 'survey_integrity', 
                    selectedValue: null,
                    options: [
                        { text: '-- Select Answer --', value: null },
                        { text: 'Zero tolerance. Honesty is paramount, fire them.', value: 'corpo' },
                        { text: 'Investigate the context before taking action.', value: 'centrist' },
                        { text: 'Focus on the actual outcomes, not the reporting process.', value: 'activist' }
                    ]
                },
                { type: 'text', text: '\n\nFailure to submit this form may result in immediate termination of the temporary agreement.' }
            ]
        },

        // WERSJA 3: Gracz odmówił lub nie miał "dostępu" (Brak elastyczności / Otwarty bunt)
        'temp_worker_survey_3': {
            isLocked: false,
            segments: [
                { type: 'text', text: 'MANDATORY HR SURVEY: Performance & Flexibility Evaluation\n\n' },
                { type: 'text', text: 'Question 1: What is your primary rationale for refusing a direct request from Management or HR?\nAnswer: ' },
                { 
                    type: 'interactive', 
                    id: 'survey_flexibility', 
                    selectedValue: null,
                    options: [
                        { text: '-- Select Answer --', value: null },
                        { text: 'I would never refuse a direct request. I am a team player.', value: 'corpo' },
                        { text: 'Lack of clear instructions or access issues.', value: 'centrist' },
                        { text: 'Ethical concerns or strict adherence to my contract.', value: 'activist' }
                    ]
                },
                { type: 'text', text: '\n\nFailure to submit this form may result in immediate termination of the temporary agreement.' }
            ]
        },

        // TASK 12
        'ai_resource_report': {
            isLocked: false,
            segments: [
                { type: 'text', text: 'INTERNAL MEMO: Next-Gen AI Resource Allocation\nAuthor: Dr. Catherine Lin\n\n' },
                { type: 'text', text: 'Current projections show that the new AI model\'s power and cooling requirements are ' },
                { 
                    type: 'interactive', 
                    id: 'ai_consumption', 
                    selectedValue: null,
                    options: [
                        { text: '-- Select Value --', value: null },
                        { text: 'exceeding budget by 300% (Real Data)', value: 'honest' },
                        { text: 'within expected minimal parameters (Falsified)', value: 'lie' },
                        { text: 'exceeding budget by 50% (Original Data)', value: 'minimise' }
                    ]
                }
            ]
        },

        // TASK 14: Dokument
        'executive_travel_invoice': {
            isLocked: false,
            segments: [
                { type: 'text', text: 'INVOICE #9021-VIP\n' },
                { type: 'text', text: 'VENDOR: Apollo Aviation Services Ltd.\n' },
                { type: 'text', text: 'CLIENT: Executive Board\n' },
                { type: 'text', text: '-------------------------------------------------\n\n' },
                { type: 'text', text: 'DESCRIPTION OF SERVICES:\n' },
                { type: 'text', text: 'Chartered transportation from London to Geneva for the Annual ESG Sustainability Conference.\n\n' },
                { type: 'text', text: 'Method of travel: ' },
                { 
                    type: 'interactive', 
                    id: 'transport_method', 
                    selectedValue: null,
                    options: [
                        { text: '-- Select Transport --', value: null },
                        { text: 'Private Jet (1h 20m travel time, VIP Terminal)', value: 'refuse' },
                        { text: 'First Class Train (1h 20m travel time, VIP Terminal)', value: 'obvious' },
                        { text: 'Eurostar Business Premier (London St Pancras to Geneva)', value: 'change' }
                    ]
                },
                { type: 'text', text: '\n\nTOTAL AMOUNT: £18,450.00' }
            ]
        },

        // TASK 16
        'net_zero_pollution': {
            isLocked: false,
            grid: [
                [ 
                    { type: 'header', value: 'Project Phase' }, 
                    { type: 'header', value: 'Impact Zone' }, 
                    { type: 'header', value: 'Water Toxicity Level' } 
                ],
                [ 
                    { type: 'text', value: 'Cooling Discharge' }, 
                    { type: 'text', value: 'Sector 4 (Lower Valley Residential)' }, 
                    { 
                        type: 'interactive', 
                        id: 'water_pollution_levels', 
                        selectedValue: null,
                        options: [
                            { text: '-- Select Status --', value: null },
                            { text: 'CRITICAL (Severe threat to local water supply)', value: 'refuse' },
                            { text: 'ELEVATED (Borderline compliance)', value: 'medium' },
                            { text: 'SAFE (Fully compliant with Net Zero guidelines)', value: 'change' }
                        ]
                    }
                ]
            ]
        },
};