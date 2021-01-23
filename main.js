const { app, BrowserWindow, ipcMain, Notification  } = require('electron')

const path = require('path')
const isDev = !app.isPackaged 


function createWindow() {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        backgroundColor: 'white',
        webPreferences: {
            nodeIntegration: false,
            //Ensures that both your pre-load scripts and Electrons internal logic run in seperate context
            contextIsolation: true,
            //Sanitize JS code
            worldSafeExecuteJavaScript: true,
            preload: path.join(__dirname, 'preload.js')
        },
        
    })

    win.loadFile('index.html')
    isDev && win.webContents.openDevTools()
}

if (isDev) {
    require('electron-reload')(__dirname, {
        electron: path.join(__dirname, 'node_modules', '.bin', 'electron')
    })
}

app.whenReady().then(createWindow)

ipcMain.on('notify', (_, message) => {
    new Notification({ title: 'Notif', 'body': message   }).show()
})


app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

//For Mac
app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow()
    }
})
