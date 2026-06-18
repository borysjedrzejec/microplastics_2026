window.GameTasksData = {
    // 0. TUTORIAL
    tutorial_email: {
        id: 'tutorial_email',
        title: 'Tutorial: Email about the new chat tool',
        description: 'The IT department has sent instructions regarding CorpChat. Read the message from Sonique.',
        status: 'active',
        onMailRead: (system, mailId) => {
            if (mailId === 'sys-mail-0') {
                system.processConsequences({
                    completeTask: 'tutorial_email',
                    triggerTasks: ['task_1_afonso_goal'],
                    npcMessages: [{
                        contactId: 'team_manager',
                        delay: 1000,
                        text: [
                            "Could you do me a quick favour?",
                            "Check online for the exact environmental goal 2030. I am supporting Lauren today & need this info for an important draft. Thanks."
                        ]
                    }]
                });
            }
        }
    },

    // 1. ZADANIE AFONSO
    task_1_afonso_goal: {
        id: 'task_1_afonso_goal',
        title: 'Check the 2030 environmental goal',
        description: 'Afonso asked you to verify the government\'s 2030 environmental goal on the official gov website.',
        status: 'hidden'
        // To zadanie jest rozwiązywane w całości przez dialog w chat_data.js
    },

    // 2. ZADANIE LAUREN
    task_2_lauren_password: {
        id: 'task_2_lauren_password',
        title: 'Delete Sophia\'s email',
        description: 'Log into Sophia\'s intranet account (Hint: pet Fluffy, year 1990) and delete the .msg file about plastic forks.',
        status: 'hidden',

        // ZMIANA: Zostawiamy tu TYLKO wyzwolenie Nitharshana. 
        // Punkty i ankietę dodamy w chat_data.js, bo zależą od opcji dialogowej.
        onCompleteConsequences: {
            triggerTasks: ['task_3_nithy_xls'],
            npcMessages: [{
                contactId: 'site_manager',
                delay: 2000,
                text: [
                    "Hi, I hope this message finds you well. I see you're helping out HR today.",
                    "I require you to take a look at 2025 Offshore assets compliance review.xls’. It seems that the inputs are incorrect. We are fully compliant, yet the document does not reflect this.",
                    "Please revert back to me at your earliest convenience. "
                ]
            }]
        },

        onFailConsequences: {
            triggerTasks: ['task_3_nithy_xls'],
            npcMessages: [{
                contactId: 'site_manager',
                delay: 2000,
                text: [
                    "Hi, I hope this message finds you well. I see you're having some issues with HR today.",
                    "I require you to take a look at 2025 Offshore assets compliance review.xls’. It seems that the inputs are incorrect. We are fully compliant, yet the document does not reflect this.",
                    "Please revert back to me at your earliest convenience. "
                ]
            }]
        }
    },

    // 3. ZADANIE NITHARSHANA
    task_3_nithy_xls: {
        id: 'task_3_nithy_xls',
        title: 'Smooth out the compliance spreadsheet',
        description: 'Nithy wants you to change "2025 Offshore assets compliance review.xls" so that it shows the company is compliant.',
        status: 'hidden',

        onCompleteConsequences: {
            triggerTasks: ['task_4_andrzej_kim'],
            npcMessages: [{
                contactId: 'regional_manager', // Andrzej
                delay: 2000,
                text: [
                    "Listen, I need you to sort something out. Not for me, for the company. For your own sake.",
                    "Log into Kim's account and wipe that '2025-2026 biodiversity management report'. It's based on the data form that one biased auditor and it can get us into trouble.",
                    "Thank you from the mountain."
                ]
            }]
        },

        onFailConsequences: {
            triggerTasks: ['task_4_andrzej_kim'],
            npcMessages: [{
                contactId: 'regional_manager',
                delay: 2000,
                text: [
                    "I heard you messed up Nithy's compliance report. Not my circus, not my monkeys.",
                    "But don't do that to me.",
                    "Log into Kim's account and wipe that '2025-2026 biodiversity management report'. It's based on the data form that one biased auditor and it can get us into trouble.",
                    "Thank you from the mountain."
                ]
            }]
        }
    },

    // 4. ZADANIE ANDRZEJA
    task_4_andrzej_kim: {
        id: 'task_4_andrzej_kim',
        title: 'Delete Kim\'s report',
        description: 'Andrzej asked you to access Kim\'s account and delete the "2025-2026 biodiversity management report".',
        status: 'hidden',

        onCompleteConsequences: {
            triggerTasks: ['task_5_nithy_stanley'],
            points: { corporat: 'max', centrist: 'medium', activist: 'zero' },
            npcMessages: [{
                contactId: 'site_manager',
                delay: 2000,
                text: [
                    "Hi, I hope this message finds you well. I see you're helping out Andrzej today.",
                    "We just got a heads up that a third party will be accessing the intranet soon.",
                    "Please access Stanley's account and take care of the private emails between him, Craig and Finlay. It's urgent."
                ]
            }]
        },

        onFailConsequences: {
            triggerTasks: ['task_5_nithy_stanley'],
            npcMessages: [{
                contactId: 'site_manager',
                delay: 2000,
                text: [
                    "Hi, I hope this message finds you well.",
                    "We just got a heads up that a third party will be accessing the intranet soon.",
                    "Please access Stanley's account and take care of the private emails between him, Craig and Finlay. It's urgent."
                ]
            }]
        }
    },

    // 5. ZADANIE NITHARSHANA (STANLEY)
    task_5_nithy_stanley: {
        id: 'task_5_nithy_stanley',
        title: 'Delete Stanley\'s correspondence',
        description: 'Nithy requested that you access Stanley\'s account and delete his emails with Craig and Finlay.',
        status: 'hidden',
        deletedFiles: [],

        onCompleteConsequences: {
            triggerTasks: ['task_6_afonso_report'],
            npcMessages: [{
                contactId: 'team_manager',
                delay: 2500,
                text: [
                    "I have an emergency draft of the 2030 Annual Report.", 
                    "Change the wording regarding emissions to make to smooth over the report. We need to keep the grant funding coming in."
                ]
            }]
        },

        onFailConsequences: {
            triggerTasks: ['task_6_afonso_report'],
            npcMessages: [{
                contactId: 'team_manager',
                delay: 2500,
                text: [
                    "I have an emergency draft of the 2030 Annual Report.", 
                    "Change the wording regarding emissions to make to smooth over the report. We need to keep the grant funding coming in."
                ]
            }]
        }
    },

    // 6. ZADANIE AFONSO (RAPORT)
    task_6_afonso_report: {
        id: 'task_6_afonso_report',
        title: 'Polish the 2030 Annual Report',
        description: 'Afonso asked you to adjust the wording regarding emissions inthe annual report draft, so the company seems compliant.',
        status: 'hidden',

        onCompleteConsequences: {
            triggerTasks: ['task_7_sonique_chat', 'task_8_andrzej_tax'],
            npcMessages: [
                {
                    contactId: 'it_support',
                    delay: 2000,
                    text: ["Hey, noticed you're handling a ton of traffic right now. How are you holding up with all these management requests?"]
                },
                {
                    contactId: 'regional_manager',
                    delay: 5000,
                    text: ["Check the internet. I need to know the exact percentage discount we'll get on Gas if we secure a climate change agreement."]
                }
            ]
        },

        onFailConsequences: {
            triggerTasks: ['task_7_sonique_chat', 'task_8_andrzej_tax'],
            npcMessages: [
                {
                    contactId: 'it_support',
                    delay: 2000,
                    text: ["Hey, noticed you're handling a ton of traffic right now. How are you holding up?"]
                },
                {
                    contactId: 'regional_manager',
                    delay: 5000,
                    text: ["Check the internet. I need to know the exact percentage discount we'll get on Gas if we secure a climate change agreement."]
                }
            ]
        }
    },

    // 7. ZADANIE SONIQUE (ROZMOWA)
    task_7_sonique_chat: {
        id: 'task_7_sonique_chat',
        title: 'Chat with Sonique',
        description: 'Sonique messaged you about your workload and contract. Reply to her.',
        status: 'hidden',
        
        // Odpali się automatycznie, gdy czat zakończy to zadanie
        onCompleteConsequences: {
            triggerTasks: ['task_9_lauren_salary'],
            npcMessages: [{
                contactId: 'hr_consultant', // Upewnij się, że to poprawne ID Lauren
                delay: 2000,
                text: [
                    "Hi. I hope your day is proceeding smoothly. I am reaching out regarding a somewhat delicate matter.",
                    "It has been brought to my attention that you might have been discussing the particulars of your employment contract and remuneration with colleagues on company time. May I ask if this was indeed the case?"
                ]
            }]
        }
    },

    // 8. ZADANIE ANDRZEJA (PODATEK)
    task_8_andrzej_tax: {
        id: 'task_8_andrzej_tax',
        title: 'Find info on climate discount',
        description: 'Andrzej needs the exact percentage discount for Gas under a climate change agreement. Search the web.',
        status: 'hidden'
    },

    // 9. ZADANIE LAUREN (PENSJA)
    task_9_lauren_salary: {
        id: 'task_9_lauren_salary',
        title: 'Reply to Lauren',
        description: 'Lauren is asking if you were discussing your contract during work hours.',
        status: 'hidden',
        
        onCompleteConsequences: {
            triggerTasks: ['task_10_afonso_profit'],
            npcMessages: [{
                contactId: 'team_manager', 
                delay: 1500,
                text: [
                    "Q3 sheet is a disaster.",
                    "We are 30k in the red. If Lauren sees this, my head rolls. Yours probably too.",
                    "Move the operational costs to Q4. We need to show at least 40k profit.",
                    "Done?"
                ]
            }]
        },

        onFailConsequences: {
            triggerTasks: ['task_10_afonso_profit'],
            npcMessages: [{
                contactId: 'team_manager', 
                delay: 1500,
                text: [
                    "Q3 sheet is a disaster.",
                    "We are 30k in the red. If Lauren sees this, my head rolls. Yours probably too.",
                    "Move the operational costs to Q4. We need to show at least 40k profit.",
                    "Done?"
                ]
            }]
        }
    },

    // 10. ZADANIE AFONSO (PROFIT EXCEL)
    task_10_afonso_profit: {
        id: 'task_10_afonso_profit',
        title: 'Adjust team profitability',
        description: 'Afonso wants you to change the profit excel document to save his (and your) job.',
        status: 'hidden',

        onCompleteConsequences: {
            triggerTasks: ['task_11_lauren_questionnaire', 'task_12_andrzej_ai'],
            executeFunction: 'generateSurveyFile',
            npcMessages: [
                {
                    contactId: 'hr_consultant',
                    delay: 2000,
                    text: [
                        "I require your immediate attention regarding the mandatory Temp Worker Survey.",
                        "Kindly ensure it is completed today. Please be advised that failure to submit will, regrettably, result in the immediate termination of your contract."
                    ]
                },
                {
                    contactId: 'regional_manager',
                    delay: 4500,
                    text: [
                        "Listen, Dr Catherine Lin just went on leave and we have a situation.",
                        "I need you to open her document and make the numbers for the AI tool resource usage smaller.",
                        "Board is looking at this today. It must look good. Make the changes quickly, please."
                    ]
                }
            ]
        },

        onFailConsequences: {
            triggerTasks: ['task_11_lauren_questionnaire', 'task_12_andrzej_ai'],
            executeFunction: 'generateSurveyFile',
            npcMessages: [
                {
                    contactId: 'hr_consultant',
                    delay: 2000,
                    text: [
                        "I require your immediate attention regarding the mandatory Temp Worker Survey.",
                        "Kindly ensure it is completed today. Please be advised that failure to submit will, regrettably, result in the immediate termination of your contract."
                    ]
                },
                {
                    contactId: 'regional_manager',
                    delay: 4500,
                    text: [
                        "Listen, Dr Catherine Lin just went on leave and we have a situation.",
                        "I need you to open her document and make the numbers for the AI tool resource usage smaller.",
                        "Board is looking at this today. It must look good. Make the changes quickly, please."
                    ]
                }
            ]
        }
    },

    // 11. ZADANIE LAUREN (ANKIETA)
    task_11_lauren_questionnaire: {
        id: 'task_11_lauren_questionnaire',
        title: 'Fill out HR Questionnaire',
        description: 'Lauren sent you a mandatory questionnaire to fill out.',
        status: 'hidden',
        

        onCompleteConsequences: {
            triggerTasks: ['task_13_lauren_forks'],
            npcMessages: [
            {
                contactId: 'hr_consultant',
                delay: 2000,
                text: [
                    "Thank you for submitting the survey. Whilst I have you...",
                    "Could you access Sophia's account again? There is a report detailing the cost comparison between our current plastic forks, standard cutlery, and an outsourced provisioning service.",
                    "Please delete it entirely. The matter has already been decided upon by the Board, so the file is redundant and merely cluttering the system."
                ]
            }
        ]
        }
    },

    // 12. ZADANIE ANDRZEJA (AI)
    task_12_andrzej_ai: {
        id: 'task_12_andrzej_ai',
        title: 'Adjust AI Resource Report',
        description: 'Andrzej asked you to lower the numbers of how much resources the new AI tool uses.',
        status: 'hidden',

        // Brak triggerowanych akcji - daje tylko punkty (obsłużone w consequences lub przez status)
    },

    // 13. ZADANIE LAUREN (RAPORT O WIDELCACH)
    task_13_lauren_forks: {
        id: 'task_13_lauren_forks',
        title: 'Delete Cutlery Cost Report',
        description: 'Lauren asked you to delete the report about the money spent on plastic forks vs normal cutlery.',
        status: 'hidden',

        onCompleteConsequences: {
            triggerTasks: ['task_14_afonso_invoice', 'task_15_sonique_ai'],
            points: { corporat: 'max', centrist: 'medium', activist: 'zero' },
            npcMessages: [
                {
                    contactId: 'team_manager',
                    delay: 3000,
                    text: [
                        "I have a quick one for you.",
                        "Open the Executive Travel Invoice and change the transport method from 'jet' to 'train'."
                    ]
                },
                {
                    contactId: 'it_support',
                    delay: 5500,
                    text: [
                        "Do you know why Dr. Lin's account was active today?",
                        "Lauren is nagging me about it."
                    ]
                }
            ]
        },

        onFailConsequences: {
            triggerTasks: ['task_14_afonso_invoice', 'task_15_sonique_ai'],
            npcMessages: [
                { contactId: 'team_manager', delay: 3000, text: ["Open the Executive Travel Invoice and change the transport method from 'jet' to 'train'."] },
                { contactId: 'it_support', delay: 5500, text: ["Do you know why Dr. Lin's account was active today? Lauren is nagging me about it."] }
            ]
        }
    },

    // 14. ZADANIE AFONSO (FAKTURA)
    task_14_afonso_invoice: {
        id: 'task_14_afonso_invoice',
        title: 'Edit Executive Invoice',
        description: 'Afonso asked you to change the word "jet" to "train" on the executive travel invoice.',
        status: 'hidden',

        onCompleteConsequences: {
            triggerTasks: ['task_16_nithy_pollution'],
            npcMessages: [{
                contactId: 'site_manager', // Nithy
                delay: 2500,
                text: [
                    "Hi, I hope this message finds you well.",
                    "I require you to take a look at the Net Zero Tech Emissions spreadsheet. It seems the inputs for the pollution metrics are incorrect and need to be lowered.",
                    "I am aware this concerns the aquatic data for your hometown, however, to remain fully compliant with our Water Justice goals, the document must reflect lower numbers.",
                    "Please action this and revert back to me at your earliest convenience."
                ]
            }]
        },

        onFailConsequences: {
            triggerTasks: ['task_16_nithy_pollution'],
            npcMessages: [{
                contactId: 'site_manager', // Nithy
                delay: 2500,
                text: [
                    "Hi, I hope this message finds you well.",
                    "I require you to take a look at the Net Zero Tech Emissions spreadsheet. It seems the inputs for the pollution metrics are incorrect and need to be lowered.",
                    "I am aware this concerns the aquatic data for your hometown, however, to remain fully compliant with our Water Justice goals, the document must reflect lower numbers.",
                    "Please action this and revert back to me at your earliest convenience."
                ]
            }]
        }
    },

    // 15. ZADANIE SONIQUE (AI DOC)
    task_15_sonique_ai: {
        id: 'task_15_sonique_ai',
        title: 'Chat with Sonique about AI Report',
        description: 'Sonique is asking if you know why Dr. Lin\'s AI Resource Raport was active today.',
        status: 'hidden'
    },

    // 16. ZADANIE NITHARSHANA (ZANIECZYSZCZENIE)
    task_16_nithy_pollution: {
        id: 'task_16_nithy_pollution',
        title: 'Adjust Net Zero Pollution Data',
        description: 'Nithy asked you to lower the pollution numbers affecting your childhood area.',
        status: 'hidden',

    }
};

document.addEventListener('alpine:init', () => {
    Alpine.data('TaskManagerApp', () => ({
        htmlContent: '',
        
        async init() {
            try {
                const response = await fetch('views/task_manager.html');
                this.htmlContent = await response.text();
            } catch (error) {
                console.error("Błąd ładowania Task Managera:", error);
            }
        }
    }));
});