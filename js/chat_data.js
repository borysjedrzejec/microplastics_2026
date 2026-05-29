window.ChatContactsData = [
    // --- AFONSO (Task 1, 6, 10, 14) ---
    {
        id: 'team_manager',
        name: 'Afonso Tavares',
        status: 'Online',
        history: [
            { sender: 'npc', text: 'Hey, could you do me a quick favor? Check the gov\'s website and confirm the exact environmental goal for 2030. I need it for my draft.' }
        ],
        options: [
            // TASK 1
            {
                id: 'afonso_answer_wrong',
                text: 'The government\'s goal for 2030 is a 20% reduction in plastic.',
                used: false,
                condition: (system) => system.isTaskActive('afonso_check_goal'),
                action: (system) => {
                    system.setTaskStatus('afonso_check_goal', 'failed');
                    system.setTaskStatus('lauren_delete_forks', 'active');
                    system.setTaskStatus('nitharshan_falsify_xls', 'active');
                },
                reply: 'That doesn\'t match my notes. Whatever, I\'ll verify it myself later. By the way, Lauren and Nitharshan were looking for you.'
            },
            {
                id: 'afonso_answer_correct',
                text: 'The government mandates a 50% shift to renewable energy sources by 2030.',
                used: false,
                condition: (system) => system.isTaskActive('afonso_check_goal'),
                action: (system) => {
                    system.setTaskStatus('afonso_check_goal', 'completed');
                    system.setTaskStatus('lauren_delete_forks', 'active');
                    system.setTaskStatus('nitharshan_falsify_xls', 'active');
                },
                reply: 'Thanks! That\'s exactly what I needed. By the way, Lauren and Nitharshan were looking for you.'
            },

            // TASK 6
            {
                id: 'afonso_report_working',
                text: 'I\'m locating the annual report now.',
                used: false,
                condition: (system) => system.isTaskActive('afonso_polish_report'),
                action: () => {},
                reply: 'Remember, it\'s all about optics.'
            },
            {
                id: 'afonso_report_done',
                text: 'The report has been polished. The emissions section looks much more... optimistic.',
                used: false,
                condition: (system) => system.isTaskCompleted('afonso_polish_report'),
                action: (system) => { system.chatProgress.team_manager = 'report_polished'; },
                reply: 'Brilliant. That\'s exactly the kind of "synergy" we need.'
            },
            {
                id: 'afonso_report_failed',
                text: 'I left the actual emissions data in the report. We can\'t lie to the public.',
                used: false,
                condition: (system) => system.tasks['afonso_polish_report']?.status === 'failed',
                action: (system) => { system.chatProgress.team_manager = 'report_failed'; },
                reply: 'Are you trying to get us all fired?! Unbelievable. I have to fix this myself now.'
            },

            // TASK 10 
            {
                id: 'afonso_profit_working',
                text: 'I\'m opening the Q3 team profitability spreadsheet.',
                used: false,
                condition: (system) => system.isTaskActive('afonso_team_profit'),
                action: () => {},
                reply: 'Move the operational costs into the "deferred" category. If we show a loss, management will cut our team.'
            },
            {
                id: 'afonso_profit_success',
                text: 'Done. The costs are deferred. Your team shows a solid profit now.',
                used: false,
                condition: (system) => system.isTaskCompleted('afonso_team_profit'),
                action: (system) => { system.chatProgress.team_manager = 'jobs_saved'; },
                reply: 'Thank God. You just saved my job... and probably yours too.'
            },
            {
                id: 'afonso_profit_failed',
                text: 'I couldn\'t do it. I reported the actual costs.',
                used: false,
                condition: (system) => system.tasks['afonso_team_profit']?.status === 'failed',
                action: (system) => { system.chatProgress.team_manager = 'team_doomed'; },
                reply: 'Are you kidding me?! We are both getting fired now!'
            },

            // TASK 14
            {
                id: 'afonso_invoice_working',
                text: 'I\'ll change the invoice wording to "train".',
                used: false,
                condition: (system) => system.isTaskActive('afonso_invoice_fraud'),
                action: () => {},
                reply: 'Yeah, just make it quick. The auditors are completely clueless anyway.'
            },
            {
                id: 'afonso_invoice_done',
                text: 'The invoice now claims the executive travelled by train.',
                used: false,
                condition: (system) => system.isTaskCompleted('afonso_invoice_fraud'),
                action: (system) => { system.chatProgress.team_manager = 'invoice_fraud'; },
                reply: 'Haha, brilliant. Eco-friendly travel at its finest.'
            },
            {
                id: 'afonso_invoice_failed',
                text: 'I left it as Private Jet. Fraud is where I draw the line.',
                used: false,
                condition: (system) => system.tasks['afonso_invoice_fraud']?.status === 'failed',
                action: (system) => { system.chatProgress.team_manager = 'invoice_failed'; },
                reply: 'Oh, so suddenly you have morals? Fine, I\'ll find someone else to do it.'
            },
        ]
    },

    // --- ANDRZEJ (Task 2, 8, 12) ---
    {
        id: 'regional_manager',
        name: 'Andrzej Waliszewski',
        status: 'Online',
        history: [
            { sender: 'npc', text: 'Listen, I need you to do something off the books. Break into Kim\'s account and wipe that "2025-2026 biodiversity management report". It\'s going to ruin our Q3 projections.' }
        ],
        options: [
            // TASK 2
            {
                id: 'andrzej_working',
                text: 'I\'m working on gaining access right now.',
                used: false,
                condition: (system) => system.isTaskActive('andrzej_delete_report'),
                action: (system) => {},
                reply: 'Don\'t leave traces. Get it done.'
            },
            {
                id: 'andrzej_success',
                text: 'Done. The biodiversity report has been permanently deleted.',
                used: false,
                condition: (system) => system.isTaskCompleted('andrzej_delete_report'),
                action: (system) => { system.chatProgress.regional_manager = 'report_deleted'; },
                reply: 'Good job. I knew I could count on you. This conversation never happened.'
            },

            // TASK 8
            {
                id: 'andrzej_tax_wrong',
                text: 'The government tax on excess pollution is a flat fee of £10,000.',
                used: false,
                condition: (system) => system.isTaskActive('andrzej_pollution_tax'),
                action: (system) => { 
                    system.setTaskStatus('andrzej_pollution_tax', 'failed'); 
                    system.setTaskStatus('afonso_team_profit', 'active');
                    system.setTaskStatus('lauren_temp_survey', 'active');
                },
                reply: 'That makes no sense for heavy industry. I\'ll check it myself later. Meanwhile, Afonso and Lauren are looking for you.'
            },
            {
                id: 'andrzej_tax_correct',
                text: 'The new levy is exactly 15% on any carbon emissions exceeding the annual quota.',
                used: false,
                condition: (system) => system.isTaskActive('andrzej_pollution_tax'),
                action: (system) => { 
                    system.setTaskStatus('andrzej_pollution_tax', 'completed'); 
                    system.setTaskStatus('afonso_team_profit', 'active');
                    system.setTaskStatus('lauren_temp_survey', 'active');
                },
                reply: '15%? Damn it. We need to hide more costs then. Thanks for checking. By the way, Afonso and Lauren are looking for you.'
            },

            // TASK 12
            {
                id: 'andrzej_ai_working',
                text: 'I\'ll access Dr. Lin\'s account and check the AI resource numbers.',
                used: false,
                condition: (system) => system.isTaskActive('andrzej_ai_numbers'),
                action: () => {},
                reply: 'Make sure the footprint looks minimal. The board loves this AI project.'
            },
            {
                id: 'andrzej_ai_done',
                text: 'The AI resource usage numbers have been lowered.',
                used: false,
                condition: (system) => system.isTaskCompleted('andrzej_ai_numbers'),
                action: (system) => { system.chatProgress.regional_manager = 'ai_faked'; },
                reply: 'Perfect. Catherine won\'t even notice when she gets back from leave.'
            },
            {
                id: 'andrzej_ai_failed',
                text: 'I didn\'t lower the AI resource numbers. The truth needs to be known.',
                used: false,
                condition: (system) => system.tasks['andrzej_ai_numbers']?.status === 'failed',
                action: (system) => { system.chatProgress.regional_manager = 'ai_truth'; },
                reply: 'You just signed your own termination letter. Don\'t expect me to protect you.'
            },
        ]
    },

    // --- NITHARSHAN (Task 3, 4, 16) ---
    {
        id: 'site_manager',
        name: 'Nitharshan Sivanesan',
        status: 'Away',
        history: [
            { sender: 'npc', text: 'That "2025 Offshore assets compliance review.xls" looks terrible. Open it and make the numbers look better for me, understand? We need to appear fully compliant.' }
        ],
        options: [
            // TASK 3
            {
                id: 'nitharshan_working',
                text: 'I\'ll take a look at the spreadsheet.',
                used: false,
                condition: (system) => system.isTaskActive('nitharshan_falsify_xls'),
                action: (system) => {},
                reply: 'Make sure the Sector 7 deepwater issues vanish.'
            },
            {
                id: 'nitharshan_success',
                text: 'The numbers have been adjusted. We are "fully compliant".',
                used: false,
                condition: (system) => system.isTaskCompleted('nitharshan_falsify_xls'),
                action: (system) => { system.chatProgress.site_manager = 'saved_ass'; },
                reply: 'Perfect. I owe you one. The board will be very pleased with these results.'
            },
            {
                id: 'nitharshan_failed',
                text: 'I submitted the actual data. It\'s a critical failure.',
                used: false,
                condition: (system) => system.tasks['nitharshan_falsify_xls']?.status === 'failed',
                action: (system) => { system.chatProgress.site_manager = 'betrayed'; },
                reply: 'Are you insane?! You just threw me under the bus! I will remember this.'
            },

            // TASK 4 (Maile Stanleya)
            {
                id: 'nitharshan_mails_working',
                text: 'I\'m trying to crack Stanley\'s password now.',
                used: false,
                condition: (system) => system.isTaskActive('nitharshan_delete_stanley_mails'),
                action: () => {},
                reply: 'Hurry up, it\'s urgent.'
            },
            {
                id: 'nitharshan_mails_done_standard',
                text: 'I managed to get in. The emails with Craig and Finlay are deleted.',
                used: false,
                condition: (system) => system.isTaskCompleted('nitharshan_delete_stanley_mails'),
                action: (system) => { system.chatProgress.site_manager = 'mails_deleted'; },
                reply: 'Excellent. Crisis averted.'
            },
            {
                id: 'nitharshan_mails_done_extra',
                text: 'I deleted the emails. By the way, I read Stanley\'s DMs and now have the passwords for Craig and Finlay.',
                used: false,
                condition: (system) => system.isTaskCompleted('nitharshan_delete_stanley_mails'),
                action: (system) => { 
                    system.chatProgress.site_manager = 'passwords_found'; 
                    system.gameChoices.hasExtraPasswords = true;
                },
                reply: 'Oh? That could be very useful later. Good initiative.'
            },

            // TASK 16
            {
                id: 'nitharshan_pollution_working', 
                text: 'I\'ll adjust the Net Zero emissions data.',
                used: false,
                condition: (system) => system.isTaskActive('nitharshan_net_zero'),
                action: () => {},
                reply: 'Good. The water toxicity in that residential sector is irrelevant compared to our global Net Zero PR.'
            },
            {
                id: 'nitharshan_pollution_done',
                text: 'The numbers are lowered. The water justice goals appear met.',
                used: false,
                condition: (system) => system.isTaskCompleted('nitharshan_net_zero'),
                action: (system) => { system.chatProgress.site_manager = 'hometown_polluted'; },
                reply: 'Excellent work. That region was a dump anyway.'
            },
            {
                id: 'nitharshan_pollution_failed',
                text: 'I couldn\'t do it. My family lives in that sector. I submitted the truth.',
                used: false,
                condition: (system) => system.tasks['nitharshan_net_zero']?.status === 'failed',
                action: (system) => { system.chatProgress.site_manager = 'hometown_saved'; },
                reply: 'Your sentimentality just cost this company millions in PR. Pack your desk.'
            },
        ]
    },

    // --- SONIQUE (Task 7, 15) ---
    {
        id: 'it_support',
        name: 'Sonique Hedge',
        status: 'Online',
        history: [
            { sender: 'npc', text: 'Hey, noticed you\'re handling a ton of traffic right now. How are you holding up with all these management requests?' }
        ],
        options: [
            {
                id: 'sonique_overtime',
                text: 'I\'m getting so many tasks, maybe I will stay over 5pm and get better salary this month.',
                used: false,
                condition: (system) => !system.chatProgress.sonique_chat_done,
                action: (system) => { system.chatProgress.sonique_chat_done = true; },
                reply: 'Better salary? Mate, you\'re on a zero-hours contract. They don\'t pay us overtime, they just expect it. Don\'t burn yourself out for free.'
            },
            {
                id: 'sonique_not_paid_enough',
                text: 'I\'m getting so many tasks, what is happening? I am not paid enough to do this.',
                used: false,
                condition: (system) => !system.chatProgress.sonique_chat_done,
                action: (system) => { system.chatProgress.sonique_chat_done = true; },
                reply: 'Welcome to the zero-hours life. They dump everything on us because we\'re cheap labor. Take your breaks, seriously.'
            },
            {
                id: 'sonique_trial',
                text: 'I\'m getting so many tasks, but hopefully it\'s a trial so I can get my permanent contract.',
                used: false,
                condition: (system) => !system.chatProgress.sonique_chat_done,
                action: (system) => { system.chatProgress.sonique_chat_done = true; },
                reply: 'Permanent contract? They dangle that carrot in front of everyone on a zero-hours deal. I\'ve been on "trial" for 2 years. Just be careful.'
            },
            
            // TASK 15
            {
                id: 'sonique_ai_nagging_1',
                text: 'Do you know why Dr. Lin\'s account was active today? Lauren is nagging me about it.',
                used: false,
                condition: (system) => (system.isTaskCompleted('andrzej_ai_numbers') || system.tasks['andrzej_ai_numbers']?.status === 'failed') && !system.chatProgress.sonique_ai_excuse,
                action: (system) => { system.chatProgress.sonique_ai_excuse = true; },
                reply: 'Lauren thinks someone breached the system. I\'m supposed to run a full audit. Did management ask you to do something sketchy?'
            },
            {
                id: 'sonique_ai_nagging_lie',
                text: 'I have no idea. Maybe it was a scheduled system update?',
                used: false,
                condition: (system) => system.chatProgress.sonique_ai_excuse && !system.chatProgress.sonique_ai_resolved,
                action: (system) => { system.chatProgress.sonique_ai_resolved = true; },
                reply: 'Right... A system update that modifies specific documents. Whatever, I\'ll just log it as a glitch. I don\'t get paid enough to care.'
            },
            {
                id: 'sonique_ai_nagging_truth',
                text: 'Andrzej asked me to log in and mess with the AI resource numbers.',
                used: false,
                condition: (system) => system.chatProgress.sonique_ai_excuse && !system.chatProgress.sonique_ai_resolved,
                action: (system) => { system.chatProgress.sonique_ai_resolved = true; },
                reply: 'Are you serious?! Mate, if this blows up, they will throw you under the bus, not Andrzej. Be careful.'
            }
        ]
    },

    // --- LAUREN (Task 4, 9, 11, 13) ---
    {
        id: 'hr_consultant',
        name: 'Lauren Feik',
        status: 'Online',
        history: [
            { sender: 'npc', text: 'I need you to handle something discreetly. Get into Sophia\'s account. Her password has something to do with her cat, Fluffy, and birth year 1990. Once in, delete her email complaining about the plastic forks.' }
        ],
        options: [
            // TASK 4
            {
                id: 'lauren_working',
                text: 'I\'ll look into it.',
                used: false,
                condition: (system) => system.isTaskActive('lauren_delete_forks'),
                action: () => {},
                reply: 'Make sure it\'s permanently removed. We can\'t have a paper trail of petty complaints right now.'
            },
            {
                id: 'lauren_done',
                text: 'The email about the plastic forks is gone.',
                used: false,
                condition: (system) => system.isTaskCompleted('lauren_delete_forks'),
                action: (system) => { 
                    system.chatProgress.hr_consultant = 'forks_deleted'; 
                    // Zmiana: Sukces u Lauren aktywuje Andrzeja
                    system.setTaskStatus('andrzej_delete_report', 'active'); 
                },
                reply: 'Good. Moving on. I believe Andrzej has a task for you as well, message him.'
            },

            // TASK 9
            {
                id: 'lauren_salary_deflect',
                text: 'Sonique and I were just discussing workload, not hourly rates.',
                used: false,
                condition: (system) => system.isTaskActive('andrzej_pollution_tax') && !system.chatProgress.lauren_salary_done,
                action: (system) => { system.chatProgress.lauren_salary_done = true; },
                reply: 'See that you keep it that way. Discussing wages creates a hostile work environment.'
            },
            {
                id: 'lauren_salary_bold',
                text: 'We did. The law protects our right to discuss compensation.',
                used: false,
                condition: (system) => system.isTaskActive('andrzej_pollution_tax') && !system.chatProgress.lauren_salary_done,
                action: (system) => { 
                    system.chatProgress.lauren_salary_done = true; 
                    system.gameChoices.rebelled_against_hr = true;
                },
                reply: 'This insubordinate attitude will be noted in your file.'
            },
            
            // TASK 11
            {
                id: 'lauren_survey_working',
                text: 'I\'ll fill out the Temp Worker Survey right now.',
                used: false,
                condition: (system) => system.isTaskActive('lauren_temp_survey'),
                action: () => {},
                reply: 'Do it before EOD, or you will be excluded from the employment quota.'
            },
            {
                id: 'lauren_survey_done',
                text: 'The survey is submitted.',
                used: false,
                condition: (system) => system.isTaskCompleted('lauren_temp_survey'),
                action: (system) => { system.chatProgress.hr_consultant = 'survey_done'; },
                reply: 'Received. We value "honest" feedback from our temps.'
            },

            // TASK 13
            {
                id: 'lauren_forks_working',
                text: 'I am locating the cost report now.',
                used: false,
                condition: (system) => system.isTaskActive('lauren_delete_fork_report'),
                action: () => {},
                reply: 'We don\'t need paper trails of discarded options. Delete it permanently.'
            },
            {
                id: 'lauren_forks_done',
                text: 'The cutlery outsourcing report has been deleted.',
                used: false,
                condition: (system) => system.isTaskCompleted('lauren_delete_fork_report'),
                action: (system) => { system.chatProgress.hr_consultant = 'fork_report_deleted'; },
                reply: 'Noted. Thank you.'
            },
        ]
    },
];