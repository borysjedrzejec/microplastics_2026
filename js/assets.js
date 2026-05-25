const GameAssets = {

    audioPaths: {
        startup: 'sounds/startup.mp3',
        shutdown: 'sounds/shutdown.mp3',
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
        'mail': { icon: 'ico/mail.ico', title: 'Outlook Express', width: 600, height: 400 },
        'mail_reader': { icon: 'ico/message_envelope_open.ico', title: 'Message', width: 450, height: 350 },
        'mail_compose': { icon: 'ico/mail.ico', title: 'New Message', width: 450, height: 350 },
        'bin': { icon: 'ico/recycle_bin_empty.ico', title: 'Bin', content: 'Bin is empty.', width: 300},
        'accessibility': { icon: 'ico/accessibility.ico', title: 'Accessibility', width: 300}
    },

    rawMailData: [
        { folder: 'inbox', sender: 'System', subject: 'Welcome', received: '2025-10-01 10:00', body: 'Welcome to your email!', unread: true },
        { folder: 'inbox', sender: 'Manager', subject: 'Report', received: '2025-10-01 10:01', body: 'WHERE IS MY REPORT?', unread: false },
        { folder: 'intranet', sender: 'Security', subject: 'ALERT', received: '2025-10-01 10:02', body: 'ALERT ALERT', unread: true }
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