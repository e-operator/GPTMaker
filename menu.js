const { ipcRenderer } = require('electron');

const newModelButton = document.getElementById('new-model-button');
const trainOldModelButton = document.getElementById('train-old-model-button');
const promptModelButton = document.getElementById('prompt-model-button');

newModelButton.addEventListener('click', () => {
    ipcRenderer.send('new-model');
    window.location = "./createNewModel.html"
})

trainOldModelButton.addEventListener('click', () => {
    ipcRenderer.send('train-old-model');
});

promptModelButton.addEventListener('click', () => {
    ipcRenderer.send('prompt-model');
});