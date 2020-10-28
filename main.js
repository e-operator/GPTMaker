const { ipcMain, app, dialog, BrowserWindow } = require('electron');

function startMain(){

    let mainWin = new BrowserWindow({
        width: 1000,
        height: 800,
        webPreferences: {
            nodeIntegration: true
        }
    })

    mainWin.loadFile('menu.html');
}

app.whenReady().then(startMain)