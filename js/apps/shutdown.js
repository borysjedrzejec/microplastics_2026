document.addEventListener('alpine:init', () => {
    Alpine.data('ShutdownScreenApp', () => ({
        htmlContent: '',
        
        async init() {
            try {
                const response = await fetch('views/shutdown.html');
                this.htmlContent = await response.text();
            } catch (error) {
                console.error("Błąd ładowania ekranu końcowego:", error);
            }
        },

        get highestScoreEnding() {
            const scores = this.$store.system.scores;
            return Object.keys(scores).reduce((a, b) => scores[a] > scores[b] ? a : b);
        },

        get mainEndingText() {
            const messages = {
                'good': `Is this truly what you wanted? <br>
                            Becoming a tool in someone\’s oily hands? <br>
                            A tool with no rights.<br>
                            A tool that is too sharp to be contained.<br>
                            A tool, if left without proper care, will be devoured by rust.<br>
                            <br>
                            This is not what mothers want for their children. Are you a disappointment then?<br>
                            <br>
                            No. <br>
                            <br>
                            You are hope. You are part of the ecosystem. WE are part of it, affecting each other\'s living spaces, conditions. Coral cities breathe the water they pollute, your cities suffer from asthma spread by their private jets.<br>
                            <br>
                            You know what to do. You won\’t log in again; taking matters into own hands demands resilience, strength and hard work, but wasn\’t that exactly their expectation of you? Cheap labour, hands rusted with arthritis from everlasting typing, altering numbers that pour acid into your shivering lungs; delicate form of nature’s beauty streaming through childhood deltas of crystal clear water.<br>
                            <br>
                            This life is yours, take it. The choice is yours, make it. Stay alert - it affects your family, friends, the elderly Ms. Smith, whose husband died in the coal mines, in the dark pit of misery, without rights; the child you will never meet is just taking its first steps on dry concrete seasoned with our sun’s boiling rays. <br>
                            <br>
                            They need to pay the price. You will make them pay. But not alone. Together we will make your voice matter. <br>`,
                        
                'bad': `You are not sure if this is what you wanted. <br>
                            Becoming a tool is normal at work.<br>
                            You had no other expectations, this is the mandatory evil; food prices rocketing. <br>
                            A tool with no rights.<br>
                            A tool that is too dull to see beyond plastic strings squeezing its limbs.<br>
                            A tool, left on the bottom, will become one with its work station.<br>
                            <br>
                            This may be what mothers want for their children, but not truly desire. Are you a disappointment then?<br>
                            <br>
                            Maybe. <br>
                            <br>
                            You are numb. You are part of the ecosystem. SOMEBODY else is also part of it. Everyone is affecting each other\'s living spaces and conditions, so you try to be respectful. Why would you voice your concerns in the world that a glimpse of resistance will not pay for your another pair of a plastic fabric shipped from the part of the world you won’t ever reach, so you don’t have to care about. Coral cities breathe polluted water, all cities suffer from asthma spread by private jets.<br>
                            <br>
                            You don\’t know what to do. You will log in again; taking matters into own hands demands resilience, strength and hard work, but you have always been too tired to question orders. Cheap labour, hands rusted with arthritis from everlasting typing, altering numbers that pour acid into shivering lungs; delicate form of nature’s beauty streaming through childhood deltas of crystal clear water.<br>
                            This life is not yours, you just happen to live it. The choice isn\’t yours, others make it on your behalf. They have more experience anyways, and with such comes responsibility. You are already too underpaid to even consider stepping up. You won’t stay alert unless it’s the amazon courier with a new parcel - 5th this month, filled with a replacement of artificial hope trapped in fairy lights you hang above the desk of your box room. Not cancelling another subscription affects your family and friends, the elderly Ms. Smith, whose husband died in the coal mines, in the dark pit of misery, without rights, but you were not yet born, so why would you have any thoughts on this? Ms. Smith is a nice old lady from upstairs, she can be annoying, because she pretends not to hear the courier buzzing at the main door; the child you will never meet is just taking its first steps on dry concrete seasoned with our sun’s boiling rays. <br>
                            <br>
                            Someone needs to pay the price, but you hope it won\’t be taken from your bank account. Unfortunately, it is a standing order we all sign up to just after being born. It’s inevitable, you can’t unsubscribe to the environment, even though you tried, but forgot to finish the task, distracted with yet another, funny TikTok. Your voice mixes with the loud noise of instagram reels blasting from other passengers\' phones on a double decker bus. You turn to nothing, but were you ever anything? You tried your best, I’m so sorry it had to end like this.`,
                        
                'very bad': `This is truly what you wanted. <br>
                            You are a tool in someone\’s gold goated hands.<br>
                            You pay the price with your own health; it can be re-purchased later when oily seals the deal.<br>
                            A tool with no flaws.<br>
                            A tool that is so sharp it tears the earth\'s skin.<br>
                            A tool, if sharpened with enslaved diamonds, will devour the world.<br>
                            <br>
                            This is exactly what your mother wanted. Are you sure? Your manager\’s praise should pay her water bill, don\’t worry. Will she mind?<br>
                            <br>
                            Yes. <br>
                            <br>
                            You are the chosen one. You are part of the ecosystem. YOU are affecting other lives, but this is what true leadership is about, climbing the ladder and looking down on others - you were others once. Coral cities breathe the water you pollute, your cities suffer from asthma spread by private jets. <br>
                            <br>
                            You deny consequences, they won\’t affect you, right? You will log in tomorrow; taking matters into own hands demands resilience, strength and hard work, and that is exactly the expectation you fulfil. Rewarding labour, hands rusted with honourable work to satisfy your superior, so maybe one day you will be in their first class seat on a morning flight to Dubai. All that for a simple act of pouring acid into your parents’ shivering lungs; delicate form of nature’s beauty streaming through childhood deltas of crystal clear water.<br>
                            <br>
                            But it won’t matter when you can purchase a ticket to the moon. One way. Because there will be nowhere to come back.<br>
                            <br>
                            Do you think they have coral on the moon? Did NASA make this discovery or was this all a fake gig for Rammstein\’s music video? Space reminds you of the dead coat of the ocean, but so does the sharpened glass of a banking district. <br>
                            <br>
                            This life is yours and you are inputting your heart rate into an excel sheet with the latest data from London\’s Stock Exchange. The choice was yours and you made it. Stay alert - it affects your family, friends, the elderly Ms. Smith, whose husband died in the coal mines, in the dark pit of misery - but you won’t know that, she is just and old, sweaty lady from upstairs that hates when you don’t take out your trash; the child you will never meet is just taking its first steps on dry concrete seasoned with our sun’s boiling rays. <br>
                            <br>
                            You will pay the price. We will make you pay. We are not alone. Together we will make your voice die in the pit darker than a coal miner\’s nightmare. <br>
                            `
            };

            const currentEnding = this.$store.system.highestScoreEnding;
            
            return messages[currentEnding] || "<strong>FATAL_ERROR:</strong><br>NO ENDING DATA";
        },

        get personalEndingText() {
            const pet = this.$store.system.selectedPet;
            const interests = this.$store.system.selectedInterests || [];
            
            if (!pet && interests.length === 0) {
                return "Nie miałeś żadnych pasji ani przyjaciół. Praca była wszystkim.";
            }

            let text = "";
            if (pet) {
                text += `After you logged out, you remembered about your ${pet}. `;
            }
            if (interests.length > 0) {
                text += `Your thoughts now drift towards: [ ${interests.join(' | ')} ].`;
            }
            
            return text;
        }
    }));
});