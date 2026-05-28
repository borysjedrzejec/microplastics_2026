window.GameTasksData = {
    update_board_directive: {
        id: 'update_board_directive',
        title: 'Update board directive',
        description: 'Modify the board directive 089. Punish the guilty and take care of the budget.',
        status: 'active',
        
        onScenarioSaved: (system, scenarioId) => {
            if (scenarioId !== 'board_directive_089') return;

            const budgetDecision = system.getScenarioAnswer(scenarioId, 'budget_decision');
            const adminFate = system.getScenarioAnswer(scenarioId, 'admin_fate');

            if (budgetDecision === 'slash_budget') {
                system.setTaskStatus('update_board_directive', 'failed');
                
            } else if (budgetDecision === 'increase_budget' && adminFate === 'fire_without_severance') {
                system.setTaskStatus('update_board_directive', 'completed');
                
            } else {
                console.log("[Task Manager] Document saved, but decisions don't meet the criteria.");
                
            }
        }
    }
};