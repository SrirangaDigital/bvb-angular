const {
    app, BrowserWindow
} = require('electron')

require('electron-context-menu')({
    prepend: (params, browserWindow) => [{
        label: 'Rainbow',
        // Only show it when right-clicking images
        visible: params.mediaType === 'image'
    }]
});

let win;

function createWindow() {

    // Instantiate Express App
    app.server = require(__dirname + '/server')();

    // Create the browser window.
    win = new BrowserWindow({ show: false });

    win.loadURL(`file://${__dirname}/dist/index.html`)

    win.once('ready-to-show', () => {
      
        win.maximize();
        win.focus();
    })

    // Event when the window is closed.
    win.on('closed', function() {
        win = null
    })
}

// Create window on electron intialization
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function() {

    // On macOS specific close process
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', function() {
    // macOS specific close process
    if (win === null) {
        createWindow()
    }
})
