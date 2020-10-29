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

//ipcMain.on('', (event) => {});

ipcMain.on('new-model', (event) => {
    //dialog.showErrorBox("!","You have clicked the \"Create New Model\" button.");
});

ipcMain.on('train-old-model', (event) => {
    //dialog.showErrorBox("!","You have clicked the \"Train Existing Model\" button.");
});

ipcMain.on('prompt-model', (event) => {
    //dialog.showErrorBox("!","You have clicked the \"Generate Samples from Existing Model\" button.");
});

app.whenReady().then(startMain)