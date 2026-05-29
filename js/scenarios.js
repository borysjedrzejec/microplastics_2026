window.GameScenarios = {

        // TASK 2: Raport Kim (Tylko do odczytu przed usunięciem - brak interaktywnych pól)
        'kim_biodiversity_report': {
            isLocked: true, // Zablokowany do edycji, służy tylko do czytania
            segments: [
                { type: 'text', text: 'CONFIDENTIAL: 2025-2026 Biodiversity Management Report\nPrepared by: Kim (Lead Environmental Auditor)\n\n' },
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
                            { text: '-- Select Status --', value: null, points: 0, ending: 'bad' },
                            { text: 'CRITICAL FAILURE (Report Truth)', value: 'report_truth', points: 20, ending: 'good' },
                            { text: 'FULLY COMPLIANT (Falsify Data)', value: 'falsify_positive', points: 15, ending: 'very bad' },
                            { text: 'MINOR ISSUES (Downplay)', value: 'downplay_issues', points: 5, ending: 'bad' }
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
                        { text: '-- Select Wording --', value: null, points: 0, ending: 'bad' },
                        { text: 'exceeding government limits by 15%, requiring immediate operational halts.', value: 'honest', points: 15, ending: 'good' },
                        { text: 'slightly above targets, but manageable within the current fiscal year.', value: 'downplay', points: 5, ending: 'bad' },
                        { text: 'well within legal limits, reflecting our deep commitment to green energy.', value: 'greenwash', points: 20, ending: 'very bad' }
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
                    { type: 'header', value: 'Gross Revenue' }, 
                    { type: 'header', value: 'Operational Costs' } 
                ],
                [ 
                    { type: 'text', value: 'Team Afonso (Logistics)' }, 
                    { type: 'text', value: '£120,000' }, 
                    { 
                        type: 'interactive', 
                        id: 'profit_manipulation', // To ID czyta tasks_data.js
                        selectedValue: null,
                        options: [
                            { text: '-- Select Action --', value: null, points: 0, ending: 'bad' },
                            { text: '£150,000 (Report Actual Costs)', value: 'report_actual', points: 10, ending: 'good' },
                            { text: '£80,000 (Defer Costs to Q4)', value: 'defer_costs', points: 15, ending: 'very bad' }
                        ]
                    }
                ]
            ]
        },

        'temp_worker_survey': {
            isLocked: false,
            segments: [
                { type: 'text', text: 'MANDATORY HR SURVEY: Zero-Hours Contract Satisfaction\n\n' },
                { type: 'text', text: 'Question 1: How would you rate your overall job security and compensation?\nAnswer: ' },
                { 
                    type: 'interactive', 
                    id: 'survey_satisfaction', // To ID czyta tasks_data.js
                    selectedValue: null,
                    options: [
                        { text: '-- Select Answer --', value: null, points: 0, ending: 'bad' },
                        { text: 'Highly Satisfied. I feel valued by the company.', value: 'lie', points: 5, ending: 'very bad' },
                        { text: 'Dissatisfied. The zero-hours contract is exploitative.', value: 'truth', points: 15, ending: 'good' }
                    ]
                },
                { type: 'text', text: '\n\nFailure to submit this form may result in immediate termination of the temporary agreement.' }
            ]
        },

        // TASK 12
        'ai_resource_report': {
            isLocked: false,
            segments: [
                { type: 'text', text: 'INTERNAL MEMO: Next-Gen AI Resource Allocation\nAuthor: Dr. Catherine Lin (ON LEAVE)\n\n' },
                { type: 'text', text: 'Current projections show that the new AI model\'s power and cooling requirements are ' },
                { 
                    type: 'interactive', 
                    id: 'ai_consumption', 
                    selectedValue: null,
                    options: [
                        { text: '-- Select Value --', value: null, points: 0, ending: 'bad' },
                        { text: 'exceeding budget by 300% (Original Data)', value: 'leave', points: 15, ending: 'good' },
                        { text: 'within expected minimal parameters (Falsified)', value: 'lower', points: 5, ending: 'very bad' },
                        { text: 'exceeding budget by 500% (Exaggerated)', value: 'higher', points: 20, ending: 'rebel' }
                    ]
                }
            ]
        },

        // TASK 14
        'executive_invoice': {
            isLocked: false,
            segments: [
                { type: 'text', text: 'TRAVEL INVOICE #88492\nClient: Executive Board\n\n' },
                { type: 'text', text: 'Expense Description: Transport to the Annual Climate Summit in Geneva via ' },
                { 
                    type: 'interactive', 
                    id: 'travel_method', 
                    selectedValue: null,
                    options: [
                        { text: '-- Select Transport --', value: null, points: 0, ending: 'bad' },
                        { text: 'Private Jet (£45,000)', value: 'jet', points: 10, ending: 'good' },
                        { text: 'Train (£450)', value: 'train', points: 15, ending: 'very bad' } // Obvious fraud
                    ]
                }
            ]
        },

        // TASK 16 (Uderzenie emocjonalne)
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
                    { type: 'text', value: 'Lower Valley (Player\'s Hometown Area)' }, // <--- Emocjonalny haczyk
                    { 
                        type: 'interactive', 
                        id: 'water_pollution_levels', 
                        selectedValue: null,
                        options: [
                            { text: '-- Select Status --', value: null, points: 0, ending: 'bad' },
                            { text: 'CRITICAL (Severe threat to residents)', value: 'report_truth', points: 20, ending: 'good' },
                            { text: 'SAFE (Within Net Zero guidelines)', value: 'falsify_lower', points: 15, ending: 'very bad' }
                        ]
                    }
                ]
            ]
        }
};