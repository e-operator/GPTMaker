const { ipcMain, app, dialog, BrowserWindow, ipcRenderer } = require('electron');
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

//Store model name and size
var currentModelName, currentModelSize;
var currentSampleAmount, currentSampleRate, currentBatchSize, currentLearningRate, currentAccumulateGradients, currentOptimizer, currentTopK, currentTopP, currentSampleLength;

//ipcMain.on('', (event) => {});
ipcMain.on('create-model', (event, modelName, modelSize) => {
    //Check if model is already downloaded
    let downloaderOpts = {
        "cwd":"./"
    };

    var skipDL = false;

    if(!fs.existsSync("./usermodel/")){
        fs.mkdirSync("./usermodel/");
    }

    if(!fs.existsSync("./usermodel/" + modelName + "/")){
        fs.mkdirSync("./usermodel/" + modelName + "/");
        fs.writeFileSync("./usermodel/" + modelName + "/" + modelName + ".MDLDAT", modelName + "\n" + modelSize);
    }else{
        dialog.showErrorBox("Fatal Error","A model already exists with this name. GPTMaker will now exit");
        console.log("Error: model already exists");
        process.exit();
    }

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
            console.log(data.match(/\d+(?=%)/))
            encodingProgress = data.match(/\d+(?=%)/);
            downloaderWin.webContents.send('download-progress', encodingProgress);
        });

        modelDownloader.on('exit', () => {
            downloaderWin.close();
            currentModelName = modelName;
            currentModelSize = modelSize;
            event.sender.send('model-creation-success');
        });
    }else{
        currentModelName = modelName;
        currentModelSize = modelSize;
        event.sender.send('model-creation-success');
    }
});

ipcMain.on('request-current-model', (event) => {
    event.sender.send('reply-current-model', currentModelName, currentModelSize);
});

ipcMain.on('clear-current-model', (event) => {
    currentModelName = undefined;
    currentModelSize = undefined;
});

ipcMain.on('store-training-information', (event, tModelName, tModelSize, tSampleAmount, tSampleRate, tBatchSize, tLearningRate, tAccumulateGradients, tOptimizer, tTopK, tTopP, tSampleLength) => {
    currentModelName = tModelName;
    currentModelSize = tModelSize;
    currentSampleAmount = tSampleAmount;
    currentSampleRate = tSampleRate;
    currentBatchSize = tBatchSize;
    currentLearningRate = tLearningRate;
    currentAccumulateGradients = tAccumulateGradients;
    currentOptimizer = tOptimizer;
    currentTopK = tTopK;
    currentTopP = tTopP;
    currentSampleLength = tSampleLength;
    event.sender.send('training-information-store-success');
});

ipcMain.on('request-encoded-dataset', (event) => {
    dialog.showOpenDialog().then(result => {
        if(!fs.existsSync('./datasets/')){
            fs.mkdirSync('./datasets/');
        }
        fs.copyFileSync(result.filePaths[0], './datasets/tmp.npz');
        event.sender.send('reply-encoded-dataset');
    });
});

ipcMain.on('request-raw-dataset', (event) => {
    dialog.showOpenDialog().then(result => {
        let encoderOpts = {
            "cwd":"./"
        };
        if(!fs.existsSync('./datasets/')){
            fs.mkdirSync('./datasets/');
        }
        var textEncoderProcess = require('child_process').exec('text-encode.exe --model_name ' + currentModelSize + ' ' + result.filePaths[0] + ' ./datasets/tmp.npz');

        textEncoderProcess.stdout.pipe(process.stdout);
        textEncoderProcess.stderr.pipe(process.stdout);

        textEncoderProcess.on('exit', () => {
            event.sender.send('encoding-finished');
        });
    });
});

app.whenReady().then(startMain)