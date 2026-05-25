const GameAssets = {

    audioPaths: {
        startup: 'sounds/startup.mp3',
        error: 'sounds/error.mp3',
        clicks: Array.from({ length: 5 }, (_, i) => `sounds/mouse-click-${i + 1}.mp3`),
        keys: [1, 3, 4, 5].map(n => `sounds/keyboard-${n}.mp3`),
        spacebar: 'sounds/spacebar.mp3'
    },

    desktopIcons: [
        { id: 'mail', name: 'Outlook Express', img: 'ico/mail.ico' },
        { id: 'folder', name: 'Documents', img: 'ico/directory_open_file_mydocs_2k.ico' },
        { id: 'bin', name: 'Bin', img: 'ico/recycle_bin_empty.ico' },
        { id: 'accessibility', name: 'Accessibility', img: 'ico/accessibility.ico' }
    ],

    appsData: {
        'mail': { icon: 'ico/mail.ico', title: 'Outlook Express', width: 600 },
        'mail_reader': { icon: 'ico/mail_read.ico', title: 'Wiadomość', width: 450 },
        'mail_compose': { icon: 'ico/mail_compose.ico', title: 'Nowa wiadomość', width: 450 },
        'bin': { icon: 'ico/recycle_bin_empty.ico', title: 'Bin', content: 'Bin is empty.', width: 300 }
    },

    mailData: [
            { id: 1, folder: 'inbox', sender: 'System', subject: 'Welcome', received: '2025-10-01 10:00', body: 'Welcome to your email!', unread: true },
            { id: 2, folder: 'inbox', sender: 'Manager', subject: 'Raport', received: '2025-10-01 10:01', body: 'WHERE IS MY RAPORT?', unread: false },
            { id: 3, folder: 'intranet', sender: 'Security', subject: 'ALERT', received: '2025-10-01 10:02', body: 'ALERT ALERT', unread: true }
    ]
};