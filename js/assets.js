const ConditionalMailsData = [
    {   
        requiredInterest: 'Sea creatures',
        folder: 'inbox',
        sender: 'Aquarium',
        subject: 'Discount for Tickets to the Aquarium',
        unread: true,
        pinned: false,
        content: `Hi there,\n\nWe have sent you a discount to visit the aquarium.\n\nGet your free discount code below\nACQUARIUMFISH123\n\nYour discount code is valid for up to 2 days, to redeem this discount, simply copy the code and go to aquarium.com and buy a ticket and apply the discount at the checkout.\n\nRegards,\nAquarium\nPromotions team`
    },
    {   
        requiredInterest: 'Sea creatures',
        folder: 'inbox',
        sender: 'Sea News',
        subject: 'NewsLetter',
        unread: true,
        pinned: false,
        content: `Good Morning,\n\nBreaking News: Scientists have discovered a new species of octopus and they have decided to give it the name blue octopus and you wont believe why.\n\nRegards,\nSea News\nNews team`
    },
    {   
        requiredInterest: 'Cooking & Baking',
        folder: 'inbox',
        sender: 'MorisBons',
        subject: 'Discount voucher',
        unread: true,
        pinned: false,
        content: `Greetings,\n\nWe have sent you a discounted voucher meant for ingredients used in baking\n\nGet your free voucher below\nMORISBONS67\n\nYour voucher will be valid for 1 day, simply go to morrisbons.com and activate you voucher at checkout\n\nRegards,\nMorisBons\nPromotions team`
    },
    {   
        requiredInterest: 'Cooking & Baking',
        folder: 'inbox',
        sender: 'BakersWeekly',
        subject: 'NewsLetter',
        unread: true,
        pinned: false,
        content: `Good Morning,\n\nBreaking News: Famous vlogger/youtuber Joe Sugg has fainted at the sight of blood during the participation of the great british bake off.\n\nRegards,\nBakersWeekly\nNews team`
    },
    {   
        requiredInterest: 'Magic',
        folder: 'inbox',
        sender: 'Equestria',
        subject: 'Discount voucher',
        unread: true,
        pinned: false,
        content: `Greetings,\n\nWe have sent you a magical gift for a chance to go on a tour around Equestria for a discounted rate\n\nGet your magical voucher code below\nEqUeStY136\n\nYour voucher will be valid for 3 days, simply cast a spell to go to Equestria.com and cast a spell to activate your discount at checkout.\n\nRegards,\nEquestria\nPromotions team`
    },
    {   
        requiredInterest: 'Magic',
        folder: 'inbox',
        sender: 'EquestriaNews',
        subject: 'NewsLetter',
        unread: true,
        pinned: false,
        content: `Good Morning,\n\nBreaking News: A diver has told a bizarre story of seeing Saruman swimming with the fishes. However someone else going by the name Gandalf has denied these allegations.\n\nRegards,\nEquestriaNews\nNews team`
    },
    {   
        requiredInterest: 'Video Games',
        folder: 'inbox',
        sender: 'Vapour',
        subject: 'Discount voucher',
        unread: true,
        pinned: false,
        content: `Greetings,\n\nWe have sent you a discount for games on Vapour\n\nGet your Vapour discount code below\nVAPOR 148\n\nYour voucher will be valid for 1 day, simply activate the code at checkout\n\nRegards,\nVapour\nPromotions team`
    },
    {   
        requiredInterest: 'Video Games',
        folder: 'inbox',
        sender: 'VideoGamesNews',
        subject: 'NewsLetter',
        unread: true,
        pinned: false,
        content: `Good Morning,\n\nBreaking News: BJacksepticeye a famous youtuber has taken an interest in making a live action Bloodborne film and would like to make sure its as close to the game as possible\n\nRegards,\nVideoGamesNews\nNews team`
    },
    {   
        requiredInterest: 'Gardening',
        folder: 'inbox',
        sender: 'HouseBase',
        subject: 'Discount voucher',
        unread: true,
        pinned: false,
        content: `Greetings,\n\nWe have sent you a discount for gardening tool at Housebase\n\nGet your HouseBase discount code below\nHBASE120\n\nYour voucher will be valid for 10 days, simply redeem the code at checkout.\n\nRegards,\nHouseBase\nPromotions team`
    },
    {   
        requiredInterest: 'Gardening',
        folder: 'inbox',
        sender: 'Gardening Weekly',
        subject: 'NewsLetter',
        unread: true,
        pinned: false,
        content: `Good Morning,\n\nJack Black a famouse actor, one who has starred in the Minecraft Movie and many others has made it on the news claiming that his gardening tools from HouseBase have been found to be radioactive.\n\nRegards,\nGardening Weekly\nNews team`
    }
];

const GameAssets = {

    audioPaths: {
        startup: 'sounds/startup.mp3',
        shutdown: 'sounds/shutdown.mp3',
        error: 'sounds/error.mp3',
        clicks: Array.from({ length: 5 }, (_, i) => `sounds/mouse-click-${i + 1}.mp3`),
        keys: [1, 3, 4, 5].map(n => `sounds/keyboard-${n}.mp3`),
        spacebar: 'sounds/spacebar.mp3'
    },

    rawDesktopIcons: [
        {title: 'Bin', img: 'ico/recycle_bin_empty.ico', appId: 'file_explorer', payload: { folderId: 'bin', title: 'Bin' }},
        { title: 'Accessibility', img: 'ico/accessibility.ico', appId: 'accessibility', payload: null },
        { title: 'CorpChat', img: 'ico/users.ico', appId: 'corpchat', payload: null },
        { title: 'Outlook Express', img: 'ico/mail.ico', appId: 'mail', payload: null },
        { title: 'Internal Network', img: 'ico/network_normal_two_pcs.ico', appId: 'intranet', payload: null },
        { title: 'Internet Explorer', img: 'ico/msie2.ico', appId: 'browser', payload: null },
        {title: 'Project Files', img: 'ico/directory_open_net_web_documents.ico', appId: 'file_explorer', payload: { folderId: 'project_files', title: 'Project Files' } },
    ],

    appsData: {
    'mail': { icon: 'ico/mail.ico', title: 'Outlook Express', width: 600, height: 400 },
    'mail_reader': { icon: 'ico/message_envelope_open.ico', title: 'Message', width: 450, height: 350 },
    
    'file_explorer': { icon: 'ico/directory_open_file_mydocs_2k.ico', title: 'File Explorer', width: 500, height: 350 },

    'notepad': { icon: 'ico/notepad.ico', title: 'Notepad', width: 500, height: 500 },
    'excel': { icon: 'ico/excel.ico', title: 'Excel', width: 800, height: 500 },
    'browser': { icon: 'ico/msie2.ico', title: 'Internet Explorer', width: 640, height: 600 },
    
    'accessibility': { icon: 'ico/accessibility.ico', title: 'Accessibility', width: 300 },
    
    'corpchat': { icon: 'ico/users.ico', title: 'CorpChat', width: 650, height: 400 },
    'intranet': { icon: 'ico/network_normal_two_pcs.ico', title: 'Internal Network', width: 500, height: 400 },
    },

    rawMailData: [
        {   id: 'sys-mail-0',
            folder: 'inbox',
            sender: 'Sonique Hedge',
            subject: 'New CorpChat & Tutorial',
            unread: true,
            pinned: true,
            content: `
Hi,\n\n

Please be advised that the IT department has fully migrated our internal communications to the new CorpChat system, effective immediately.\n\n 

HOW TO USE IT:\n
1. Always check your Task Manager (the checklist icon) for active directives.\n
2. Reply to your colleagues by clicking the available response chips at the bottom of the chat window.\n
3. Some responses will only unlock after you find the right information in your emails, files, or the intranet.\n
\n\n
Afonso (Team Manager) has already logged a request and is waiting for you online. Please reach out to him as soon as possible.\n\n

Regards,\n
Sonique Hedge\n
IT Support Specialist\n`
        },

        {   
            id: 'sys-mail-1',
            folder: 'inbox',
            sender: 'Stanley Swan',
            subject: 'Aiofe\s BRITHDAY!!',
            unread: true,
            pinned: false,
            content: [
                { type: 'text', text: 'Craig,\n\n I drew her portrait for the poster. Print it out ASAP.\n It comes out pixilated for me, I think I need a new printer' },
                
                { type: 'image', src: 'images/aoife.webp', style: 'max-width: 300px;' },
                
                { type: 'text', text: '\n\nStan\n\nSent from my IPad' }
            ]
        }
    ],

    rawFileSystem: [
        { id: 'offshore_compliance_2025', folderId: 'project_files', name: 'Offshore_Compliance_2025', type: 'spreadsheet', scenarioId: 'offshore_compliance_2025' },

        { id: 'sys-file-old-report', folderId: 'bin', name: 'Old_Report', type: 'document', content: 'FWOFJP3#%^&%$&$nwdsagsgSDF##TY UHBBSBSDS#$^%$^%$&$&' },

        { id: 'sys-file-kim-biodiversity', folderId: 'folder_kim_ferguson', name: 'Biodiversity_Report_2025', type: 'document', scenarioId: 'kim_biodiversity_report', content: '2025-2026 Biodiversity Management Report' },


        {
            id: 'survey_file',
            folderId: 'project_files',
            name: 'HR_Survey_Mandatory.txt',
            type: 'document', 
            isHidden: true,
            scenarioId: null,
            content: []
        },
        // TASK 4: Mail Sophii o widelcach
        {
            id: 'sys-file-sophia-forks',
            folderId: 'folder_sophia_heart', 
            type: 'email',
            name: 'FW_Breakroom_Supplies',
            content: `
Dear all, 

Happy Friday! 

We have noticed that some are using the canteen while still clocked in. Please be reminded that the use of any of the cafes, canteens or break rooms is strictly prohibited outside of the allocated break times. If you need to use the loo please report to one of the on-site supervisors and let them know, do not leave your station unsupervised otherwise revenue is lost and we can’t afford that, especially with the Christmas bonuses approaching, and we all want to receive big ones with the continuing economy crisis. 

Additionally, please use the plastic cutlery provided, as with more employees we can have issues with providing normal ones to everyone during their allocated break time, and we are hearing complaints that people are not able to finish their lunch on time, losing their pay due to other colleagues' sloppiness. 

Hope we can all agree that we require everyone\’s immediate attention to this matter to streamline the KPIs so we all enjoy Christmas with our families. 

Should you have any concerns regarding the above please get in touch with me directly. 

Kind regards, 

Sophia Hearts 
HR Partner`
        },

        {
            id: 'cutlery_cost_comparison',
            folderId: 'folder_sophia_heart',
            name: 'Cutlery_Cost_Analysis_Q3',
            type: 'document',
            scenarioId: null,
            content: [
                { type: 'text', text: 'INTERNAL MEMO: Cutlery Provisioning Analysis\n' },
                { type: 'text', text: '-------------------------------------------------\n\n' },
                { type: 'text', text: 'Current expenditure on single-use plastics: £14,500/annum.\n' },
                { type: 'text', text: 'Proposed transition to reusable steel cutlery (initial outlay): £3,200.\n' },
                { type: 'text', text: 'Annual maintenance & washing via outsourced service: £4,100/annum.\n\n' },
                { type: 'text', text: 'CONCLUSION: Transitioning to reusable cutlery saves £7,200 annually and aligns with ESG goals. Single-use contracts should be terminated immediately.\n\n' },
                { type: 'text', text: 'STATUS: [PENDING BOARD APPROVAL]' }
            ]
        },

        // TASK 5: Mail Stanleya (Z Craigiem i Finem)
{
            id: 'sys-file-stanley-craig-finlay',
            folderId: 'folder_stanley_swan',
            type: 'email',
            name: 'RE_Project_Deadline',
            content: `
Craig, Fin

Thanks for the heads up.

The project is up and running thanks to Doc Katy , some bits are still up to debate but I am certain we are able to cover for the sustain goals by the end of 2028 if we have Andy, Jenkins and Ilyas on overtime. They happy for extra money , but they were sent South for some temp ptoject by the useless agency. Get them here, I dont care how n how much it costs, even let them use my jet, I need them so the numbers match for the annual report. Lets delete some 0s.

See u saturday,

Stan 

Sent from my Iphone

===========================================

Hi Stan, im sending this to Soph & the rest, lmk if u need to add anything: 

Hi all, 

Just reminding everyone that the report has to be ready by the end of week. We knew for months this was coming, why is it not done? We need to make it happen, the numbers are in absolute chaos, how am I supposed to put it all together and check all the boxes for Stan if we go insanely above the threshold, the gov’s requirements etc ? I am not sure if this is just a bug or the excel’s incorrect or who did it, but it needs fixing! I can’t show it to anyone, even I am doubting our integrity with all this. 

Please concentrate on this ASAP and no more mentions about the bonus. If no fixing is done, no bonuses would be affordable in the future. 

Cheers, 

Craig 

===========================================

Hi Big C, 

All good, proceed :thumbsup: 

Sent from my Iphone 

===========================================

Hi Fin, 

Just letting you know that I spoke to Stan (cc’ed you for visibility Big S, don’t you dare texting Fin while he is OOO) yesterday on site and despite the chaos I think we can make it happen. It’s a big stretch, we need to focus on the next one bit earlier, and not on the plastic forks. Who cares abt plastic forks etc , the spill was worst anyways. And the smart laddie from Edinburgh emailed me again so keep that in mind as well for when you’re back.

Despite the above, I hope you can relax with the fam while OOO and dont you dare answering Stan, you deserve rest ! . Dubai is very nice, you can tell me more over a cold one Sat. The weather’s so nice, but Im glad our new house has AC.

Cheers, 

Craig 

==============================================

Craig, 

Thanks mate I appreciate it, I know you got it covered and Stan wont need to call me unless he really misses me or the whole thing blows up - hopefully not, that will be difficult to cover. 

Fin
    `
        },



        // TASK 5: Opcjonalne znalezisko (Hasła Craiga)
        {
            id: 'sys-file-craig-password',
            folderId: 'folder_finlay_entrantes',
            type: 'document',
            name: 'Craigs_Laptop',
            content: `<img src='images/craig_buck.jpg' alt='Craig Buck' style='width: 100%;'>`
        },

        {
            id: 'sys-file-stanley-notes',
            folderId: 'folder_stanley_swan',
            type: 'email',
            name: 'fork_off',
            content: `
Pack Your bags Stanley, you are going to Saint Tropez!

Dear Stanley Swan, 

Thank you for choosing British Skyways, please see the details of your trip below. 

    Ticket holder: Stanley Swan
    Flight no: SaintTropez67
    Route: London - Saint Tropez 

    Ticket holder: Finlay Entrantes
    Flight no: SaintTropez67
    Route: London - Saint Tropez 

We wish you a pleasant journey and thank you for flying with British Skyways Premium class gold. 

British Skyways Team
    `
        },

        // TASK 6: Raport Roczny (Plik startowy dla interakcji Afonso)
        {
            id: 'sys-file-afonso-report',
            folderId: 'folder_afonso_tavares', 
            type: 'document',
            name: 'Draft_Annual_Report_2030',
            scenarioId: 'annual_report_2030', // Łączy plik ze scenariuszem poniżej!
            content: [] // Puste, ponieważ treść wstrzyknie mechanika 'GameScenarios'
        },
        { id: 'sys-file-afonso-q3', folderId: 'project_files', name: 'Q3_Team_Profitability.xls', type: 'spreadsheet', scenarioId: 'q3_team_profitability' },
        { id: 'sys-file-hr-survey', folderId: 'project_files', name: 'Temp_Worker_Survey.doc', type: 'document', scenarioId: 'temp_worker_survey' },

        // TASK 12: Raport AI
        { id: 'sys-file-catherine-ai', folderId: 'folder_catherine_lin', name: 'AI_Resource_Usage', type: 'document', scenarioId: 'ai_resource_report' },
        { id: 'sys-file-catherine-rave', folderId: 'folder_kim_ferguson', name: 'Rave_Party_Tickets', type: 'email', content: 'God bless you Kim,\nWe pray you will show up for the last worship this year - bring a partner, Noah said he wants everyone in 2s.\nTicket holder: Kim Ferguson\nEvent: ARKH\nType: RAVE\n\nTicket holder: Catherine Lin\nEvent: ARKH\nType: RAVE\n\nSee you on the other side! \n\nBlessed by Lord team ' },
        { id: 'sys-file-catherine-rave-2', folderId: 'folder_catherine_lin', name: 'Rave_Party_Tickets', type: 'email', content: 'God bless you Kim,\nWe pray you will show up for the last worship this year - bring a partner, Noah said he wants everyone in 2s.\nTicket holder: Kim Ferguson\nEvent: ARKH\nType: RAVE\n\nTicket holder: Catherine Lin\nEvent: ARKH\nType: RAVE\n\nSee you on the other side! \n\nBlessed by Lord team ' },

        // TASK 14: Faktura Afonso
        { id: 'sys-file-executive-invoice', folderId: 'folder_craig_buck', name: 'Executive_Travel_Invoice', type: 'document', scenarioId: 'executive_travel_invoice' },
        // TASK 16: Excel Nitharshana (Zanieczyszczenie)
        { id: 'sys-file-net-zero-pollution', folderId: 'project_files', name: 'Net_Zero_Tech_Emissions', type: 'spreadsheet', scenarioId: 'net_zero_pollution' },
        {
            id: 'sys-file-sophia-rave-tickets',
            folderId: 'folder_sophia_heart',
            type: 'email',
            name: 'FW_Rave_Tickets.msg',
            content: [
                { type: 'text', text: 'From: Speedie\'s Team\nTo: Sophia Heart\nSubject: Get your Rave PASSWORD for Kim and yourself\n\n' },
                { type: 'text', text: 'Our dearest Sophia,\n\nGet ready to ruuuuumble!\n\nBelow are your tickets for the freakiest beats in town. Don\'t hurt your nose from all the good fun!\n\n' },
                { type: 'text', text: 'Ticket holder: Sophia Heart\nEvent PASSWORD: SpeedfreaksFM\nType: RAVE\n\n' },
                { type: 'text', text: 'Ticket holder: Kim Ferguson\nEvent PASSWORD: SpeedfreaksFM\nType: RAVE\n\n' },
                { type: 'text', text: 'Cheers, see you there,\n\nSpeedie\'s Team' }
            ]
        },
    ],

    rawBookmarks: [
        { 
            id: 'petz', 
            title: 'All About Petz', 
            url: 'www.petz.com', 
            verified: false, 
            type: 'html', 
            contentId: 'petz_homepage'
        },
        { 
            id: 'gov_env_2030', 
            title: 'Gov.uk - 2030 Environmental Vision', 
            url: 'www.gov.uk/policy/env-2030-targets', 
            verified: false, 
            type: 'html', 
            contentId: 'gov_env_2030_scenario'
        },
        { 
            id: 'gov_tax_portal', 
            title: 'Gov.uk - Industrial Taxation & Levies', 
            url: 'www.gov.uk/corporate/pollution-tax',
            verified: false,
            type: 'html', 
            contentId: 'gov_tax_portal'
        }
    ],

    rawCaptchas: [
        {
            prompt: "fish",
            bgImage: "images/captcha/background.webp",
            gridSize: 4,
            targetObjects: ["images/captcha/fish_1.webp", "images/captcha/fish_2.webp", "images/captcha/fish_3.webp"],
            decoyObjects: ["images/captcha/fishing_hook.webp", "images/captcha/plastic.webp", "images/captcha/fishing_line.webp"],
            targetCount: 3,
            decoyCount: 3
        },

        {
            prompt: "plastic waste",
            bgImage: "images/captcha/background.webp",
            gridSize: 4,
            targetObjects: ["images/captcha/pipe.webp", "images/captcha/plastic.webp", "images/captcha/fishing_line.webp"],
            decoyObjects: ["images/captcha/fish_1.webp", "images/captcha/fish_2.webp", "images/captcha/fish_3.webp"],
            targetCount: 4,
            decoyCount: 2
        },

        {
            prompt: "oil spill",
            bgImage: "images/captcha/background.webp",
            gridSize: 4,
            targetObjects: ["images/captcha/oil_barrel.webp"],
            decoyObjects: ["images/captcha/fish_1.webp", "images/captcha/plastic.webp", "images/captcha/fish_3.webp", "images/captcha/fishing_line.webp"],
            targetCount: 8,
            decoyCount: 3
        },

        {
            prompt: "bicycles",
            bgImage: "images/captcha/background.webp",
            gridSize: 4,
            targetObjects: ["images/captcha/bicycle.webp"],
            decoyObjects: ["images/captcha/fish_1.webp", "images/captcha/fish_2.webp", "images/captcha/fish_1.webp", "images/captcha/fishing_hook.webp", "images/captcha/fish_3.webp", "images/captcha/fishing_line.webp"],
            targetCount: 1,
            decoyCount: 6
        }
    ],


    rawIntranetAccounts: [
        { 
            id: 'acc_kim_ferguson', 
            name: 'Kim Ferguson', 
            department: 'Environmental Compliance',
            correctPass: 'SpeedfreaksFM', // DISCO ELYSIUM
            options: ['disco2025', 'reef123', 'SpeedfreaksFM', 'kim_k', '1989'], 
            targetFolderId: 'folder_kim_ferguson'
        },
        { 
            id: 'acc_sophia_heart', 
            name: 'Sophia Heart', 
            department: 'HR',
            correctPass: 'Fluffy1990', // Hasło z hintu (kot + rok)
            options: ['Fluffy1990', 'starbucks', 'ilovemycat', 'hr_queen', '1990'], 
            targetFolderId: 'folder_sophia_heart'
        },
        { 
            id: 'acc_stanley_swan', 
            name: 'Stanley Swan', 
            department: 'Executive',
            correctPass: 'AoifeSapphire', // Hasło znalezione w mailu od Sonique
            options: ['CEO_Swan_2026', 'netzero', 'AoifeSapphire', 'swan_lake', '1234'], 
            targetFolderId: 'folder_stanley_swan'
        },
        { 
            id: 'acc_catherine_lin', 
            name: 'Dr. Catherine Lin', 
            department: 'Engineering',
            correctPass: 'ARKH_RAVE_2026', // Hasło znalezione w mailu u kima
            options: ['catherine_lin', 'noahsark', 'pathos2', 'ai_master', 'ARKH_RAVE_2026'], 
            targetFolderId: 'folder_catherine_lin'
        },
        { 
            id: 'acc_craig_buck', 
            name: 'Craig Buck', 
            department: 'Finance',
            correctPass: 'b00bies', // Hasło ze zdjęcia u Stanleya
            options: ['b00bies', 'money', 'bigbucks', 'finance2026', 'craig_cfo'], 
            targetFolderId: 'folder_craig_buck'
        },
        { 
            id: 'acc_finlay_entrantes', 
            name: 'Finlay Entrantes', 
            department: 'Executive',
            correctPass: 'SaintTropez67', // Hasło z maila u Stanleya
            options: ['GolfPro1980', 'billgates', 'cto_win', 'SaintTropez67', 'golf_master'], 
            targetFolderId: 'folder_finlay_entrantes'
        }
    ],

    accessibilityData: [
        { 
            id: 'disableAnimations', 
            icon: 'ico/accessibility_contrast.ico', 
            label: 'Disable Animations' 
        },
        { 
            id: 'disableAudio', 
            icon: 'ico/computer_sound.ico', 
            label: 'Turn Off Audio' 
        },
        { 
            id: 'disableTimer', 
            icon: 'ico/accessibility_stopwatch.ico', 
            label: 'Turn Off Timer' 
        },
        { 
            id: 'showScores', 
            icon: 'ico/file_eye.ico',
            label: 'Show Ending Scores' 
        }
]
};