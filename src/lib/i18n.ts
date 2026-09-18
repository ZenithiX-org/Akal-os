// Akal OS i18n - English + Punjabi (Gurmukhi)
export type Language = 'en' | 'pa';

export interface AppNames {
  finder: string;
  safari: string;
  mail: string;
  messages: string;
  facetime: string;
  maps: string;
  photos: string;
  music: string;
  calendar: string;
  notes: string;
  reminders: string;
  calculator: string;
  terminal: string;
  settings: string;
  appstore: string;
  trash: string;
  weather: string;
  launchpad: string;
}

interface Translation {
  // App names
  appName: AppNames;
  // Menu bar
  menu: {
    apple: string;
    aboutApp: string;
    aboutOS: string;
    systemSettings: string;
    appStore: string;
    forceQuit: string;
    sleep: string;
    restart: string;
    shutDown: string;
    lockScreen: string;
    logOut: string;
    file: string;
    edit: string;
    view: string;
    go: string;
    window: string;
    help: string;
    new: string;
    open: string;
    close: string;
    save: string;
    newWindow: string;
    newFolder: string;
    getInfo: string;
    undo: string;
    redo: string;
    cut: string;
    copy: string;
    paste: string;
    selectAll: string;
    darkMode: string;
    lightMode: string;
    enterFullScreen: string;
    minimize: string;
    zoom: string;
    bringAllToFront: string;
    osHelp: string;
    sendFeedback: string;
    back: string;
    forward: string;
    home: string;
    desktop: string;
    downloads: string;
    applications: string;
    recentItems: string;
  };
  // Common UI
  common: {
    search: string;
    cancel: string;
    close: string;
    today: string;
    yesterday: string;
    tomorrow: string;
    welcome: string;
    welcomeSub: string;
    loading: string;
    clear: string;
    clearAll: string;
    on: string;
    off: string;
    open: string;
    get: string;
    install: string;
    installing: string;
    add: string;
    delete: string;
    send: string;
    reply: string;
    forward: string;
    new: string;
    name: string;
    date: string;
    time: string;
    location: string;
    noResults: string;
    seeAll: string;
  };
  // Control Center
  control: {
    wifi: string;
    wifiNetwork: string;
    bluetooth: string;
    airdrop: string;
    contactsOnly: string;
    doNotDisturb: string;
    focus: string;
    display: string;
    sound: string;
    darkMode: string;
    nightShift: string;
    airplay: string;
    battery: string;
    keyboard: string;
    stageManager: string;
    language: string;
    english: string;
    punjabi: string;
  };
  // Lock screen
  lock: {
    enterPassword: string;
    unlock: string;
    clickToUnlock: string;
    pressEnter: string;
    user: string;
  };
  // Boot
  boot: {
    version: string;
  };
  // Notifications
  notif: {
    title: string;
    welcomeMsg: string;
    calendarMsg: string;
    notifications: string;
    silenced: string;
    noNotifications: string;
    connected: string;
    offline: string;
  };
  // Spotlight
  spotlight: {
    placeholder: string;
    application: string;
    command: string;
    noResults: string;
  };
  // Dock tooltips already use appName
  // Weather
  weather: {
    cities: { name: string; temp: number; condition: string; icon: string; high: number; low: number; humidity: number; wind: number }[];
    hourlyForecast: string;
    dailyForecast: string;
    humidity: string;
    wind: string;
    otherCities: string;
    now: string;
  };
  // Terminal
  terminal: {
    welcome: string;
    lastLogin: string;
    help: string;
    available: string;
    prompt: string;
    user: string;
    host: string;
    commands: { [k: string]: string };
    notFound: string;
    sudoers: string;
  };
  // Finder
  finder: {
    favorites: string;
    icloud: string;
    locations: string;
    tags: string;
    name: string;
    modified: string;
    size: string;
    kind: string;
    folder: string;
    document: string;
    items: string;
    available: string;
    macintoshHD: string;
  };
  // Maps
  maps: {
    searchMaps: string;
    currentLocation: string;
    state: string;
    coords: string;
  };
  // Settings
  settings: {
    general: string;
    appearance: string;
    wallpaper: string;
    network: string;
    sound: string;
    display: string;
    battery: string;
    about: string;
    appleAccount: string;
    aboutTitle: string;
    name: string;
    osVersion: string;
    chip: string;
    memory: string;
    startupDisk: string;
    serialNumber: string;
    softwareUpdate: string;
    upToDate: string;
    automaticUpdates: string;
    accentColor: string;
    trueTone: string;
    brightness: string;
    resolution: string;
    default: string;
    refreshRate: string;
    networkName: string;
    devices: string;
    outputDevice: string;
    builtInSpeakers: string;
    focus: string;
    focusMode: string;
    lowPowerMode: string;
    optimizedCharging: string;
    chargeLevel: string;
    condition: string;
    normal: string;
    cycleCount: string;
    language: string;
    languageDesc: string;
    version: string;
    aboutText: string;
    rights: string;
  };
  // Notes
  notes: {
    title: string;
    newNote: string;
    noNoteSelected: string;
    createNote: string;
    pin: string;
    delete: string;
    titlePlaceholder: string;
    contentPlaceholder: string;
    search: string;
  };
  // Calendar
  calendar: {
    title: string;
    newEvent: string;
    eventName: string;
    addTo: string;
    myCalendars: string;
    today: string;
    sun: string;
    mon: string;
    tue: string;
    wed: string;
    thu: string;
    fri: string;
    sat: string;
  };
  // Messages
  messages: {
    title: string;
    search: string;
    activeNow: string;
    offline: string;
    iMessage: string;
    today: string;
    contacts: { name: string; lastMsg: string; time: string }[];
    replies: string[];
  };
  // Mail
  mail: {
    title: string;
    inbox: string;
    drafts: string;
    sent: string;
    trash: string;
    junk: string;
    archive: string;
    reply: string;
    forward: string;
    delete: string;
    replyPlaceholder: string;
    emails: { from: string; subject: string; preview: string; time: string }[];
  };
  // Reminders
  reminders: {
    title: string;
    all: string;
    today: string;
    scheduled: string;
    personal: string;
    work: string;
    addReminder: string;
    priority: { high: string; medium: string; low: string };
    items: { text: string; list: string; date: string }[];
  };
  // Music
  music: {
    title: string;
    library: string;
    playlists: string;
    recentlyAdded: string;
    artists: string;
    albums: string;
    songs: string;
    hourlyForecast: string;
    playlistNames: string[];
    songs_list: { title: string; artist: string; album: string }[];
  };
  // Photos
  photos: {
    title: string;
    photos: string;
    library: string;
    favorites: string;
    recents: string;
    albums: string;
    albumsList: { name: string; count: number; emoji: string }[];
    back: string;
    previous: string;
    next: string;
    share: string;
    photoCount: string;
  };
  // App Store
  appstore: {
    title: string;
    searchPlaceholder: string;
    discover: string;
    create: string;
    work: string;
    play: string;
    develop: string;
    categories: string;
    updates: string;
    appOfDay: string;
    tagline: string;
    learnMore: string;
    topFreeApps: string;
    searchResults: string;
    editorsChoice: string;
    apps: { name: string; category: string; description: string }[];
  };
  // FaceTime
  facetime: {
    title: string;
    recent: string;
    videoYesterday: string;
    selectContact: string;
    newFaceTime: string;
    calling: string;
    mute: string;
    camera: string;
    speaker: string;
    end: string;
    contacts: { name: string }[];
  };
  // Trash
  trash: {
    title: string;
    emptyTrash: string;
    empty: string;
    items: { name: string; size: string; date: string }[];
  };
  // Safari
  safari: {
    favorites: string;
    explore: string;
    popular: string;
    searchOrEnter: string;
    loading: string;
    welcomeTo: string;
    bookmarks: { name: string; icon: string; desc: string }[];
  };
}

const en: Translation = {
  appName: {
    finder: 'Finder', safari: 'Safari', mail: 'Mail', messages: 'Messages',
    facetime: 'FaceTime', maps: 'Maps', photos: 'Photos', music: 'Music',
    calendar: 'Calendar', notes: 'Notes', reminders: 'Reminders', calculator: 'Calculator',
    terminal: 'Terminal', settings: 'System Settings', appstore: 'App Store',
    trash: 'Trash', weather: 'Weather', launchpad: 'Launchpad',
  },
  menu: {
    apple: '', aboutApp: 'About', aboutOS: 'About Akal OS', systemSettings: 'System Settings...',
    appStore: 'App Store...', forceQuit: 'Force Quit...', sleep: 'Sleep', restart: 'Restart...',
    shutDown: 'Shut Down...', lockScreen: 'Lock Screen', logOut: 'Log Out...',
    file: 'File', edit: 'Edit', view: 'View', go: 'Go', window: 'Window', help: 'Help',
    new: 'New', open: 'Open...', close: 'Close', save: 'Save', newWindow: 'New Window',
    newFolder: 'New Folder', getInfo: 'Get Info', undo: 'Undo', redo: 'Redo',
    cut: 'Cut', copy: 'Copy', paste: 'Paste', selectAll: 'Select All',
    darkMode: 'Dark Mode', lightMode: 'Light Mode', enterFullScreen: 'Enter Full Screen',
    minimize: 'Minimize', zoom: 'Zoom', bringAllToFront: 'Bring All to Front',
    osHelp: 'Akal OS Help', sendFeedback: 'Send Feedback',
    back: 'Back', forward: 'Forward', home: 'Home', desktop: 'Desktop',
    downloads: 'Downloads', applications: 'Applications', recentItems: 'Recent Items',
  },
  common: {
    search: 'Search', cancel: 'Cancel', close: 'Close', today: 'Today', yesterday: 'Yesterday',
    tomorrow: 'Tomorrow', welcome: 'Welcome to Akal OS', welcomeSub: 'Click an app in the dock or press ⌘+Space for Spotlight',
    loading: 'Loading', clear: 'Clear', clearAll: 'Clear All', on: 'On', off: 'Off',
    open: 'Open', get: 'Get', install: 'Install', installing: '...', add: 'Add', delete: 'Delete',
    send: 'Send', reply: 'Reply', forward: 'Forward', new: 'New', name: 'Name',
    date: 'Date', time: 'Time', location: 'Location', noResults: 'No results', seeAll: 'See All',
  },
  control: {
    wifi: 'Wi-Fi', wifiNetwork: 'Akal Network', bluetooth: 'Bluetooth', airdrop: 'AirDrop',
    contactsOnly: 'Contacts Only', doNotDisturb: 'Do Not Disturb', focus: 'Focus',
    display: 'Display', sound: 'Sound', darkMode: 'Dark Mode', nightShift: 'Night Shift',
    airplay: 'AirPlay', battery: 'Battery', keyboard: 'Keyboard', stageManager: 'Stage Manager',
    language: 'Language', english: 'English', punjabi: 'ਪੰਜਾਬੀ',
  },
  lock: {
    enterPassword: 'Enter Password', unlock: 'Unlock', clickToUnlock: 'Click to unlock',
    pressEnter: 'Press Enter to unlock (demo mode)', user: 'Akal User',
  },
  boot: { version: 'Version 1.0' },
  notif: {
    title: 'Akal OS', welcomeMsg: 'Welcome to Akal OS 1.0! Explore the dock and launchpad.',
    calendarMsg: 'Team Meeting in 15 minutes', notifications: 'Notifications',
    silenced: 'Notifications (Silenced)', noNotifications: 'No Notifications',
    connected: 'Connected', offline: 'Offline',
  },
  spotlight: {
    placeholder: 'Spotlight Search', application: 'Application', command: 'Command', noResults: 'No results for',
  },
  weather: {
    cities: [
      { name: 'Amritsar', temp: 26, condition: 'Sunny', icon: '☀️', high: 28, low: 19, humidity: 55, wind: 8 },
      { name: 'Ludhiana', temp: 27, condition: 'Partly Cloudy', icon: '⛅', high: 29, low: 20, humidity: 60, wind: 10 },
      { name: 'Chandigarh', temp: 25, condition: 'Clear', icon: '☀️', high: 27, low: 18, humidity: 50, wind: 7 },
      { name: 'Jalandhar', temp: 26, condition: 'Cloudy', icon: '☁️', high: 28, low: 19, humidity: 65, wind: 12 },
      { name: 'Patiala', temp: 27, condition: 'Sunny', icon: '☀️', high: 29, low: 20, humidity: 58, wind: 9 },
      { name: 'Bathinda', temp: 28, condition: 'Hot', icon: '🌡️', high: 32, low: 22, humidity: 40, wind: 11 },
    ],
    hourlyForecast: 'Hourly Forecast', dailyForecast: '7-Day Forecast',
    humidity: 'Humidity', wind: 'Wind', otherCities: 'Other Cities', now: 'Now',
  },
  terminal: {
    welcome: 'Welcome to Akal OS Terminal. Type "help" for available commands.',
    lastLogin: 'Last login: ', help: 'help', available: 'Available commands:',
    prompt: 'akal@os ~ %', user: 'akal', host: 'akal-os',
    commands: {
      help: 'Show this help message', ls: 'List directory contents', pwd: 'Print working directory',
      whoami: 'Print current user', date: 'Show current date and time', echo: 'Print text',
      clear: 'Clear the terminal', open: 'Open an application', neofetch: 'Show system info',
      about: 'About Akal OS',
    },
    notFound: 'zsh: command not found:', sudoers: 'akal is not in the sudoers file. This incident will be reported. 😏',
  },
  finder: {
    favorites: 'Favorites', icloud: 'iCloud', locations: 'Locations', tags: 'Tags',
    name: 'Name', modified: 'Modified', size: 'Size', kind: 'Kind',
    folder: 'Folder', document: 'Document', items: 'items', available: '48.2 GB available',
    macintoshHD: 'Macintosh HD',
  },
  maps: {
    searchMaps: 'Search Maps', currentLocation: 'Current Location',
    state: 'Punjab', coords: '31.6340° N, 74.8723° E',
  },
  settings: {
    general: 'General', appearance: 'Appearance', wallpaper: 'Wallpaper', network: 'Network',
    sound: 'Sound', display: 'Display', battery: 'Battery', about: 'About',
    appleAccount: 'Apple Account', aboutTitle: 'About', name: "Akal's Mac", osVersion: 'Akal OS 1.0',
    chip: 'WebKit Virtual', memory: '∞ GB', startupDisk: 'Macintosh HD', serialNumber: 'AKAL000001',
    softwareUpdate: 'Software Update', upToDate: 'Up to date ✓', automaticUpdates: 'Automatic Updates',
    accentColor: 'Accent Color', trueTone: 'True Tone', brightness: 'Brightness',
    resolution: 'Resolution', default: 'Default', refreshRate: 'Refresh Rate',
    networkName: 'Akal Network', devices: 'AirPods Pro · Magic Mouse', outputDevice: 'Output Device',
    builtInSpeakers: 'Built-in Speakers', focus: 'Focus', focusMode: 'Focus Mode',
    lowPowerMode: 'Low Power Mode', optimizedCharging: 'Optimized Charging',
    chargeLevel: 'Charge Level', condition: 'Condition', normal: 'Normal ✓', cycleCount: 'Cycle Count',
    language: 'Language', languageDesc: 'Preferred language', version: 'Version 1.0',
    aboutText: 'A premium browser-based operating system experience. Built with Next.js, React, TypeScript, Tailwind CSS, and Framer Motion.',
    rights: '© 2024 Akal OS',
  },
  notes: {
    title: 'Notes', newNote: 'New Note', noNoteSelected: 'No Note Selected',
    createNote: 'Create Note', pin: 'Pin', delete: 'Delete',
    titlePlaceholder: 'Title', contentPlaceholder: 'Start writing...', search: 'Search',
  },
  calendar: {
    title: 'Calendar', newEvent: 'New Event', eventName: 'Event name', addTo: 'Add to',
    myCalendars: 'MY CALENDARS', today: 'Today',
    sun: 'Sun', mon: 'Mon', tue: 'Tue', wed: 'Wed', thu: 'Thu', fri: 'Fri', sat: 'Sat',
  },
  messages: {
    title: 'Messages', search: 'Search', activeNow: 'Active now', offline: 'Offline',
    iMessage: 'iMessage', today: 'Today',
    contacts: [
      { name: 'Harpreet Singh', lastMsg: 'Sat Sri Akal! How are you?', time: '10:30 AM' },
      { name: 'Mom', lastMsg: 'Call me when you get home', time: '9:15 AM' },
      { name: 'Team Akal', lastMsg: 'Meeting at 3pm confirmed ✅', time: 'Yesterday' },
      { name: 'Gurpreet', lastMsg: 'Did you see the new update?', time: 'Yesterday' },
      { name: 'Simran Kaur', lastMsg: 'Thanks for the help!', time: 'Mon' },
      { name: 'Tech Support', lastMsg: 'Your ticket has been resolved', time: 'Sun' },
    ],
    replies: ['That sounds great! 😊', 'Interesting!', 'Tell me more!', '👍', 'Got it!', 'Awesome!', 'Sounds good to me', 'Sat Sri Akal! 🙏'],
  },
  mail: {
    title: 'Mail', inbox: 'Inbox', drafts: 'Drafts', sent: 'Sent', trash: 'Trash',
    junk: 'Junk', archive: 'Archive', reply: 'Reply', forward: 'Forward', delete: 'Delete',
    replyPlaceholder: 'Reply...',
    emails: [
      { from: 'Akal OS Team', subject: 'Welcome to Akal OS!', preview: 'Thank you for using Akal OS 1.0...', time: '10:30 AM' },
      { from: 'App Store', subject: 'Your app is ready', preview: 'Your submission has been approved...', time: '9:15 AM' },
      { from: 'GitHub', subject: 'New pull request', preview: 'Someone opened a pull request...', time: 'Yesterday' },
      { from: 'Google', subject: 'Security alert', preview: 'A new sign-in was detected...', time: 'Yesterday' },
      { from: 'LinkedIn', subject: 'You have 5 new connections', preview: 'People you may know: Gurpreet Singh...', time: 'Mon' },
      { from: 'Netflix', subject: 'New shows added', preview: 'Check out the latest additions...', time: 'Mon' },
      { from: 'Spotify', subject: 'Your weekly mix is ready', preview: "Discover this week's playlist...", time: 'Sun' },
    ],
  },
  reminders: {
    title: 'Reminders', all: 'All', today: 'Today', scheduled: 'Scheduled',
    personal: 'Personal', work: 'Work', addReminder: 'Add Reminder...',
    priority: { high: 'High', medium: 'Medium', low: 'Low' },
    items: [
      { text: 'Buy groceries from Lawrence Road', list: 'Personal', date: 'Today' },
      { text: 'Call dentist', list: 'Personal', date: 'Tomorrow' },
      { text: 'Submit project report', list: 'Work', date: 'Today' },
      { text: 'Pay electricity bill', list: 'Personal', date: 'Yesterday' },
      { text: 'Team meeting prep', list: 'Work', date: 'Today' },
      { text: 'Read book chapter', list: 'Personal', date: 'Yesterday' },
      { text: 'Update resume', list: 'Work', date: 'This week' },
    ],
  },
  music: {
    title: 'Music', library: 'LIBRARY', playlists: 'PLAYLISTS',
    recentlyAdded: 'Recently Added', artists: 'Artists', albums: 'Albums', songs: 'Songs',
    hourlyForecast: '',
    playlistNames: ["Today's Hits", 'Chill Vibes', 'Workout Mix', 'Focus Flow', 'Throwbacks', 'Acoustic'],
    songs_list: [
      { title: 'Midnight City Dreams', artist: 'Neon Pulse', album: 'Electric Nights' },
      { title: 'Ocean Breeze', artist: 'Wave Riders', album: 'Coastal' },
      { title: 'Mountain High', artist: 'Peak Sound', album: 'Elevate' },
      { title: 'Desert Wind', artist: 'Sand Storm', album: 'Mirage' },
      { title: 'Forest Whispers', artist: 'Green Canopy', album: 'Nature Calls' },
      { title: 'Urban Pulse', artist: 'City Beats', album: 'Downtown' },
      { title: 'Starlight Symphony', artist: 'Cosmic Orchestra', album: 'Galaxy' },
      { title: 'Coffee Shop Jazz', artist: 'Smooth Trio', album: 'Latte Sessions' },
    ],
  },
  photos: {
    title: 'Photos', photos: 'Photos', library: 'Library', favorites: 'Favorites',
    recents: 'Recents', albums: 'ALBUMS',
    albumsList: [
      { name: 'Recents', count: 124, emoji: '🕐' },
      { name: 'Favorites', count: 28, emoji: '❤️' },
      { name: 'Nature', count: 45, emoji: '🌿' },
      { name: 'Travel', count: 67, emoji: '✈️' },
      { name: 'Family', count: 89, emoji: '👨‍👩‍👧‍👦' },
      { name: 'Food', count: 33, emoji: '🍜' },
    ],
    back: '← Back', previous: '← Previous', next: 'Next →', share: '📤 Share',
    photoCount: 'Photos',
  },
  appstore: {
    title: 'App Store', searchPlaceholder: 'Games, Apps, and More',
    discover: 'Discover', create: 'Create', work: 'Work', play: 'Play', develop: 'Develop',
    categories: 'Categories', updates: 'Updates', appOfDay: 'App of the Day',
    tagline: 'The premium operating system experience', learnMore: 'Learn More',
    topFreeApps: 'Top Free Apps', searchResults: 'Search Results', editorsChoice: "Editors' Choice",
    apps: [
      { name: 'Xcode', category: 'Developer Tools', description: 'The essential tool for building apps.' },
      { name: 'Final Cut Pro', category: 'Video Editing', description: 'Professional video editing on Mac.' },
      { name: 'Logic Pro', category: 'Music Creation', description: 'Professional music production studio.' },
      { name: 'Sketch', category: 'Design', description: 'Design, prototype, and collaborate.' },
      { name: 'Notion', category: 'Productivity', description: 'All-in-one workspace.' },
      { name: 'Figma', category: 'Design', description: 'Collaborative interface design tool.' },
      { name: 'VS Code', category: 'Developer Tools', description: 'Code editor redefined and optimized.' },
      { name: 'Slack', category: 'Productivity', description: 'A new way to communicate with your team.' },
    ],
  },
  facetime: {
    title: 'FaceTime', recent: 'RECENT', videoYesterday: '📹 Video · Yesterday',
    selectContact: 'Select a contact to start a call', newFaceTime: '📹 New FaceTime',
    calling: 'Calling...', mute: 'Mute', camera: 'Camera', speaker: 'Speaker', end: 'End',
    contacts: [{ name: 'Mom' }, { name: 'Gurpreet' }, { name: 'Simran' }, { name: 'Team' }],
  },
  trash: {
    title: 'Trash', emptyTrash: 'Empty Trash', empty: 'Trash is Empty',
    items: [
      { name: 'old_project.zip', size: '245 MB', date: 'Yesterday' },
      { name: 'screenshot_2024.png', size: '3.4 MB', date: '2 days ago' },
      { name: 'draft.docx', size: '124 KB', date: 'Last week' },
      { name: 'temp_files', size: '1.2 GB', date: 'Last month' },
      { name: 'old_backup.zip', size: '890 MB', date: '2 months ago' },
    ],
  },
  safari: {
    favorites: 'Favorites', explore: 'Explore', popular: 'Popular websites',
    searchOrEnter: 'Search or enter website name', loading: 'Loading',
    welcomeTo: 'Welcome to',
    bookmarks: [
      { name: 'Akal OS', icon: '🪟', desc: 'The premium OS experience' },
      { name: 'GitHub', icon: '🐙', desc: 'Where the world builds software' },
      { name: 'YouTube', icon: '▶️', desc: 'Watch, stream, discover' },
      { name: 'Wikipedia', icon: '📚', desc: 'The free encyclopedia' },
      { name: 'Reddit', icon: '🤖', desc: 'The front page of the internet' },
      { name: 'Twitter', icon: '🐦', desc: "What's happening" },
      { name: 'Instagram', icon: '📷', desc: 'Share your moments' },
      { name: 'Netflix', icon: '🎬', desc: 'Watch movies & TV shows' },
    ],
  },
};

const pa: Translation = {
  appName: {
    finder: 'ਫਾਈਂਡਰ', safari: 'ਸਫਾਰੀ', mail: 'ਮੇਲ', messages: 'ਸੁਨੇਹੇ',
    facetime: 'ਫੇਸਟਾਈਮ', maps: 'ਨਕਸ਼ੇ', photos: 'ਫੋਟੋ', music: 'ਸੰਗੀਤ',
    calendar: 'ਕੈਲੰਡਰ', notes: 'ਨੋਟਸ', reminders: 'ਯਾਦ ਦਿਵਾਉਣੇ', calculator: 'ਕੈਲਕੁਲੇਟਰ',
    terminal: 'ਟਰਮੀਨਲ', settings: 'ਸੈਟਿੰਗਾਂ', appstore: 'ਐਪ ਸਟੋਰ',
    trash: 'ਰੱਦੀ', weather: 'ਮੌਸਮ', launchpad: 'ਲਾਂਚਪੈਡ',
  },
  menu: {
    apple: '', aboutApp: 'ਬਾਰੇ', aboutOS: 'ਅਕਾਲ OS ਬਾਰੇ', systemSettings: 'ਸਿਸਟਮ ਸੈਟਿੰਗਾਂ...',
    appStore: 'ਐਪ ਸਟੋਰ...', forceQuit: 'ਜ਼ਬਰਦਸਤੀ ਬੰਦ ਕਰੋ...', sleep: 'ਸੁਸਤ', restart: 'ਮੁੜ ਚਾਲੂ...',
    shutDown: 'ਬੰਦ ਕਰੋ...', lockScreen: 'ਲਾਕ ਸਕਰੀਨ', logOut: 'ਲਾਗ ਆਊਟ...',
    file: 'ਫਾਈਲ', edit: 'ਸੋਧ', view: 'ਦੇਖੋ', go: 'ਜਾਓ', window: 'ਵਿੰਡੋ', help: 'ਮਦਦ',
    new: 'ਨਵਾਂ', open: 'ਖੋਲ੍ਹੋ...', close: 'ਬੰਦ ਕਰੋ', save: 'ਸੰਭਾਲੋ', newWindow: 'ਨਵੀਂ ਵਿੰਡੋ',
    newFolder: 'ਨਵਾਂ ਫੋਲਡਰ', getInfo: 'ਜਾਣਕਾਰੀ ਲਓ', undo: 'ਵਾਪਸ', redo: 'ਮੁੜ ਕਰੋ',
    cut: 'ਕੱਟੋ', copy: 'ਕਾਪੀ', paste: 'ਪੇਸਟ', selectAll: 'ਸਭ ਚੁਣੋ',
    darkMode: 'ਡਾਰਕ ਮੋਡ', lightMode: 'ਲਾਈਟ ਮੋਡ', enterFullScreen: 'ਪੂਰੀ ਸਕਰੀਨ',
    minimize: 'ਘੱਟੋ-ਘੱਟ', zoom: 'ਜ਼ੂਮ', bringAllToFront: 'ਸਭ ਅੱਗੇ ਲਿਆਓ',
    osHelp: 'ਅਕਾਲ OS ਮਦਦ', sendFeedback: 'ਫੀਡਬੈਕ ਭੇਜੋ',
    back: 'ਪਿੱਛੇ', forward: 'ਅੱਗੇ', home: 'ਘਰ', desktop: 'ਡੈਸਕਟਾਪ',
    downloads: 'ਡਾਊਨਲੋਡਸ', applications: 'ਐਪਲੀਕੇਸ਼ਨਾਂ', recentItems: 'ਹਾਲੀਆ ਆਈਟਮਾਂ',
  },
  common: {
    search: 'ਖੋਜ', cancel: 'ਰੱਦ ਕਰੋ', close: 'ਬੰਦ ਕਰੋ', today: 'ਅੱਜ', yesterday: 'ਕੱਲ੍ਹ',
    tomorrow: 'ਕਲ', welcome: 'ਅਕਾਲ OS ਵਿੱਚ ਜੀ ਆਇਆਂ ਨੂੰ', welcomeSub: 'ਡੌਕ ਵਿੱਚ ਐਪ ਉੱਤੇ ਕਲਿੱਕ ਕਰੋ ਜਾਂ ਸਪਾਟਲਾਈਟ ਲਈ ⌘+Space ਦਬਾਓ',
    loading: 'ਲੋਡ ਹੋ ਰਿਹਾ ਹੈ', clear: 'ਸਾਫ਼', clearAll: 'ਸਭ ਸਾਫ਼ ਕਰੋ', on: 'ਚਾਲੂ', off: 'ਬੰਦ',
    open: 'ਖੋਲ੍ਹੋ', get: 'ਲਓ', install: 'ਇੰਸਟਾਲ', installing: '...', add: 'ਸ਼ਾਮਲ', delete: 'ਮਿਟਾਓ',
    send: 'ਭੇਜੋ', reply: 'ਜਵਾਬ', forward: 'ਅੱਗੇ ਭੇਜੋ', new: 'ਨਵਾਂ', name: 'ਨਾਮ',
    date: 'ਮਿਤੀ', time: 'ਸਮਾਂ', location: 'ਟਿਕਾਣਾ', noResults: 'ਕੋਈ ਨਤੀਜਾ ਨਹੀਂ', seeAll: 'ਸਭ ਵੇਖੋ',
  },
  control: {
    wifi: 'ਵਾਈ-ਫਾਈ', wifiNetwork: 'ਅਕਾਲ ਨੈੱਟਵਰਕ', bluetooth: 'ਬਲੂਟੁੱਥ', airdrop: 'ਏਅਰਡ੍ਰਾਪ',
    contactsOnly: 'ਸਿਰਫ਼ ਸੰਪਰਕ', doNotDisturb: 'ਪਰੇਸ਼ਾਨ ਨਾ ਕਰੋ', focus: 'ਫੋਕਸ',
    display: 'ਡਿਸਪਲੇ', sound: 'ਆਵਾਜ਼', darkMode: 'ਡਾਰਕ ਮੋਡ', nightShift: 'ਨਾਈਟ ਸ਼ਿਫਟ',
    airplay: 'ਏਅਰਪਲੇ', battery: 'ਬੈਟਰੀ', keyboard: 'ਕੀਬੋਰਡ', stageManager: 'ਸਟੇਜ ਮੈਨੇਜਰ',
    language: 'ਭਾਸ਼ਾ', english: 'English', punjabi: 'ਪੰਜਾਬੀ',
  },
  lock: {
    enterPassword: 'ਪਾਸਵਰਡ ਦਾਖਲ ਕਰੋ', unlock: 'ਅਨਲਾਕ ਕਰੋ', clickToUnlock: 'ਅਨਲਾਕ ਕਰਨ ਲਈ ਕਲਿੱਕ ਕਰੋ',
    pressEnter: 'ਅਨਲਾਕ ਕਰਨ ਲਈ Enter ਦਬਾਓ (ਡੈਮੋ ਮੋਡ)', user: 'ਅਕਾਲ ਯੂਜ਼ਰ',
  },
  boot: { version: 'ਵਰਜ਼ਨ 1.0' },
  notif: {
    title: 'ਅਕਾਲ OS', welcomeMsg: 'ਅਕਾਲ OS 1.0 ਵਿੱਚ ਜੀ ਆਇਆਂ ਨੂੰ! ਡੌਕ ਅਤੇ ਲਾਂਚਪੈਡ ਖੋਜੋ।',
    calendarMsg: 'ਟੀਮ ਮੀਟਿੰਗ 15 ਮਿੰਟਾਂ ਵਿੱਚ', notifications: 'ਨੋਟੀਫਿਕੇਸ਼ਨ',
    silenced: 'ਨੋਟੀਫਿਕੇਸ਼ਨ (ਮੌਨ)', noNotifications: 'ਕੋਈ ਨੋਟੀਫਿਕੇਸ਼ਨ ਨਹੀਂ',
    connected: 'ਜੁੜਿਆ ਹੋਇਆ', offline: 'ਆਫ਼ਲਾਈਨ',
  },
  spotlight: {
    placeholder: 'ਸਪਾਟਲਾਈਟ ਖੋਜ', application: 'ਐਪਲੀਕੇਸ਼ਨ', command: 'ਕਮਾਂਡ', noResults: 'ਇਸ ਲਈ ਕੋਈ ਨਤੀਜਾ ਨਹੀਂ',
  },
  weather: {
    cities: [
      { name: 'ਅੰਮ੍ਰਿਤਸਰ', temp: 26, condition: 'ਧੁੱਪ', icon: '☀️', high: 28, low: 19, humidity: 55, wind: 8 },
      { name: 'ਲੁਧਿਆਣਾ', temp: 27, condition: 'ਅੰਸ਼ਕ ਬੱਦਲ', icon: '⛅', high: 29, low: 20, humidity: 60, wind: 10 },
      { name: 'ਚੰਡੀਗੜ੍ਹ', temp: 25, condition: 'ਸਾਫ਼', icon: '☀️', high: 27, low: 18, humidity: 50, wind: 7 },
      { name: 'ਜਲੰਧਰ', temp: 26, condition: 'ਬੱਦਲ', icon: '☁️', high: 28, low: 19, humidity: 65, wind: 12 },
      { name: 'ਪਟਿਆਲਾ', temp: 27, condition: 'ਧੁੱਪ', icon: '☀️', high: 29, low: 20, humidity: 58, wind: 9 },
      { name: 'ਬਠਿੰਡਾ', temp: 28, condition: 'ਗਰਮ', icon: '🌡️', high: 32, low: 22, humidity: 40, wind: 11 },
    ],
    hourlyForecast: 'ਘੰਟਾਵਾਰ ਪੂਰਵ-ਅਨੁਮਾਨ', dailyForecast: '7-ਦਿਨ ਪੂਰਵ-ਅਨੁਮਾਨ',
    humidity: 'ਨਮੀ', wind: 'ਹਵਾ', otherCities: 'ਹੋਰ ਸ਼ਹਿਰ', now: 'ਹੁਣ',
  },
  terminal: {
    welcome: 'ਅਕਾਲ OS ਟਰਮੀਨਲ ਵਿੱਚ ਜੀ ਆਇਆਂ ਨੂੰ। ਉਪਲਬਧ ਕਮਾਂਡਾਂ ਲਈ "help" ਟਾਈਪ ਕਰੋ।',
    lastLogin: 'ਆਖਰੀ ਲਾਗਇਨ: ', help: 'ਮਦਦ', available: 'ਉਪਲਬਧ ਕਮਾਂਡਾਂ:',
    prompt: 'akal@os ~ %', user: 'akal', host: 'akal-os',
    commands: {
      help: 'ਇਹ ਮਦਦ ਸੁਨੇਹਾ ਦਿਖਾਓ', ls: 'ਡਾਇਰੈਕਟਰੀ ਸਮੱਗਰੀ ਦੀ ਸੂਚੀ ਬਣਾਓ', pwd: 'ਮੌਜੂਦਾ ਡਾਇਰੈਕਟਰੀ ਪ੍ਰਿੰਟ ਕਰੋ',
      whoami: 'ਮੌਜੂਦਾ ਯੂਜ਼ਰ ਪ੍ਰਿੰਟ ਕਰੋ', date: 'ਮੌਜੂਦਾ ਮਿਤੀ ਅਤੇ ਸਮਾਂ ਦਿਖਾਓ', echo: 'ਟੈਕਸਟ ਪ੍ਰਿੰਟ ਕਰੋ',
      clear: 'ਟਰਮੀਨਲ ਸਾਫ਼ ਕਰੋ', open: 'ਐਪਲੀਕੇਸ਼ਨ ਖੋਲ੍ਹੋ', neofetch: 'ਸਿਸਟਮ ਜਾਣਕਾਰੀ ਦਿਖਾਓ',
      about: 'ਅਕਾਲ OS ਬਾਰੇ',
    },
    notFound: 'zsh: ਕਮਾਂਡ ਨਹੀਂ ਮਿਲੀ:', sudoers: 'akal sudoers ਸੂਚੀ ਵਿੱਚ ਨਹੀਂ ਹੈ। ਇਹ ਘਟਨਾ ਦੀ ਰਿਪੋਰਟ ਕੀਤੀ ਜਾਵੇਗੀ। 😏',
  },
  finder: {
    favorites: 'ਮਨਪਸੰਦ', icloud: 'iCloud', locations: 'ਟਿਕਾਣੇ', tags: 'ਟੈਗ',
    name: 'ਨਾਮ', modified: 'ਸੋਧਿਆ', size: 'ਆਕਾਰ', kind: 'ਕਿਸਮ',
    folder: 'ਫੋਲਡਰ', document: 'ਦਸਤਾਵੇਜ਼', items: 'ਆਈਟਮਾਂ', available: '48.2 GB ਉਪਲਬਧ',
    macintoshHD: 'Macintosh HD',
  },
  maps: {
    searchMaps: 'ਨਕਸ਼ੇ ਖੋਜੋ', currentLocation: 'ਮੌਜੂਦਾ ਟਿਕਾਣਾ',
    state: 'ਪੰਜਾਬ', coords: '31.6340° N, 74.8723° E',
  },
  settings: {
    general: 'ਜਨਰਲ', appearance: 'ਦਿੱਖ', wallpaper: 'ਵਾਲਪੇਪਰ', network: 'ਨੈੱਟਵਰਕ',
    sound: 'ਆਵਾਜ਼', display: 'ਡਿਸਪਲੇ', battery: 'ਬੈਟਰੀ', about: 'ਬਾਰੇ',
    appleAccount: 'Apple ਖਾਤਾ', aboutTitle: 'ਬਾਰੇ', name: 'ਅਕਾਲ ਦਾ ਮੈਕ', osVersion: 'ਅਕਾਲ OS 1.0',
    chip: 'WebKit ਵਰਚੁਅਲ', memory: '∞ GB', startupDisk: 'Macintosh HD', serialNumber: 'AKAL000001',
    softwareUpdate: 'ਸਾਫਟਵੇਅਰ ਅੱਪਡੇਟ', upToDate: 'ਅੱਪ-ਟੂ-ਡੇਟ ✓', automaticUpdates: 'ਆਟੋਮੈਟਿਕ ਅੱਪਡੇਟ',
    accentColor: 'ਐਕਸੈਂਟ ਰੰਗ', trueTone: 'ਟਰੂ ਟੋਨ', brightness: 'ਚਮਕ',
    resolution: 'ਰੈਜ਼ੋਲਿਊਸ਼ਨ', default: 'ਡਿਫ਼ਾਲਟ', refreshRate: 'ਰਿਫ੍ਰੈਸ਼ ਰੇਟ',
    networkName: 'ਅਕਾਲ ਨੈੱਟਵਰਕ', devices: 'AirPods Pro · Magic Mouse', outputDevice: 'ਆਊਟਪੁੱਟ ਡਿਵਾਈਸ',
    builtInSpeakers: 'ਇਨ-ਬਿਲਟ ਸਪੀਕਰ', focus: 'ਫੋਕਸ', focusMode: 'ਫੋਕਸ ਮੋਡ',
    lowPowerMode: 'ਲੋ ਪਾਵਰ ਮੋਡ', optimizedCharging: 'ਅਨੁਕੂਲਿਤ ਚਾਰਜਿੰਗ',
    chargeLevel: 'ਚਾਰਜ ਪੱਧਰ', condition: 'ਹਾਲਤ', normal: 'ਸਧਾਰਨ ✓', cycleCount: 'ਚੱਕਰ ਗਿਣਤੀ',
    language: 'ਭਾਸ਼ਾ', languageDesc: 'ਤਰਜੀਹੀ ਭਾਸ਼ਾ', version: 'ਵਰਜ਼ਨ 1.0',
    aboutText: 'ਇੱਕ ਪ੍ਰੀਮੀਅਮ ਬਰਾਊਜ਼ਰ-ਅਧਾਰਿਤ ਓਪਰੇਟਿੰਗ ਸਿਸਟਮ ਅਨੁਭਵ। Next.js, React, TypeScript, Tailwind CSS, ਅਤੇ Framer Motion ਨਾਲ ਬਣਾਇਆ ਗਿਆ।',
    rights: '© 2024 ਅਕਾਲ OS',
  },
  notes: {
    title: 'ਨੋਟਸ', newNote: 'ਨਵਾਂ ਨੋਟ', noNoteSelected: 'ਕੋਈ ਨੋਟ ਨਹੀਂ ਚੁਣਿਆ',
    createNote: 'ਨੋਟ ਬਣਾਓ', pin: 'ਪਿੰਨ', delete: 'ਮਿਟਾਓ',
    titlePlaceholder: 'ਸਿਰਲੇਖ', contentPlaceholder: 'ਲਿਖਣਾ ਸ਼ੁਰੂ ਕਰੋ...', search: 'ਖੋਜ',
  },
  calendar: {
    title: 'ਕੈਲੰਡਰ', newEvent: 'ਨਵਾਂ ਈਵੈਂਟ', eventName: 'ਈਵੈਂਟ ਦਾ ਨਾਮ', addTo: 'ਇਸ ਵਿੱਚ ਸ਼ਾਮਲ',
    myCalendars: 'ਮੇਰੇ ਕੈਲੰਡਰ', today: 'ਅੱਜ',
    sun: 'ਐਤ', mon: 'ਸੋਮ', tue: 'ਮੰਗਲ', wed: 'ਬੁੱਧ', thu: 'ਵੀਰ', fri: 'ਸ਼ੁੱਕਰ', sat: 'ਸ਼ਨਿੱਚਰ',
  },
  messages: {
    title: 'ਸੁਨੇਹੇ', search: 'ਖੋਜ', activeNow: 'ਹੁਣ ਸਰਗਰਮ', offline: 'ਆਫਲਾਈਨ',
    iMessage: 'iMessage', today: 'ਅੱਜ',
    contacts: [
      { name: 'ਹਰਪ੍ਰੀਤ ਸਿੰਘ', lastMsg: 'ਸਤ ਸ੍ਰੀ ਅਕਾਲ! ਤੁਸੀਂ ਕਿਵੇਂ ਹੋ?', time: '10:30 AM' },
      { name: 'ਮਾਂ', lastMsg: 'ਘਰ ਆ ਕੇ ਫ਼ੋਨ ਕਰੀਂ', time: '9:15 AM' },
      { name: 'ਟੀਮ ਅਕਾਲ', lastMsg: 'ਦੁਪਹਿਰ 3 ਵਜੇ ਮੀਟਿੰਗ ਤਸਦੀਕ ✅', time: 'ਕੱਲ੍ਹ' },
      { name: 'ਗੁਰਪ੍ਰੀਤ', lastMsg: 'ਨਵਾਂ ਅੱਪਡੇਟ ਵੇਖਿਆ?', time: 'ਕੱਲ੍ਹ' },
      { name: 'ਸਿਮਰਨ ਕੌਰ', lastMsg: 'ਮਦਦ ਲਈ ਧੰਨਵਾਦ!', time: 'ਸੋਮ' },
      { name: 'ਟੈਕ ਸਪੋਰਟ', lastMsg: 'ਤੁਹਾਡਾ ਟਿਕਟ ਹੱਲ ਹੋ ਗਿਆ', time: 'ਐਤ' },
    ],
    replies: ['ਬਹੁਤ ਵਧੀਆ ਲੱਗਦਾ! 😊', 'ਦਿਲਚਸਪ!', 'ਹੋਰ ਦੱਸੋ!', '👍', 'ਸਮਝ ਗਿਆ!', 'ਸ਼ਾਨਦਾਰ!', 'ਚੰਗਾ ਲੱਗਦਾ', 'ਸਤ ਸ੍ਰੀ ਅਕਾਲ! 🙏'],
  },
  mail: {
    title: 'ਮੇਲ', inbox: 'ਇਨਬਾਕਸ', drafts: 'ਡਰਾਫਟ', sent: 'ਭੇਜੇ', trash: 'ਰੱਦੀ',
    junk: 'ਜੰਕ', archive: 'ਆਰਕਾਈਵ', reply: 'ਜਵਾਬ', forward: 'ਅੱਗੇ ਭੇਜੋ', delete: 'ਮਿਟਾਓ',
    replyPlaceholder: 'ਜਵਾਬ...',
    emails: [
      { from: 'ਅਕਾਲ OS ਟੀਮ', subject: 'ਅਕਾਲ OS ਵਿੱਚ ਜੀ ਆਇਆਂ ਨੂੰ!', preview: 'ਅਕਾਲ OS 1.0 ਵਰਤਣ ਲਈ ਧੰਨਵਾਦ...', time: '10:30 AM' },
      { from: 'ਐਪ ਸਟੋਰ', subject: 'ਤੁਹਾਡੀ ਐਪ ਤਿਆਰ ਹੈ', preview: 'ਤੁਹਾਡੀ ਬੇਨਤੀ ਮਨਜ਼ੂਰ ਕਰ ਦਿੱਤੀ ਗਈ...', time: '9:15 AM' },
      { from: 'GitHub', subject: 'ਨਵਾਂ ਪੁੱਲ ਰਿਕੁਏਸਟ', preview: 'ਕਿਸੇ ਨੇ ਪੁੱਲ ਰਿਕੁਏਸਟ ਖੋਲ੍ਹਿਆ...', time: 'ਕੱਲ੍ਹ' },
      { from: 'Google', subject: 'ਸੁਰੱਖਿਆ ਚੇਤਾਵਨੀ', preview: 'ਨਵਾਂ ਸਾਈਨ-ਇਨ ਮਿਲਿਆ...', time: 'ਕੱਲ੍ਹ' },
      { from: 'LinkedIn', subject: 'ਤੁਹਾਡੇ 5 ਨਵੇਂ ਕਨੈਕਸ਼ਨ ਹਨ', preview: 'ਲੋਕ ਜੋ ਤੁਸੀਂ ਜਾਣਦੇ ਹੋ: ਗੁਰਪ੍ਰੀਤ ਸਿੰਘ...', time: 'ਸੋਮ' },
      { from: 'Netflix', subject: 'ਨਵੇਂ ਸ਼ੋਅ ਜੋੜੇ', preview: 'ਨਵੀਆਂ ਸ਼ਾਮਿਲ ਕੀਤੀਆਂ ਵੇਖੋ...', time: 'ਸੋਮ' },
      { from: 'Spotify', subject: 'ਤੁਹਾਡਾ ਹਫ਼ਤਾਵਾਰ ਮਿਕਸ ਤਿਆਰ ਹੈ', preview: 'ਇਸ ਹਫ਼ਤੇ ਦੀ ਪਲੇਲਿਸਟ ਖੋਜੋ...', time: 'ਐਤ' },
    ],
  },
  reminders: {
    title: 'ਯਾਦ ਦਿਵਾਉਣੇ', all: 'ਸਭ', today: 'ਅੱਜ', scheduled: 'ਤਹਿ ਕੀਤੇ',
    personal: 'ਨਿੱਜੀ', work: 'ਕੰਮ', addReminder: 'ਯਾਦ ਦਿਵਾਉਣਾ ਸ਼ਾਮਲ...',
    priority: { high: 'ਉੱਚ', medium: 'ਮੱਧਮ', low: 'ਘੱਟ' },
    items: [
      { text: 'ਲਾਰੇਂਸ ਰੋਡ ਤੋਂ ਕਰਿਆਨਾ ਲਓ', list: 'ਨਿੱਜੀ', date: 'ਅੱਜ' },
      { text: 'ਦੰਦਾਂ ਦੇ ਡਾਕਟਰ ਨੂੰ ਫ਼ੋਨ ਕਰੋ', list: 'ਨਿੱਜੀ', date: 'ਕਲ' },
      { text: 'ਪ੍ਰੋਜੈਕਟ ਰਿਪੋਰਟ ਜਮ੍ਹਾਂ ਕਰੋ', list: 'ਕੰਮ', date: 'ਅੱਜ' },
      { text: 'ਬਿਜਲੀ ਬਿੱਲ ਭਰੋ', list: 'ਨਿੱਜੀ', date: 'ਕੱਲ੍ਹ' },
      { text: 'ਟੀਮ ਮੀਟਿੰਗ ਤਿਆਰੀ', list: 'ਕੰਮ', date: 'ਅੱਜ' },
      { text: 'ਕਿਤਾਬ ਦਾ ਅਧਿਆਇ ਪੜ੍ਹੋ', list: 'ਨਿੱਜੀ', date: 'ਕੱਲ੍ਹ' },
      { text: 'ਰਿਜ਼ਿਊਮੇ ਅੱਪਡੇਟ ਕਰੋ', list: 'ਕੰਮ', date: 'ਇਸ ਹਫ਼ਤੇ' },
    ],
  },
  music: {
    title: 'ਸੰਗੀਤ', library: 'ਲਾਇਬ੍ਰੇਰੀ', playlists: 'ਪਲੇਲਿਸਟਾਂ',
    recentlyAdded: 'ਹਾਲ ਵਿੱਚ ਸ਼ਾਮਲ', artists: 'ਕਲਾਕਾਰ', albums: 'ਐਲਬਮਾਂ', songs: 'ਗੀਤ',
    hourlyForecast: '',
    playlistNames: ["ਅੱਜ ਦੇ ਹਿੱਟ", 'ਚਿੱਲ ਵਾਈਬਸ', 'ਵਰਕਆਊਟ ਮਿਕਸ', 'ਫੋਕਸ ਫਲੋ', 'ਥ੍ਰੋਬੈਕਸ', 'ਅਕੋਸਟਿਕ'],
    songs_list: [
      { title: 'ਅੱਧੀ ਰਾਤ ਦੇ ਸਪਨੇ', artist: 'ਨੀਅਨ ਪਲਸ', album: 'ਇਲੈਕਟ੍ਰਿਕ ਨਾਈਟਸ' },
      { title: 'ਸਮੁੰਦਰੀ ਹਵਾ', artist: 'ਵੇਵ ਰਾਈਡਰਸ', album: 'ਤੱਟਵਰਤੀ' },
      { title: 'ਪਹਾੜੀ ਉਚਾਈ', artist: 'ਪੀਕ ਸਾਊਂਡ', album: 'ਉਚਾ ਚੁੱਕੋ' },
      { title: 'ਮਾਰੂਥਲ ਹਵਾ', artist: 'ਸੈਂਡ ਸਟੌਰਮ', album: 'ਮਰੀਚਿਕਾ' },
      { title: 'ਜੰਗਲ ਦੀਆਂ ਫੁਸਫੁਸਾਹਟਾਂ', artist: 'ਗ੍ਰੀਨ ਕੈਨੋਪੀ', album: 'ਕੁਦਰਤ ਬੁਲਾਉਂਦੀ' },
      { title: 'ਸ਼ਹਿਰੀ ਧੜਕਣ', artist: 'ਸਿਟੀ ਬੀਟਸ', album: 'ਡਾਊਨਟਾਊਨ' },
      { title: 'ਤਾਰਿਆਂ ਦੀ ਸਿੰਫਨੀ', artist: 'ਕਾਸਮਿਕ ਆਰਕੈਸਟ੍ਰਾ', album: 'ਗਲੈਕਸੀ' },
      { title: 'ਕੌਫੀ ਸ਼ਾਪ ਜੈਜ਼', artist: 'ਸਮੂਥ ਟ੍ਰਿਓ', album: 'ਲੱਟੇ ਸੈਸ਼ਨ' },
    ],
  },
  photos: {
    title: 'ਫੋਟੋ', photos: 'ਫੋਟੋ', library: 'ਲਾਇਬ੍ਰੇਰੀ', favorites: 'ਮਨਪਸੰਦ',
    recents: 'ਹਾਲੀਆ', albums: 'ਐਲਬਮਾਂ',
    albumsList: [
      { name: 'ਹਾਲੀਆ', count: 124, emoji: '🕐' },
      { name: 'ਮਨਪਸੰਦ', count: 28, emoji: '❤️' },
      { name: 'ਕੁਦਰਤ', count: 45, emoji: '🌿' },
      { name: 'ਯਾਤਰਾ', count: 67, emoji: '✈️' },
      { name: 'ਪਰਿਵਾਰ', count: 89, emoji: '👨‍👩‍👧‍👦' },
      { name: 'ਭੋਜਨ', count: 33, emoji: '🍜' },
    ],
    back: '← ਪਿੱਛੇ', previous: '← ਪਿਛਲਾ', next: 'ਅਗਲਾ →', share: '📤 ਸਾਂਝਾ ਕਰੋ',
    photoCount: 'ਫੋਟੋ',
  },
  appstore: {
    title: 'ਐਪ ਸਟੋਰ', searchPlaceholder: 'ਗੇਮਾਂ, ਐਪਸ, ਅਤੇ ਹੋਰ',
    discover: 'ਖੋਜੋ', create: 'ਬਣਾਓ', work: 'ਕੰਮ', play: 'ਖੇਡੋ', develop: 'ਵਿਕਸਤ',
    categories: 'ਸ਼੍ਰੇਣੀਆਂ', updates: 'ਅੱਪਡੇਟ', appOfDay: 'ਅੱਜ ਦੀ ਐਪ',
    tagline: 'ਪ੍ਰੀਮੀਅਮ ਓਪਰੇਟਿੰਗ ਸਿਸਟਮ ਅਨੁਭਵ', learnMore: 'ਹੋਰ ਜਾਣੋ',
    topFreeApps: 'ਚੋਟੀ ਦੀਆਂ ਮੁਫ਼ਤ ਐਪਾਂ', searchResults: 'ਖੋਜ ਨਤੀਜੇ', editorsChoice: 'ਸੰਪਾਦਕਾਂ ਦੀ ਪਸੰਦ',
    apps: [
      { name: 'Xcode', category: 'ਡਿਵੈਲਪਰ ਟੂਲ', description: 'ਐਪਸ ਬਣਾਉਣ ਲਈ ਜ਼ਰੂਰੀ ਟੂਲ।' },
      { name: 'Final Cut Pro', category: 'ਵੀਡੀਓ ਐਡੀਟਿੰਗ', description: 'ਮੈਕ ਉੱਤੇ ਪੇਸ਼ੇਵਰ ਵੀਡੀਓ ਐਡੀਟਿੰਗ।' },
      { name: 'Logic Pro', category: 'ਸੰਗੀਤ ਨਿਰਮਾਣ', description: 'ਪੇਸ਼ੇਵਰ ਸੰਗੀਤ ਪ੍ਰੋਡਕਸ਼ਨ ਸਟੂਡੀਓ।' },
      { name: 'Sketch', category: 'ਡਿਜ਼ਾਈਨ', description: 'ਡਿਜ਼ਾਈਨ, ਪ੍ਰੋਟੋਟਾਈਪ, ਅਤੇ ਸਹਿਯੋਗ।' },
      { name: 'Notion', category: 'ਉਤਪਾਦਕਤਾ', description: 'ਆਲ-ਇਨ-ਵਨ ਵਰਕਸਪੇਸ।' },
      { name: 'Figma', category: 'ਡਿਜ਼ਾਈਨ', description: 'ਸਹਿਯੋਗੀ ਇੰਟਰਫੇਸ ਡਿਜ਼ਾਈਨ ਟੂਲ।' },
      { name: 'VS Code', category: 'ਡਿਵੈਲਪਰ ਟੂਲ', description: 'ਕੋਡ ਐਡੀਟਰ ਜੋ ਮੁੜ ਪਰਿਭਾਸ਼ਿਤ ਕੀਤਾ ਗਿਆ।' },
      { name: 'Slack', category: 'ਉਤਪਾਦਕਤਾ', description: 'ਆਪਣੀ ਟੀਮ ਨਾਲ ਸੰਚਾਰ ਦਾ ਨਵਾਂ ਤਰੀਕਾ।' },
    ],
  },
  facetime: {
    title: 'ਫੇਸਟਾਈਮ', recent: 'ਹਾਲੀਆ', videoYesterday: '📹 ਵੀਡੀਓ · ਕੱਲ੍ਹ',
    selectContact: 'ਕਾਲ ਸ਼ੁਰੂ ਕਰਨ ਲਈ ਸੰਪਰਕ ਚੁਣੋ', newFaceTime: '📹 ਨਵਾਂ ਫੇਸਟਾਈਮ',
    calling: 'ਕਾਲ ਹੋ ਰਹੀ ਹੈ...', mute: 'ਮਿਊਟ', camera: 'ਕੈਮਰਾ', speaker: 'ਸਪੀਕਰ', end: 'ਬੰਦ',
    contacts: [{ name: 'ਮਾਂ' }, { name: 'ਗੁਰਪ੍ਰੀਤ' }, { name: 'ਸਿਮਰਨ' }, { name: 'ਟੀਮ' }],
  },
  trash: {
    title: 'ਰੱਦੀ', emptyTrash: 'ਰੱਦੀ ਖਾਲੀ ਕਰੋ', empty: 'ਰੱਦੀ ਖਾਲੀ ਹੈ',
    items: [
      { name: 'old_project.zip', size: '245 MB', date: 'ਕੱਲ੍ਹ' },
      { name: 'screenshot_2024.png', size: '3.4 MB', date: '2 ਦਿਨ ਪਹਿਲਾਂ' },
      { name: 'draft.docx', size: '124 KB', date: 'ਪਿਛਲੇ ਹਫ਼ਤੇ' },
      { name: 'temp_files', size: '1.2 GB', date: 'ਪਿਛਲੇ ਮਹੀਨੇ' },
      { name: 'old_backup.zip', size: '890 MB', date: '2 ਮਹੀਨੇ ਪਹਿਲਾਂ' },
    ],
  },
  safari: {
    favorites: 'ਮਨਪਸੰਦ', explore: 'ਖੋਜੋ', popular: 'ਪ੍ਰਸਿੱਧ ਵੈੱਬਸਾਈਟਾਂ',
    searchOrEnter: 'ਖੋਜੋ ਜਾਂ ਵੈੱਬਸਾਈਟ ਦਾ ਨਾਮ ਦਾਖਲ ਕਰੋ', loading: 'ਲੋਡ ਹੋ ਰਿਹਾ ਹੈ',
    welcomeTo: 'ਜੀ ਆਇਆਂ ਨੂੰ',
    bookmarks: [
      { name: 'ਅਕਾਲ OS', icon: '🪟', desc: 'ਪ੍ਰੀਮੀਅਮ OS ਅਨੁਭਵ' },
      { name: 'GitHub', icon: '🐙', desc: 'ਦੁਨੀਆ ਜਿੱਥੇ ਸਾਫਟਵੇਅਰ ਬਣਦਾ ਹੈ' },
      { name: 'YouTube', icon: '▶️', desc: 'ਵੇਖੋ, ਸਟ੍ਰੀਮ ਕਰੋ, ਖੋਜੋ' },
      { name: 'Wikipedia', icon: '📚', desc: 'ਮੁਫ਼ਤ ਗਿਆਨਕੋਸ਼' },
      { name: 'Reddit', icon: '🤖', desc: 'ਇੰਟਰਨੈੱਟ ਦਾ ਮੁੱਖ ਪੰਨਾ' },
      { name: 'Twitter', icon: '🐦', desc: 'ਕੀ ਹੋ ਰਿਹਾ ਹੈ' },
      { name: 'Instagram', icon: '📷', desc: 'ਆਪਣੇ ਪਲ ਸਾਂਝੇ ਕਰੋ' },
      { name: 'Netflix', icon: '🎬', desc: 'ਫਿਲਮਾਂ ਅਤੇ TV ਸ਼ੋਅ ਵੇਖੋ' },
    ],
  },
};

export const translations: Record<Language, Translation> = { en, pa };

export function getTranslation(lang: Language): Translation {
  return translations[lang] || translations.en;
}
