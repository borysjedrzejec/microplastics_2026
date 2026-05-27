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
        { title: 'CorpChat', img: 'ico/users.ico', appId: 'chat', payload: null },
        { title: 'Internal Network', img: 'ico/network_normal_two_pcs.ico', appId: 'intranet', payload: null },
        { title: 'Internet Explorer', img: 'ico/msie2.ico', appId: 'web', payload: null },
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
    
    'accessibility': { icon: 'ico/accessibility.ico', title: 'Accessibility', width: 300 },
    
    'chat': { icon: 'ico/users.ico', title: 'CorpChat', content: 'No new messages.', width: 400 },
    'intranet': { icon: 'ico/network_normal_two_pcs.ico', title: 'Internal Network', content: 'Welcome to the intranet.', width: 500 },
    'web': { icon: 'ico/msie2.ico', title: 'Internet Explorer', content: 'This page cannot be displayed.', width: 500 }
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
        { folderId: 'project_files', name: 'Budget_1', type: 'spreadsheet', content: 'No funds available' },
        { folderId: 'project_files', name: 'Board_Directive_089', type: 'document', scenarioId: 'board_directive_089' },

        { folderId: 'bin', name: 'Old_Report.doc', type: 'document', content: 'Useless data.' },
        { folderId: 'bin', name: 'Virus.exe', type: 'app', content: '' }
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