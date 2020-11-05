const { ipcRenderer } = require('electron');

const trainingTitle = document.getElementById('training-title');
const trainingOutput = document.getElementById('training-output');

ipcRenderer.send('request-current-model');

ipcRenderer.on('reply-current-model', (event, currentModelName, currentModelSize, currentSampleAmount, currentSampleRate, currentBatchSize, currentLearningRate, currentAccumulateGradients, currentOptimizer, currentTopK, currentTopP, currentSampleLength) => {
    trainingTitle.innerHTML = "Training \"" + currentModelName + "\"";
    trainingOutput.innerHTML += "\nModel information loaded:\nNAME: " + currentModelName + "\nSIZE: " + currentModelSize;
    trainingOutput.innerHTML += "\nTraining settings loaded:\nSAMPLE AMOUNT: " + currentSampleAmount + "\nSAMPLE RATE: "  + currentSampleRate + "\nBATCH SIZE: " + currentBatchSize + "\nLEARNING RATE: " + currentLearningRate + "\nACCUMULATE GRADIENTS: " + currentAccumulateGradients + "\nOPTIMIZER: " + currentOptimizer + "\nTOP K: " + currentTopK + "\nTOP P: " + currentTopP + "\nSAMPLE LENGTH: " + currentSampleLength;
    trainingOutput.innerHTML += "\nTraining GPT-2...\n\n";
    ipcRenderer.send('train-start');
});

ipcRenderer.on('training-progress', (event, progress) => {
    trainingOutput.innerHTML += progress;
});

