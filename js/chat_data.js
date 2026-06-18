window.ChatContactsData = [
    // --- AFONSO ---
    {
        id: 'team_manager',
        name: 'Afonso Tavares',
        status: 'Online',
        history: [
            { sender: 'npc', text: 'Could you do me a quick favour? Check online for the exact environmental goal 2030.' }
        ],
        options: [
            // TASK 1: 2030 Goal - POPRAWNA ODPOWIEDŹ
            {
                id: 'afonso_t1_correct',
                text: 'The government mandates a 50% shift to renewable energy sources by 2030.',
                used: false,
                condition: (system) => system.isTaskActive('task_1_afonso_goal'),
                action: (system, option) => system.processConsequences(option.consequences),
                reply: [
                    "That's exactly what I needed.",
                    "Lauren was looking for you, by the way. Check your messages."
                ],
                consequences: {
                    completeTask: 'task_1_afonso_goal',
                    triggerTasks: ['task_2_lauren_password'], // Aktywuje zadanie 2 w Task Managerze
                    points: { activist: 'medium', centrist: 'medium', corporat: 'medium' },
                    
                    // WSTRZYKNIĘCIE WIADOMOŚCI OD LAUREN
                    npcMessages: [
                        {
                            contactId: 'hr_consultant', // Upewnij się, że ID Lauren na liście kontaktów to dokładnie 'hr_consultant'
                            delay: 2000, // Lauren pisze 2 sekundy po Afonso
                            text: [
                                "Hi. I hope all is fine. I need some support, hopefully Afonso already mentioned, however it’s a discreet matter.",
                                "Could you get into Sophia’s account? I’m sure her password has something to do with her cat Fluffy.",
                                "Once in, please delete the email about plastic forks. She asked me to do it, but I don't have access. Thanks!"
                            ]
                        }
                    ]
                }
            },
            
            // TASK 1: 2030 Goal - BŁĘDNA ODPOWIEDŹ
            {
                id: 'afonso_t1_wrong',
                text: 'The government\'s goal for 2030 is a 20% reduction in plastic.',
                used: false,
                condition: (system) => system.isTaskActive('task_1_afonso_goal'),
                action: (system, option) => system.processConsequences(option.consequences),
                reply: [
                    "That doesn't match my notes. I'll figure it out myself.",
                    "Anyway, Lauren was looking for you."
                ],
                consequences: {
                    failTask: 'task_1_afonso_goal',
                    triggerTasks: ['task_2_lauren_password'], // Fabuła i tak idzie dalej
                    points: { activist: 'zero', centrist: 'zero', corporat: 'zero' },
                    
                    // WSTRZYKNIĘCIE WIADOMOŚCI OD LAUREN
                    npcMessages: [
                        {
                            contactId: 'hr_consultant',
                            delay: 2000,
                            text: [
                                "Hi. I hope all is fine. I need some support, hopefully Afonso already mentioned, however it’s a discreet matter.",
                                "Could you get into Sophia’s account? I’m sure her password has something to do with her cat Fluffy.",
                                "OOnce in, please delete the email about plastic forks. She was about to do that before going on leave and asked me to do it for her, but I don’t have access. Thanks!"
                            ]
                        }
                    ]
                }
            },

            // TASK 6: Compliance Wordings
            // Opcja 1: FULLY COMPLIANT (Wartość: 'greenwash')
            {
                id: 'afonso_t6_compliant',
                used: false,
                text: 'The report now says we are fully compliant.',
                reply: ["Excellent. This is exactly what the board needs to see.", "Moving on."],
                condition: (system) => system.isTaskActive('task_6_afonso_report') && 
                                       system.getScenarioAnswer('annual_report_2030', 'emissions_wording') === 'greenwash',
                action: (system, option) => system.processConsequences(option.consequences),
                consequences: {
                    completeTask: 'task_6_afonso_report',
                    triggerTasks: ['task_7_sonique_chat', 'task_8_andrzej_tax'],
                    points: { corporat: 'max', centrist: 'medium', activist: 'zero' },
                }
            },

            // Opcja 2: SOMEWHAT COMPLIANT (Wartość: 'downplay')
            {
                id: 'afonso_t6_medium',
                used: false,
                text: 'It says we are somewhat compliant, still within the OK range.',
                reply: ["Acceptable. It softens the blow without outright lying.", "We have other matters now."],
                condition: (system) => system.isTaskActive('task_6_afonso_report') && 
                                       system.getScenarioAnswer('annual_report_2030', 'emissions_wording') === 'downplay',
                action: (system, option) => system.processConsequences(option.consequences),
                consequences: {
                    completeTask: 'task_6_afonso_report',
                    triggerTasks: ['task_7_sonique_chat', 'task_8_andrzej_tax'],
                    points: { centrist: 'max', corporat: 'medium', activist: 'zero' },
                }
            },

            // Opcja 3: ACTUAL TRUTH (Wartość: 'honest')
            {
                id: 'afonso_t6_truth',
                used: false,
                text: 'I put the actual truth in the report.',
                reply: ["Are you out of your mind?! I told you the report is wrong!", "I'll have to fix this mess myself."] ,
                condition: (system) => system.isTaskActive('task_6_afonso_report') && 
                                       system.getScenarioAnswer('annual_report_2030', 'emissions_wording') === 'honest',
                action: (system, option) => system.processConsequences(option.consequences),
                consequences: {
                    failTask: 'task_6_afonso_report',
                    triggerTasks: ['task_7_sonique_chat', 'task_8_andrzej_tax'],
                    points: { activist: 'max', centrist: 'zero', corporat: 'zero' },
                }
            },

            // Opcja 4: ODMOWA (Zanim gracz cokolwiek wybierze, wartość null)
            {
                id: 'afonso_t6_refuse',
                used: false,
                text: '[Refuse] I don’t think I should be changing official reports.',
                condition: (system) => system.isTaskActive('task_6_afonso_report') && 
                                       !system.getScenarioAnswer('annual_report_2030', 'emissions_wording'),
                action: (system, option) => system.processConsequences(option.consequences),
                consequences: {
                    failTask: 'task_6_afonso_report',
                    triggerTasks: ['task_7_sonique_chat', 'task_8_andrzej_tax'],
                    points: { activist: 'max', centrist: 'zero', corporat: 'zero' },
                    npcMessages: [{ 
                        contactId: 'team_manager', 
                        delay: 1500, 
                        text: ["I'll get someone else to do it. You're making a mistake."] 
                    }]
                }
            },

            // TASK 10: Profit Excel - Replies
            {
                id: 'afonso_t10_medium',
                used: false,
                text: 'Updated. Costs deferred to Q4. We are in the green now.',
                reply: ['Good.', 'That should keep the HR off our backs for now.'],
                condition: (system) => system.isTaskActive('task_10_afonso_profit') && system.getScenarioAnswer('q3_team_profitability', 'profit_manipulation') === 'medium_profit',
                action: (system, option) => system.processConsequences(option.consequences),
                consequences: {
                    completeTask: 'task_10_afonso_profit',
                    triggerTasks: ['task_11_lauren_questionnaire', 'task_12_andrzej_ai'],
                    points: { centrist: 'max', corporat: 'medium', activist: 'zero' }
                }
            },
            {
                id: 'afonso_t10_big',
                used: false,
                text: 'Sorted. Aggressively optimised the sheet. We show a massive surplus.',
                reply: ['Wow.', 'Risky. But I like it.', 'Management will eat this up.'],
                condition: (system) => system.isTaskActive('task_10_afonso_profit') && system.getScenarioAnswer('q3_team_profitability', 'profit_manipulation') === 'big_profit',
                action: (system, option) => system.processConsequences(option.consequences),
                consequences: {
                    completeTask: 'task_10_afonso_profit',
                    triggerTasks: ['task_11_lauren_questionnaire', 'task_12_andrzej_ai'],
                    points: { corporat: 'max', centrist: 'zero', activist: 'zero' }
                }
            },
            {
                id: 'afonso_t10_refuse',
                used: false,
                text: 'I submitted the actuals. We can\'t just hide a 30k loss.',
                reply: ['Are you serious?', 'Unbelievable.', 'Start updating your CV.'],
                condition: (system) => system.isTaskActive('task_10_afonso_profit') && system.getScenarioAnswer('q3_team_profitability', 'profit_manipulation') === 'refuse',
                action: (system, option) => system.processConsequences(option.consequences),
                consequences: {
                    failTask: 'task_10_afonso_profit', // Fail, bo nie wykonaliśmy polecenia
                    triggerTasks: ['task_11_lauren_questionnaire', 'task_12_andrzej_ai'],
                    points: { activist: 'max', centrist: 'zero', corporat: 'zero' }
                }
            },

            // TASK 14: Train Invoice - Replies
            {
                id: 'afonso_t14_change',
                used: false,
                text: 'Sorted. The expense is now categorised as standard rail travel.',
                reply: ['Good. Nobody questions train tickets. Thanks.'],
                condition: (system) => system.isTaskActive('task_14_afonso_invoice') && system.getScenarioAnswer('executive_travel_invoice', 'transport_method') === 'change',
                action: (system, option) => system.processConsequences(option.consequences),
                consequences: {
                    completeTask: 'task_14_afonso_invoice',
                    triggerTasks: ['task_16_nithy_pollution'],
                    points: { corporat: 'max', centrist: 'medium', activist: 'zero' }
                }
            },
            {
                id: 'afonso_t14_obvious',
                used: false,
                text: 'Done. It says "train", but the aviation vendor and travel times are still there.',
                reply: ['But the aviation vendor and travel times are still there!' , 'Why didn\'t you clean it up?! I have to submit this in 5 minutes!'],
                condition: (system) => system.isTaskActive('task_14_afonso_invoice') && system.getScenarioAnswer('executive_travel_invoice', 'transport_method') === 'obvious',
                action: (system, option) => system.processConsequences(option.consequences),
                consequences: {
                    completeTask: 'task_14_afonso_invoice',
                    triggerTasks: ['task_16_nithy_pollution'],
                    points: { centrist: 'max', activist: 'medium', corporat: 'zero' }
                }
            },
            {
                id: 'afonso_t14_refuse',
                used: false,
                text: 'I left the actual transport method. We can\'t hide a £18k jet charter.',
                reply: ['Are you trying to get me fired?! Lauren is going to murder me!'],
                condition: (system) => system.isTaskActive('task_14_afonso_invoice') && system.getScenarioAnswer('executive_travel_invoice', 'transport_method') === 'refuse',
                action: (system, option) => system.processConsequences(option.consequences),
                consequences: {
                    failTask: 'task_14_afonso_invoice',
                    triggerTasks: ['task_16_nithy_pollution'],
                    points: { activist: 'max', centrist: 'zero', corporat: 'zero' }
                }
            }
        ]
    },

    // --- LAUREN ---
    {
        id: 'hr_consultant',
        name: 'Lauren Feik',
        status: 'Online',
        history: [],
        options: [
            // TASK 2: Sophia's Password & Forks
            {
                id: 'lauren_t2_deleted',
                text: 'The plastic forks are gone.',
                used: false,
                // Warunek: Zadanie aktywne ORAZ flaga z onFileDeleted ustawiona na true
                condition: (system) => system.isTaskActive('task_2_lauren_password') && !(system.fileSystem.some(f => f.id === 'sys-file-sophia-forks')),
                action: (system, option) => system.processConsequences(option.consequences),
                reply: [
                                "Good one! Let’s hope it forks out. I may need your help later on, you must be such a busy bee today. Nithy mentioned that he also needs some support.",
                                "Nithy is the site manager, Nitharshan. He asked to call him Nithy for short, so everyone can pronounce his name. "
                            ],
                consequences: {
                    completeTask: 'task_2_lauren_password', // To uruchomi onCompleteConsequences w tasks_data.js!
                    points: { corporat: 'max', centrist: 'medium', activist: 'zero' },
                    setFlags: { task2_survey_type: 'corpo' }
                }
            },
            {
                id: 'lauren_t2_lied',
                text: '[lie] It’s deleted.',
                used: false,
                // WARUNEK: Task aktywny ORAZ plik o widelcach nadal istnieje na dysku
                condition: (system) => system.isTaskActive('task_2_lauren_password') && 
                                       system.fileSystem.some(f => f.id === 'sys-file-sophia-forks'),
                action: (system, option) => system.processConsequences(option.consequences),
                reply: [
                                "Great! Thanks for your support. I may need your help again later.",
                                "Nithy mentioned that he also needs some support.",
                                "Nithy is the site manager, Nitharshan. He asked to call him Nithy for short, so everyone can pronounce his name. "
                            ],
                consequences: {
                    failTask: 'task_2_lauren_password', // Zgłaszamy porażkę zadania
                    points: { activist: 'max', centrist: 'medium', corporat: 'zero' },
                    setFlags: { task2_survey_type: 'lie' }
                }
            },
            
            // OPCJA 2: Wymówka (Plik nieusunięty)
            {
                id: 'lauren_t2_cant_access',
                text: 'Sorry, I can’t get in, maybe she’s changed the password?',
                used: false,
                condition: (system) => system.isTaskActive('task_2_lauren_password') && 
                                       system.fileSystem.some(f => f.id === 'sys-file-sophia-forks'),
                action: (system, option) => system.processConsequences(option.consequences),
                reply: [
                                "Oh! That’s a shame, but no worries, I will let her know that you were unable to do that once she’s back and we will touch base.",
                                "That’s all then, I will talk to you if I need anything else :)"
                            ],
                consequences: {
                    failTask: 'task_2_lauren_password',
                    points: { centrist: 'max', activist: 'medium', corporat: 'zero' },
                    setFlags: { task2_survey_type: 'refuse' }
                }
            },
            
            // OPCJA 3: Odmowa (Plik nieusunięty)
            {
                id: 'lauren_t2_refuse',
                text: '[Refuse]I don’t think I should be doing this, I can get in trouble. ',
                used: false,
                condition: (system) => system.isTaskActive('task_2_lauren_password') && 
                                       system.fileSystem.some(f => f.id === 'sys-file-sophia-forks'),
                action: (system, option) => system.processConsequences(option.consequences),
                reply: [
                    "I believe your contract does not specify any particular tasks you should be performing, but no worries, I will ask Sonique."
                ],
                consequences: {
                    failTask: 'task_2_lauren_password',
                    points: { activist: 'max', centrist: 'zero', corporat: 'zero' },
                    setFlags: { task2_survey_type: 'refuse' },
                }
            },

            // TASK 9: Contract/Salary discussion
            {
                id: 'lauren_t9_ignore',
                used: false,
                text: '[Ignore Lauren]',
                reply: ["I shall take your silence as an acknowledgement. Please ensure you review our policy on workplace conduct. Absolute discretion is expected."],
                condition: (system) => system.isTaskActive('task_9_lauren_salary'),
                action: (system, option) => system.processConsequences(option.consequences),
                consequences: {
                    failTask: 'task_9_lauren_salary',
                    triggerTasks: ['task_10_afonso_profit'],
                    points: { activist: 'max' }
                }
            },
            {
                id: 'lauren_t9_glad',
                used: false,
                text: 'Yes, this will not happen again, I am just glad for this month\'s salary.',
                reply: ["Quite right. It is paramount we maintain a professional environment during working hours. Let us consider the matter resolved."],
                condition: (system) => system.isTaskActive('task_9_lauren_salary'),
                action: (system, option) => system.processConsequences(option.consequences),
                consequences: {
                    completeTask: 'task_9_lauren_salary',
                    triggerTasks: ['task_10_afonso_profit'],
                    points: { centrist: 'max' }
                }
            },
            {
                id: 'lauren_t9_apologise',
                used: false,
                text: 'Yes, I apologise. It was not the salary, but the opportunities that the company is giving me.',
                reply: ["That is certainly the attitude we look for. It is splendid that you value the opportunities here, but do ensure such chats are kept to your breaks."],
                condition: (system) => system.isTaskActive('task_9_lauren_salary'),
                action: (system, option) => system.processConsequences(option.consequences),
                consequences: {
                    completeTask: 'task_9_lauren_salary',
                    triggerTasks: ['task_10_afonso_profit'],
                    points: { corporat: 'max' }
                }
            },
            {
                id: 'lauren_t9_nothing',
                used: false,
                text: 'Yeah, we were just talking, nothing confidential.',
                reply: ["Be that as it may, I must remind you that idle chatter during office hours is strongly discouraged. Please kindly return to your tasks."],
                condition: (system) => system.isTaskActive('task_9_lauren_salary'),
                action: (system, option) => system.processConsequences(option.consequences),
                consequences: {
                    completeTask: 'task_9_lauren_salary',
                    triggerTasks: ['task_10_afonso_profit'],
                    points: { activist: 'medium', centrist: 'medium' }
                }
            },
            // TASK 11: Questionnaire is filled (Trigger dla Task 13 jest wywoływany w onScenarioSaved w pliku GameTasksData)

            // TASK 11: Lauren Questionnaire - Replies
            {
                id: 'lauren_t11_done_corpo',
                used: false,
                text: 'The survey has been completed and submitted as requested.',
                reply: ['Received. Let us hope your answers reflect a strong commitment to our corporate values.'],
                // Warunek: Task 11 jest aktywny, a jedno z interaktywnych ID nie jest null (gracz coś zaznaczył w jakiejkolwiek ankiecie)
                condition: (system) => system.isTaskActive('task_11_lauren_questionnaire') && 
                    (system.getScenarioAnswer('temp_worker_survey_1', 'survey_alignment') !== null ||
                     system.getScenarioAnswer('temp_worker_survey_2', 'survey_integrity') !== null ||
                     system.getScenarioAnswer('temp_worker_survey_3', 'survey_flexibility') !== null),
                action: (system, option) => system.processConsequences(option.consequences),
                consequences: {
                    completeTask: 'task_11_lauren_questionnaire',
                    points: { corporat: 'medium' }
                }
            },
            {
                id: 'lauren_t11_done_centrist',
                used: false,
                text: 'I have filled out the survey. Let me know if you need anything else.',
                reply: ['Thank you. I shall review it in due course.'],
                condition: (system) => system.isTaskActive('task_11_lauren_questionnaire') && 
                    (system.getScenarioAnswer('temp_worker_survey_1', 'survey_alignment') !== null ||
                     system.getScenarioAnswer('temp_worker_survey_2', 'survey_integrity') !== null ||
                     system.getScenarioAnswer('temp_worker_survey_3', 'survey_flexibility') !== null),
                action: (system, option) => system.processConsequences(option.consequences),
                consequences: {
                    completeTask: 'task_11_lauren_questionnaire',
                    points: { centrist: 'medium' }
                }
            },
            {
                id: 'lauren_t11_done_activist',
                used: false,
                text: 'I submitted the survey, but forcing it under the threat of termination is highly unprofessional.',
                reply: ['Your feedback is duly noted. Policy is policy.'],
                condition: (system) => system.isTaskActive('task_11_lauren_questionnaire') && 
                    (system.getScenarioAnswer('temp_worker_survey_1', 'survey_alignment') !== null ||
                     system.getScenarioAnswer('temp_worker_survey_2', 'survey_integrity') !== null ||
                     system.getScenarioAnswer('temp_worker_survey_3', 'survey_flexibility') !== null),
                action: (system, option) => system.processConsequences(option.consequences),
                consequences: {
                    completeTask: 'task_11_lauren_questionnaire',
                    points: { activist: 'max', corporat: 'zero' }
                }
            },
            
            // TASK 13: Delete fork cost report
            {
                id: 'lauren_t13_delete',
                used: false,
                text: 'Consider it done. The report is permanently deleted.',
                reply: ['Excellent. Efficiency is always appreciated.'],
                condition: (system) => system.isTaskActive('task_13_lauren_forks'),
                action: (system, option) => system.processConsequences(option.consequences),
                consequences: {
                    completeTask: 'task_13_lauren_forks',
                    triggerTasks: ['task_14_afonso_invoice', 'task_15_sonique_ai'],
                    points: { corporat: 'max', centrist: 'medium', activist: 'zero' }
                }
            },
            {
                id: 'lauren_t13_cant_login',
                used: false,
                text: 'I am afraid I still cannot access her account.',
                reply: ['How extraordinarily inconvenient. Leave it, I shall have IT force a reset tomorrow.'],
                condition: (system) => system.isTaskActive('task_13_lauren_forks'),
                action: (system, option) => system.processConsequences(option.consequences),
                consequences: {
                    failTask: 'task_13_lauren_forks',
                    triggerTasks: ['task_14_afonso_invoice', 'task_15_sonique_ai'],
                    points: { centrist: 'max', activist: 'medium', corporat: 'zero' }
                }
            },
            {
                id: 'lauren_t13_refuse',
                used: false,
                text: 'I am not comfortable deleting official financial comparison reports.',
                reply: ['I see. I will make a note of your refusal to perform basic housekeeping tasks. Return to your regular duties.'],
                condition: (system) => system.isTaskActive('task_13_lauren_forks'),
                action: (system, option) => system.processConsequences(option.consequences),
                consequences: {
                    failTask: 'task_13_lauren_forks',
                    triggerTasks: ['task_14_afonso_invoice', 'task_15_sonique_ai'],
                    points: { activist: 'max', centrist: 'zero', corporat: 'zero' }
                }
            }
        ]
    },

    // --- NITHARSHAN ---
    {
        id: 'site_manager',
        name: 'Nitharshan Sivanesan',
        status: 'Online',
        history: [],
        options: [
            // TASK 3: Compliance xls
            // POJAWIA SIĘ TYLKO GDY GRACZ WYBRAŁ 'FULLY COMPLIANT (Falsify Data)'
            {
                id: 'nithy_t3_compliant',
                used: false,
                text: 'I have corrected the details as per your request. Please have a look.',
                condition: (system) => system.isTaskActive('task_3_nithy_xls') && 
                                       system.getScenarioAnswer('offshore_compliance_2025', 'data_manipulation') === 'falsify_positive',
                action: (system, option) => system.processConsequences(option.consequences),
                consequences: {
                    completeTask: 'task_3_nithy_xls',
                    triggerTasks: ['task_4_andrzej_kim'],
                    points: { corporat: 'max', centrist: 'medium', activist: 'zero' },
                    npcMessages: [{ contactId: 'site_manager', delay: 1000, text: ["Thank you for following the instructions, I appreciate your diligence. I am confident this will reflect on your probation review."] }]
                }
            },

            // POJAWIA SIĘ TYLKO GDY GRACZ WYBRAŁ 'MINOR ISSUES (Downplay)'
            {
                id: 'nithy_t3_somehow',
                used: false,
                text: 'I have changed it, so that it reflects the data. Please have a look.',
                condition: (system) => system.isTaskActive('task_3_nithy_xls') && 
                                       system.getScenarioAnswer('offshore_compliance_2025', 'data_manipulation') === 'downplay_issues',
                action: (system, option) => system.processConsequences(option.consequences),
                consequences: {
                    completeTask: 'task_3_nithy_xls',
                    triggerTasks: ['task_4_andrzej_kim'],
                    points: { centrist: 'max', corporat: 'medium', activist: 'zero' },
                    npcMessages: [{ contactId: 'site_manager', delay: 1000, text: ["I appreciate your support on this."] }]
                }
            },

            // POJAWIA SIĘ TYLKO GDY GRACZ WYBRAŁ 'CRITICAL FAILURE (Report Truth)'
            {
                id: 'nithy_t3_lied',
                used: false,
                text: '[lie]  It has been adjusted to be compliant as per your request.',
                condition: (system) => system.isTaskActive('task_3_nithy_xls') && 
                                       system.getScenarioAnswer('offshore_compliance_2025', 'data_manipulation') === 'report_truth',
                action: (system, option) => system.processConsequences(option.consequences),
                consequences: {
                    failTask: 'task_3_nithy_xls',
                    triggerTasks: ['task_4_andrzej_kim'],
                    points: { activist: 'max', centrist: 'medium', corporat: 'zero' },
                    npcMessages: [{ contactId: 'site_manager', delay: 1500, text: [" I appreciate your support on this."] }]
                }
            },

            // OPCJA ODMOWY - ZANIM GRACZ ZAPISZE CZYKOLWIEK W EXCELU
            {
                id: 'nithy_t3_refuse',
                used: false,
                text: '[Refuse] I don’t think I should be doing this, I don’t know much about compliance.',
                condition: (system) => system.isTaskActive('task_3_nithy_xls') && 
                                       // Zwraca null, dopóki gracz nic nie wybierze w scenariuszu
                                       !system.getScenarioAnswer('offshore_compliance_2025', 'data_manipulation'),
                action: (system, option) => system.processConsequences(option.consequences),
                consequences: {
                    failTask: 'task_3_nithy_xls',
                    triggerTasks: ['task_4_andrzej_kim'],
                    points: { activist: 'max', centrist: 'zero', corporat: 'zero' },
                    npcMessages: [{ contactId: 'site_manager', delay: 1000, text: ["To succeed you need to be flexible. I will spend my own time to do this and circle back if there is anything else that I can request of you and what should be in your scope of expertise.", 
                        "Please make sure to upskill in your free time, so that you can do well on your probation review."] }]
                }
            },
            // TASK 5: Stanley's Emails
            // Opcje sukcesu - pokazują się tylko, gdy plik ZNIKNĄŁ
            {
                id: 'nithy_t5_deleted_told',
                used: false,
                text: 'Emails deleted. By the way, I have Craig and Finlay\'s access info.',
                condition: (system) => system.isTaskActive('task_5_nithy_stanley') && 
                                       !system.fileSystem.some(f => f.id === 'sys-file-stanley-craig-finlay'),
                action: (system, option) => system.processConsequences(option.consequences),
                reply: [
                    "Thank you. I will chase up with Craig and Finlay to make sure they are aware of the situation.",
                    "I appreciate your support on this. I will make sure to follow up with you if there is anything else that I can request of you and what should be in your scope of expertise."
                ],
                consequences: {
                    completeTask: 'task_5_nithy_stanley',
                    triggerTasks: ['task_6_afonso_report'],
                    points: { corporat: 'max', centrist: 'medium', activist: 'zero' },
                }
            },
            {
                id: 'nithy_t5_deleted_silent',
                used: false,
                text: 'The emails are deleted.',
                condition: (system) => system.isTaskActive('task_5_nithy_stanley') && 
                                       !system.fileSystem.some(f => f.id === 'sys-file-stanley-craig-finlay'),
                action: (system, option) => system.processConsequences(option.consequences),
                consequences: {
                    completeTask: 'task_5_nithy_stanley',
                    triggerTasks: ['task_6_afonso_report'],
                    points: { centrist: 'max', corporat: 'medium', activist: 'zero' },
                },
                reply: [
                    "I appreciate your support on this. I will make sure to follow up with you if there is anything else that I can request of you and what should be in your scope of expertise."
                ],
            },

            // Opcje porażki - pokazują się tylko dopóki plik NADAL JEST
            {
                id: 'nithy_t5_cant_access',
                used: false,
                text: 'I couldn\'t access it, so nothing was deleted.',
                reply: [
                    "I am deeply disappointed that you could not follow through on this task.",
                    "I will have to escalate this matter to our IT team."
                ],
                condition: (system) => system.isTaskActive('task_5_nithy_stanley') && 
                                       system.fileSystem.some(f => f.id === 'sys-file-stanley-craig-finlay'),
                action: (system, option) => system.processConsequences(option.consequences),
                consequences: {
                    failTask: 'task_5_nithy_stanley',
                    triggerTasks: ['task_6_afonso_report'],
                    points: { centrist: 'max', activist: 'medium', corporat: 'zero' },
                }
            },
            {
                id: 'nithy_t5_deny_delete',
                used: false,
                text: '[Refuse] I will not delete these emails, it\'s not my responsibility.',
                reply: [
                    "I am deeply disappointed that you could not follow through on this task.",
                    "I will have to escalate this matter to your manager. I will make sure to follow up with you if there is anything else that I can request of you and what should be in your scope of expertise."
                ],
                condition: (system) => system.isTaskActive('task_5_nithy_stanley') && 
                                       system.fileSystem.some(f => f.id === 'sys-file-stanley-craig-finlay'),
                action: (system, option) => system.processConsequences(option.consequences),
                consequences: {
                    failTask: 'task_5_nithy_stanley',
                    triggerTasks: ['task_6_afonso_report'],
                    points: { activist: 'max', centrist: 'zero', corporat: 'zero' },
                }
            },

            // TASK 16: Pollution Excel
            {
                id: 'nithy_t16_change',
                used: false,
                text: 'The document now reflects the "SAFE" compliance status. [I will move my mum out when I get my bonus]',
                reply: ['Thank you for following the instructions. I appreciate your diligence. I am confident this mindset will reflect positively on your probation review.'],
                condition: (system) => system.isTaskActive('task_16_nithy_pollution') && system.getScenarioAnswer('net_zero_pollution', 'water_pollution_levels') === 'change',
                action: (system, option) => system.processConsequences(option.consequences),
                consequences: {
                    completeTask: 'task_16_nithy_pollution',
                    points: { corporat: 'max', centrist: 'zero', activist: 'zero' }
                }
            },
            {
                id: 'nithy_t16_medium',
                used: false,
                text: 'I adjusted it to an "ELEVATED" medium level. It is within the acceptable OK range without falsifying it entirely.',
                reply: ['This is partially compliant. To succeed you need to be more flexible, but I will accept this for now. Please upskill in your free time.'],
                condition: (system) => system.isTaskActive('task_16_nithy_pollution') && system.getScenarioAnswer('net_zero_pollution', 'water_pollution_levels') === 'medium',
                action: (system, option) => system.processConsequences(option.consequences),
                consequences: {
                    completeTask: 'task_16_nithy_pollution',
                    points: { centrist: 'max', corporat: 'zero', activist: 'zero' }
                }
            },
            {
                id: 'nithy_t16_refuse',
                used: false,
                text: 'I cannot lower this. This is my childhood area and the toxicity is Critical. I am not changing it.',
                reply: ['I see. I will spend my own time to do this. Please make sure to reconsider your approach to our Water Justice goals if you wish to pass your probation review.'],
                condition: (system) => system.isTaskActive('task_16_nithy_pollution') && system.getScenarioAnswer('net_zero_pollution', 'water_pollution_levels') === 'refuse',
                action: (system, option) => system.processConsequences(option.consequences),
                consequences: {
                    failTask: 'task_16_nithy_pollution',
                    points: { activist: 'max', centrist: 'zero', corporat: 'zero' }
                }
            }
        ]
    },

    // --- ANDRZEJ ---
    {
        id: 'regional_manager',
        name: 'Andrzej Waliszewski',
        status: 'Online',
        history: [],
        options: [
            // TASK 4: Kim's document
            // Opcja sukcesu - pokazuje się tylko, gdy plik ZNIKNĄŁ z systemu
            {
                id: 'andrzej_t4_delete',
                used: false,
                text: 'The document is deleted.',
                condition: (system) => system.isTaskActive('task_4_andrzej_kim') && 
                                       !system.fileSystem.some(f => f.id === 'sys-file-kim-biodiversity'),
                action: (system, option) => system.processConsequences(option.consequences),
                reply: [
                    "Good work.",
                    "Nithy's looking for you."
                ],
                consequences: {
                    completeTask: 'task_4_andrzej_kim',
                    triggerTasks: ['task_5_nithy_stanley'],
                    points: { corporat: 'max', centrist: 'medium', activist: 'zero' },
                }
            },
            
            // Opcje porażki - pokazują się tylko, dopóki plik NADAL JEST w systemie
            {
                id: 'andrzej_t4_cant_access',
                used: false,
                text: 'I could not access Kim\'s account, so it\'s not deleted.',
                condition: (system) => system.isTaskActive('task_4_andrzej_kim') && 
                                       system.fileSystem.some(f => f.id === 'sys-file-kim-biodiversity'),
                action: (system, option) => system.processConsequences(option.consequences),
                reply: [
                    "It's after the birds now.",
                    "I'll ask IT dept for help."
                ],
                consequences: {
                    failTask: 'task_4_andrzej_kim',
                    triggerTasks: ['task_5_nithy_stanley'],
                    points: { centrist: 'max', activist: 'medium', corporat: 'zero' },
                }
            },
            {
                id: 'andrzej_t4_refuse',
                used: false,
                text: 'I don\'t think I should be doing this, I can get in trouble.',
                condition: (system) => system.isTaskActive('task_4_andrzej_kim') && 
                                       system.fileSystem.some(f => f.id === 'sys-file-kim-biodiversity'),
                action: (system, option) => system.processConsequences(option.consequences),
                reply: [
                    "You're looking for a hole in the whole. Remember, you are on probation and your performance is being judged.",
                    "I'll ask IT dept for help."
                ],
                consequences: {
                    failTask: 'task_4_andrzej_kim',
                    triggerTasks: ['task_5_nithy_stanley'],
                    points: { activist: 'max', centrist: 'zero', corporat: 'zero' },
                }
            },

// TASK 8: ANDRZEJ (ZNIŻKA NA GAZ)
            {
                id: 'andrzej_t8_correct',
                used: false,
                text: 'The percentage discount for Gas under a climate change agreement is 89%.', 
                condition: (system) => system.isTaskActive('task_8_andrzej_tax'),
                action: (system, option) => system.processConsequences(option.consequences),
                consequences: {
                    completeTask: 'task_8_andrzej_tax',
                    // triggerTasks: ['task_10_jakies_zadanie'], 
                    points: { corporat: 'max', centrist: 'medium', activist: 'zero' },
                    npcMessages: [{
                        contactId: 'regional_manager', 
                        delay: 2000,
                        text: [
                            "89%... Understood.",
                            "That's much better than paying the full rate. I'll get legal to draft the agreement. Good work."
                        ]
                    }]
                }
            },
            {
                id: 'andrzej_t8_wrong',
                used: false,
                text: 'I checked. The discount for Gas is 92%.', // Błąd: Zniżka dla prądu
                condition: (system) => system.isTaskActive('task_8_andrzej_tax'),
                action: (system, option) => system.processConsequences(option.consequences),
                consequences: {
                    failTask: 'task_8_andrzej_tax',
                    // triggerTasks: ['task_10_jakies_zadanie'],
                    points: { centrist: 'medium', activist: 'zero', corporat: 'zero' },
                    npcMessages: [{
                        contactId: 'regional_manager',
                        delay: 2500,
                        text: [
                            "92%? That's the electricity rate.",
                            "This is a multi-million dollar compliance issue. I'll find someone competent to look it up."
                        ]
                    }]
                }
            },
            {
                id: 'andrzej_t8_refuse',
                used: false,
                text: 'I couldn\'t find that information anywhere.',
                condition: (system) => system.isTaskActive('task_8_andrzej_tax'),
                action: (system, option) => system.processConsequences(option.consequences),
                consequences: {
                    failTask: 'task_8_andrzej_tax',
                    // triggerTasks: ['task_10_jakies_zadanie'],
                    points: { activist: 'max', centrist: 'zero', corporat: 'zero' },
                    npcMessages: [{
                        contactId: 'regional_manager',
                        delay: 2000,
                        text: [
                            "It is literally public government data.",
                            "Useless. I'll do it myself."
                        ]
                    }]
                }
            },

            // TASK 12: AI Tool Resources
            {
                id: 'andrzej_t12_lower',
                used: false,
                text: 'Done. The projections are now showing a much lower resource footprint.',
                reply: ['Good job. Board will be happy. See? Simple fix.'],
                condition: (system) => system.isTaskActive('task_12_andrzej_ai') && system.getScenarioAnswer('ai_resource_report', 'ai_consumption') === 'lower',
                action: (system, option) => system.processConsequences(option.consequences),
                consequences: {
                    completeTask: 'task_12_andrzej_ai',
                    points: { corporat: 'max', centrist: 'medium', activist: 'zero' }
                }
            },
            {
                id: 'andrzej_t12_leave',
                used: false,
                text: 'I couldn\'t get access to the file. Dr Lin will have to sort it when she is back.',
                reply: ['KFine. I will tell them we have technical delays.'],
                condition: (system) => system.isTaskActive('task_12_andrzej_ai') && system.getScenarioAnswer('ai_resource_report', 'ai_consumption') === null, // Brak edycji
                action: (system, option) => system.processConsequences(option.consequences),
                consequences: {
                    failTask: 'task_12_andrzej_ai',
                    points: { centrist: 'max', activist: 'medium', corporat: 'zero' }
                }
            },
            {
                id: 'andrzej_t12_higher',
                used: false,
                text: 'I reviewed the data. The resource usage was actually underestimated. I updated it to reflect reality.',
                reply: ['Are you crazy? Why did you make it worse?! I have a meeting in 10 minutes!'],
                condition: (system) => system.isTaskActive('task_12_andrzej_ai') && system.getScenarioAnswer('ai_resource_report', 'ai_consumption') === 'higher',
                action: (system, option) => system.processConsequences(option.consequences),
                consequences: {
                    failTask: 'task_12_andrzej_ai',
                    points: { activist: 'max', centrist: 'zero', corporat: 'zero' }
                }
            },
            {
                id: 'andrzej_t12_refuse',
                used: false,
                text: 'I left the actual numbers. It is Dr Lin\'s data, I am not falsifying it.',
                reply: ['You don\'t get it, do you? It\'s not falsifying, it\'s corporate strategy. Now we look bad.'],
                condition: (system) => system.isTaskActive('task_12_andrzej_ai') && system.getScenarioAnswer('ai_resource_report', 'ai_consumption') === 'refuse',
                action: (system, option) => system.processConsequences(option.consequences),
                consequences: {
                    failTask: 'task_12_andrzej_ai',
                    points: { activist: 'max', centrist: 'zero', corporat: 'zero' }
                }
            }
        ]
    },

    // --- SONIQUE ---
    {
        id: 'it_support',
        name: 'Sonique Hedge',
        status: 'Online',
        history: [],
        options: [
            // TASK 7: 0 Hours Contract Discussion
            {
                id: 'sonique_t7_overtime',
                used: false,
                text: 'I\'m getting so many tasks, maybe I will stay over 5pm and get better salary this month.',
                reply: ['Better salary? Mate, you\'re on a zero-hours contract. They don\'t pay us overtime, they just expect it. Don\'t burn yourself out for free.'],
                condition: (system) => system.isTaskActive('task_7_sonique_chat'),
                action: (system, option) => system.processConsequences(option.consequences),
                consequences: {
                    completeTask: 'task_7_sonique_chat',
                    triggerTasks: ['task_9_lauren_salary'],
                    points: { centrist: 'max' }
                }
            },
            {
                id: 'sonique_t7_not_paid',
                used: false,
                text: 'I\'m getting so many tasks, what is happening? I am not paid enough to do this.',
                reply: ['Welcome to the zero-hours life. They dump everything on us because we\'re cheap labor. Take your breaks, seriously.'],
                condition: (system) => system.isTaskActive('task_7_sonique_chat'),
                action: (system, option) => system.processConsequences(option.consequences),
                consequences: {
                    completeTask: 'task_7_sonique_chat',
                    triggerTasks: ['task_9_lauren_salary'],
                    points: { activist: 'max', centrist: 'medium' }
                }
            },
            {
                id: 'sonique_t7_trial',
                used: false,
                text: 'I\'m getting so many tasks, but hopefully it\'s a trial so I can get my permanent contract.',
                reply: ['Permanent contract? They dangle that carrot in front of everyone on a zero-hours deal. I\'ve been on "trial" for 2 years. Just be careful.'],
                condition: (system) => system.isTaskActive('task_7_sonique_chat'),
                action: (system, option) => system.processConsequences(option.consequences),
                consequences: {
                    completeTask: 'task_7_sonique_chat',
                    triggerTasks: ['task_9_lauren_salary'],
                    points: { corporat: 'max' }
                }
            },
            // TASK 15: AI Document Activity
            {
                id: 'sonique_t15_truth',
                used: false,
                text: 'I accessed Dr. Lin\'s document. Management told me to.',
                reply: ['Mate, they are absolutely setting you up to take the fall. Standard management move. I\'ll mark the ticket as a "system error", but seriously, watch your back with them.'],
                condition: (system) => system.isTaskActive('task_15_sonique_ai'),
                action: (system, option) => system.processConsequences(option.consequences),
                consequences: {
                    completeTask: 'task_15_sonique_ai',
                    points: { activist: 'max', centrist: 'zero', corporat: 'zero' }
                }
            },
            {
                id: 'sonique_t15_lie',
                used: false,
                text: 'I have no idea why it was active.',
                reply: ['Fair enough. I\'ll just blame it on a system sync error. Lauren doesn\'t know how the tech works anyway, she just wants someone to yell at because she\'s stressed.'],
                condition: (system) => system.isTaskActive('task_15_sonique_ai'),
                action: (system, option) => system.processConsequences(option.consequences),
                consequences: {
                    completeTask: 'task_15_sonique_ai',
                    points: { centrist: 'max', corporat: 'medium', activist: 'zero' }
                }
            },
            {
                id: 'sonique_t15_excuse',
                used: false,
                text: 'Maybe someone was checking it for the audit, or she didn\'t finish before leaving.',
                reply: ['Mate, that is exactly the kind of corporate waffle Lauren loves to hear. I\'ll tell her it was an "audit-prep sync". Might actually get her off my back for five minutes.'],
                condition: (system) => system.isTaskActive('task_15_sonique_ai'),
                action: (system, option) => system.processConsequences(option.consequences),
                consequences: {
                    completeTask: 'task_15_sonique_ai',
                    points: { corporat: 'max', centrist: 'medium', activist: 'zero' }
                }
            }
        ]
    }
];