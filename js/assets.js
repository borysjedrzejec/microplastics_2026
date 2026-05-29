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
        { title: 'Outlook Express', img: 'ico/mail.ico', appId: 'mail', payload: null },
        { title: 'CorpChat', img: 'ico/users.ico', appId: 'corpchat', payload: null },
        { title: 'Internal Network', img: 'ico/network_normal_two_pcs.ico', appId: 'intranet', payload: null },
        { title: 'Internet Explorer', img: 'ico/msie2.ico', appId: 'browser', payload: null },
        { title: 'Accessibility', img: 'ico/accessibility.ico', appId: 'accessibility', payload: null },

        { 
            title: 'Project Files', 
            img: 'ico/directory_open_net_web_documents.ico', 
            appId: 'file_explorer', 
            payload: { folderId: 'project_files', title: 'Project Files' } 
        },
        { 
            title: 'Bin', 
            img: 'ico/recycle_bin_empty.ico', 
            appId: 'file_explorer', 
            payload: { folderId: 'bin', title: 'Bin' } 
        }
    ],

    appsData: {
    'mail': { icon: 'ico/mail.ico', title: 'Outlook Express', width: 600, height: 400 },
    'mail_reader': { icon: 'ico/message_envelope_open.ico', title: 'Message', width: 450, height: 350 },
    
    'file_explorer': { icon: 'ico/directory_open_file_mydocs_2k.ico', title: 'File Explorer', width: 500, height: 350 },

    'notepad': { icon: 'ico/notepad.ico', title: 'Notepad', width: 500, height: 500 },
    'excel': { icon: 'ico/excel.ico', title: 'Excel', width: 800, height: 500 },
    'browser': { icon: 'ico/msie2.ico', title: 'Internet Explorer', width: 640, height: 350 },
    
    'accessibility': { icon: 'ico/accessibility.ico', title: 'Accessibility', width: 300 },
    
    'corpchat': { icon: 'ico/users.ico', title: 'CorpChat', width: 550, height: 540 },
    'intranet': { icon: 'ico/network_normal_two_pcs.ico', title: 'Internal Network', width: 500, height: 400 },
    },

    rawMailData: [
        { folder: 'inbox', sender: 'System', subject: 'Welcome', received: '2025-10-01 10:00', body: 'Welcome to your email!', unread: true, pinned: true },
        { folder: 'inbox', sender: 'System', subject: 'Welcome', received: '2025-10-01 10:00', body: 'Welcome to your email!', unread: true },
        { folder: 'inbox', sender: 'Manager', subject: 'Report', received: '2025-10-01 10:01', body: 'WHERE IS MY REPORT?', unread: true },
        { folder: 'inbox', sender: 'Banager', subject: 'Beport', received: '2025-10-01 10:01', body: 'WHERE IS MY REPORT?', unread: true },
        { folder: 'inbox', sender: 'Canager', subject: 'Ceport', received: '2025-10-01 10:01', body: 'WHERE IS MY REPORT?', unread: false },
        { folder: 'intranet', sender: 'Security', subject: 'ALERT', received: '2025-10-01 10:02', body: 'ALERT ALERT', unread: true }
    ],

    rawFileSystem: [
        { folderId: 'project_files', name: 'Document 1', type: 'document', content: 'admin:1234' },
        { folderId: 'project_files', name: 'Q4_audit_report', type: 'spreadsheet', scenarioId: 'q4_audit_report' },
        { folderId: 'project_files', name: 'Board_Directive_089', type: 'document', scenarioId: 'board_directive_089' },

        { folderId: 'bin', name: 'Old_Report.doc', type: 'document', content: 'Useless data.' },
        { folderId: 'bin', name: 'Virus.exe', type: 'app', content: '' }
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
            id: 'hacker_net', 
            title: 'The Underground', 
            url: 'www.hacker.net', 
            verified: false, 
            type: 'scenario', 
            contentId: 'hacker_forum_login'
        },
        { 
            id: 'search', 
            title: 'Search Engine', 
            url: 'www.find.it', 
            verified: true,
            type: 'html', 
            contentId: 'search_engine'
        }
    ],

    rawCaptchas: [
        {
            id: 'captcha_fish',
            prompt: 'dark blue fish',
            basePath: 'images/captcha_1/start/',
            columns: 4,
            totalTiles: 16,
            correctTiles: ['22','23']
        },
    ],


    rawIntranetAccounts: [
        { 
            id: 'acc_jdoe', 
            name: 'J. Doe (Management)', 
            department: 'Executive',
            correctPass: 'qerty123', 
            options: ['admin', 'password', 'jdoe99', 'qerty123', 'bossman'], 
            targetFolderId: 'folder_jdoe_private'
        },
        { 
            id: 'acc_msmith', 
            name: 'M. Smith (IT Sec)', 
            department: 'IT',
            correctPass: 'h4ck3r', 
            options: ['123456', 'h4ck3r', 'qwerty', 'smith', 'god'], 
            targetFolderId: 'folder_it_sec' 
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
        }
]
};