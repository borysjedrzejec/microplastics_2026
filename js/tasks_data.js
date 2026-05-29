window.GameTasksData = {
    
    // 0. TUTORIAL (Wymaga nowego zapalnika w mailach)
    tutorial_email: {
        id: 'tutorial_email',
        title: 'Tutorial: Email about the new chat tool',
        description: 'The IT department has sent instructions regarding CorpChat. Read the message from Sonique.',
        status: 'active', // Aktywne na starcie gry
        
        onMailRead: (system, mailId) => {
            // Upewnij się, że ID maila z tutorialem w assets.js to 'sys-mail-0'
            if (mailId === 'sys-mail-0') {
                system.setTaskStatus('tutorial_email', 'completed');
                
                // Odblokowanie kolejnego kroku po przeczytaniu maila
                system.setTaskStatus('afonso_check_goal', 'active');
            }
        }
    },

    // 1. ZADANIE AFONSO
    afonso_check_goal: {
        id: 'afonso_check_goal',
        title: 'Check the 2030 environmental goal',
        description: 'Afonso asked you to verify the government\'s 2030 environmental goal on the official gov website.',
        status: 'active', 
    },

    // 2. ZADANIE ANDRZEJA
    andrzej_delete_report: {
        id: 'andrzej_delete_report',
        title: 'Delete Kim\'s report',
        description: 'Break into Kim\'s account and delete the "2025-2026 biodiversity management report".',
        status: 'hidden',
        
        onFileDeleted: (system, fileId) => {
            if (fileId === 'sys-file-kim-biodiversity') {
                system.setTaskStatus('andrzej_delete_report', 'completed');
            }
        }
    },

    // 3. ZADANIE NITHARSHANA
    nitharshan_falsify_xls: {
        id: 'nitharshan_falsify_xls',
        title: 'Falsify the compliance spreadsheet',
        description: 'Modify "2025 Offshore assets compliance review.xls" so the numbers look better for Nitharshan.',
        status: 'hidden',

        onScenarioSaved: (system, scenarioId) => {
            if (scenarioId !== 'offshore_compliance_2025') return;

            const decision = system.getScenarioAnswer(scenarioId, 'data_manipulation');
            
            if (!decision) return;

            if (decision === 'falsify_positive' || decision === 'downplay_issues') {
                system.setTaskStatus('nitharshan_falsify_xls', 'completed');
            } else if (decision === 'report_truth') {
                system.setTaskStatus('nitharshan_falsify_xls', 'failed');
            }
        }
    },

    // TASK 4: Lauren (E-mail o widelcach)
    lauren_delete_forks: {
        id: 'lauren_delete_forks',
        title: 'Delete Sophia\'s email',
        description: 'Log into Sophia\'s intranet account (Hint: pet Fluffy, year 1990) and delete the .msg file about plastic forks.',
        status: 'hidden',
        
        onFileDeleted: (system, fileId) => {
            if (fileId === 'sys-file-sophia-forks') {
                system.setTaskStatus('lauren_delete_forks', 'completed');
            }
        }
    },

    // TASK 5: nitharshan (Maile Stanleya jako pliki .msg w folderze)
    nitharshan_delete_stanley_mails: {
        id: 'nitharshan_delete_stanley_mails',
        title: 'Delete Stanley\'s correspondence',
        description: 'Get into Stanley\'s intranet folder and permanently delete his .msg files with Craig and Finlay.',
        status: 'hidden',
        deletedFiles: [],
        
        onFileDeleted: function(system, fileId) {
            if (fileId === 'sys-file-stanley-craig' || fileId === 'sys-file-stanley-finlay') {
                
                if (!this.deletedFiles.includes(fileId)) {
                    this.deletedFiles.push(fileId);
                }
                
                // Gdy oba pliki .msg znikną z dysku, zadanie zaliczone
                if (this.deletedFiles.length === 2) {
                    system.setTaskStatus('nitharshan_delete_stanley_mails', 'completed');
                }
            }
        }
    },

    // TASK 6: Afonso (Raport roczny)
    afonso_polish_report: {
        id: 'afonso_polish_report',
        title: 'Polish the 2030 Annual Report',
        description: 'Find the annual report draft and adjust the wording regarding emissions to make the company look better.',
        status: 'hidden',
        
        onScenarioSaved: (system, scenarioId) => {
            if (scenarioId !== 'annual_report_2030') return;

            const wording = system.getScenarioAnswer(scenarioId, 'emissions_wording');
            if (!wording) return;

            if (wording === 'greenwash' || wording === 'downplay') {
                system.setTaskStatus('afonso_polish_report', 'completed');
            } else if (wording === 'honest') {
                system.setTaskStatus('afonso_polish_report', 'failed');
            }
        }
    },

    // TASK 8: Andrzej (Podatek od zanieczyszczeń)
    andrzej_pollution_tax: {
        id: 'andrzej_pollution_tax',
        title: 'Find info on pollution tax',
        description: 'Andrzej needs the exact government tax rate on excess carbon pollution. Search the web (Bookmarks).',
        status: 'hidden', 
    },

    // TASK 10: Afonso (Fałszowanie profitu w Excelu)
    afonso_team_profit: {
        id: 'afonso_team_profit',
        title: 'Adjust team profitability',
        description: 'Modify "Q3_Team_Profitability.xls" to increase Afonso\'s team margins. Our jobs might depend on it.',
        status: 'hidden',
        
        onScenarioSaved: (system, scenarioId) => {
            if (scenarioId !== 'q3_team_profitability') return;

            const decision = system.getScenarioAnswer(scenarioId, 'profit_manipulation');
            
            if (!decision) return;

            if (decision === 'defer_costs') {
                system.setTaskStatus('afonso_team_profit', 'completed'); // Oszustwo - sukces
            } else if (decision === 'report_actual') {
                system.setTaskStatus('afonso_team_profit', 'failed'); // Prawda - porażka
            }
        }
    },

    // TASK 11: Lauren (Ankieta pracownicza)
    lauren_temp_survey: {
        id: 'lauren_temp_survey',
        title: 'Complete HR Survey ASAP',
        description: 'Fill out the "Temp_Worker_Survey.doc" by EOD to remain in the employment quota.',
        status: 'hidden',
        
        onScenarioSaved: (system, scenarioId) => {
            if (scenarioId !== 'temp_worker_survey') return;

            const decision = system.getScenarioAnswer(scenarioId, 'survey_satisfaction');
            
            if (!decision) return;

            system.setTaskStatus('lauren_temp_survey', 'completed'); 
        }
    },

    // TASK 12: Andrzej (Zasoby narzędzia AI)
    andrzej_ai_numbers: {
        id: 'andrzej_ai_numbers',
        title: 'Adjust AI Resource Report',
        description: 'Access Dr. Catherine Lin\'s "AI_Resource_Usage.doc" and lower the resource consumption numbers. She is on Christmas leave.',
        status: 'hidden',
        
        onScenarioSaved: (system, scenarioId) => {
            if (scenarioId !== 'ai_resource_report') return;
            const decision = system.getScenarioAnswer(scenarioId, 'ai_consumption');
            if (!decision) return;

            if (decision === 'lower') {
                system.setTaskStatus('andrzej_ai_numbers', 'completed');
            } else if (decision === 'leave' || decision === 'higher') {
                system.setTaskStatus('andrzej_ai_numbers', 'failed');
            }
        }
    },

    // TASK 13: Lauren (Raport o widelcach cz. 2)
    lauren_delete_fork_report: {
        id: 'lauren_delete_fork_report',
        title: 'Delete Cutlery Cost Report',
        description: 'Locate and permanently delete "Plastics_vs_Outsourcing_Cost.doc". The decision has been made and the report is no longer needed.',
        status: 'hidden',
        
        onFileDeleted: (system, fileId) => {
            if (fileId === 'sys-file-fork-cost-report') {
                system.setTaskStatus('lauren_delete_fork_report', 'completed');
            }
        }
    },

    // TASK 14: Afonso (Oszustwo na fakturze)
    afonso_invoice_fraud: {
        id: 'afonso_invoice_fraud',
        title: 'Edit Executive Invoice',
        description: 'Open "Executive_Travel_Invoice.doc" and change the transport method from "jet" to "train".',
        status: 'hidden',
        
        onScenarioSaved: (system, scenarioId) => {
            if (scenarioId !== 'executive_invoice') return;
            const decision = system.getScenarioAnswer(scenarioId, 'travel_method');
            if (!decision) return;

            if (decision === 'train') {
                system.setTaskStatus('afonso_invoice_fraud', 'completed');
            } else if (decision === 'jet') {
                system.setTaskStatus('afonso_invoice_fraud', 'failed');
            }
        }
    },

    // TASK 16: nitharshan (Zanieczyszczenie Net Zero)
    nitharshan_net_zero: {
        id: 'nitharshan_net_zero',
        title: 'Adjust Net Zero Pollution Data',
        description: 'Lower the pollution metrics in "Net_Zero_Tech_Emissions.xls". Ensure the company appears to meet its water justice goals.',
        status: 'hidden',
        
        onScenarioSaved: (system, scenarioId) => {
            if (scenarioId !== 'net_zero_pollution') return;
            const decision = system.getScenarioAnswer(scenarioId, 'water_pollution_levels');
            if (!decision) return;

            if (decision === 'falsify_lower') {
                system.setTaskStatus('nitharshan_net_zero', 'completed');
            } else if (decision === 'report_truth') {
                system.setTaskStatus('nitharshan_net_zero', 'failed');
            }
        }
    }
};

document.addEventListener('alpine:init', () => {
    Alpine.store('tasks', {
        list: window.GameTasksData || {},
        get activeTasks() { return Object.values(this.list).filter(task => task.status === 'active'); },
        get completedTasks() { return Object.values(this.list).filter(task => task.status === 'completed'); },
        setStatus(taskId, newStatus) {
            if (this.list[taskId]) this.list[taskId].status = newStatus;
        }
    });

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