const { app, BrowserWindow, ipcMain, dialog } = require('electron')
const path = require('path')

const createWindow = () => {
    const mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'), nodeIntegration: true, contextIsolation: false
        }
    })

    mainWindow.loadFile('index.html')
    // mainWindow.webContents.openDevTools()
}

app.whenReady().then(() => {
    createWindow()

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })

    ipcMain.handle('dialog:openDir', handleDirOpen)

})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
})


async function handleDirOpen() {
    const { canceled, filePaths } = await dialog.showOpenDialog({ properties: ['openDirectory'] })
    if (canceled) {
        return null;
    } else {
        return filePaths[0]
    }
}


try {
    require('electron-reloader')(module)
} catch (_) { }
