const { ipcMain, app, dialog, BrowserWindow } = require('electron');
const fs = require('fs');


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
ipcMain.on('create-model', (event, modelName, modelSize) => {
    //Check if model is already downloaded
    let downloaderOpts = {
        "cwd":"./"
    };

    var skipDL = false;

    switch(modelSize)
    {
        case "117M":{ 
            if(fs.existsSync("./models/117M")){
                console.log("Model found, skipping download...");
                skipDL = true;
                break;
            }else{
                var modelDownloader = require('child_process').exec("model-dl.exe 117M");
                break;
            }
        }
        case "355M":{
            if(fs.existsSync("./models/355M")){
                console.log("Model found, skipping download...");
                skipDL = true;
                break;
            }else{
                var modelDownloader = require('child_process').exec("model-dl.exe 355M");
                break;
            }
        }
        case "774M":{
            if(fs.existsSync("./models/774M")){
                console.log("Model found, skipping download...");
                skipDL = true;
                break;
            }else{
                var modelDownloader = require('child_process').exec("model-dl.exe 774M");
                break;
            }
        }
        case "1558M":{
            if(fs.existsSync("./models/1558M")){
                console.log("Model found, skipping download...");
                skipDL = true;
                break;
            }else{
                var modelDownloader = require('child_process').exec("model-dl.exe 1558M");
                break;
            }
        }
        default:{
            console.log("No model size given, defaulting to Small (117M)");
            if(fs.existsSync("./models/117M")){
                console.log("Model found, skipping download...");
                skipDL = true;
                break;
            }else{
                var modelDownloader = require('child_process').exec("model-dl.exe 117M");
                break;
            }
        }
    }

    if(skipDL == false){
    modelDownloader.stdout.pipe(process.stdout);
    modelDownloader.stderr.pipe(process.stdout);

    let downloaderWin = new BrowserWindow({
        width: 900,
        height: 300,
        webPreferences:{nodeIntegration:true}
    })

    downloaderWin.loadFile('downloaderProgress.html');

    modelDownloader.stderr.on('data', function(data) {
        downloaderWin.webContents.send('download-progress', data);
    });

    modelDownloader.on('exit', () => {
        downloaderWin.close();
    });

    }

});

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