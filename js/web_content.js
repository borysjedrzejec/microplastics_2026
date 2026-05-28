const WebsitesContent = {
    'petz_homepage': {
        title: 'Petz - The Best Pets Online!',
        content: `
            <div style="text-align: center; font-family: 'Comic Sans MS', cursive;">
                <h1 style="color: #ff00ff; text-shadow: 2px 2px #00ffff;">Welcome to Petz!</h1>
                <p>Check out these cool cats!</p>
                <marquee scrollamount="5">Meow Meow Meow Meow Meow</marquee>
                <div style="border: 3px ridge #aaa; padding: 10px; margin: 10px; background: #fff;">
                    <img src="images/dancing_cat.gif" alt="Dancing Cat" style="width: 100px;">
                    <br>
                    <i>He dances!</i>
                </div>
            </div>
        `
    },
    
    'hacker_forum_login': {
        title: 'The Underground',
        type: 'scenario_link',
        scenarioId: 'hacker_login_scenario' 
    },
    
    'search_engine': {
        title: 'Find.it',
        content: `
            <div style="padding: 20px;">
                <h2 style="color: blue;">Find.it Search</h2>
                <div style="display: flex; gap: 5px;">
                    <input type="text" style="flex-grow: 1;">
                    <button>Search</button>
                </div>
                <hr>
                <p style="color: gray; font-size: 0.8em;">Index is currently rebuilding. Try again later.</p>
            </div>
        `
    }
};