const { ipcRenderer } = require('electron');

const modelNameInput = document.getElementById('opt-model-name');
const modelSizeSelect = document.getElementById('opt-model-size');
const sampleAmountInput = document.getElementById('opt-sample-amount');
const sampleRateInput = document.getElementById('opt-sample-rate');

const batchSizeInput = document.getElementById('opt-batch-size');
const learningRateInput = document.getElementById('opt-learning-rate');
const accumulateGradientsInput = document.getElementById('opt-accumulate-gradients');
const memorySavingGradientsInput = document.getElementById('opt-memory-saving-gradients');
const optimizerInput = document.getElementById('opt-optimizer');
const topKInput = document.getElementById('opt-top-k');
const topPInput = document.getElementById('opt-top-p');
const sampleLengthInput = document.getElementById('opt-sample-length');

const advancedSettingsToggle = document.getElementById('advanced-settings-toggle');
const advancedSettingsContent = document.getElementById('advanced-settings-content');

const nextButton = document.getElementById('next-button');

advancedSettingsToggle.addEventListener('click', () => {
    if(advancedSettingsContent.style.display == "block"){
        advancedSettingsContent.style.display = "none";
    }else{
        advancedSettingsContent.style.display = "block";
    }
});

ipcRenderer.send('request-current-model');

ipcRenderer.on('reply-current-model', (event, modelName, modelSize) => {
    modelNameInput.value = modelName;
    modelSizeSelect.value = modelSize;
});

sampleAmountInput.value = 3;
sampleRateInput.value = 50;
batchSizeInput.value = 1;
learningRateInput.value = 0.00002;
accumulateGradientsInput.value = 1;
memorySavingGradientsInput.value = "False";
optimizerInput.value = "adam";
topKInput.value = "40";
topPInput.value = "0.0";
sampleLengthInput.value = 1023;

nextButton.addEventListener('click', () => {
    ipcRenderer.send('store-training-information', modelNameInput.value, modelSizeSelect.value, sampleAmountInput.value, sampleRateInput.value, batchSizeInput.value, learningRateInput.value, accumulateGradientsInput.value, optimizerInput.value, topKInput.value, topPInput.value, sampleLengthInput.value);
});

ipcRenderer.on('training-information-store-success', (event) => {
    window.location = "textEncoder.html";
});