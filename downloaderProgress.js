const {ipcRenderer} = require('electron');

const downloadProgressContainer = document.getElementById('download-progress-container');

ipcRenderer.on('download-progress', (event, progress) => {
    console.log(progress);
    downloadProgressContainer.innerHTML = "<p style='color: white;'>" + progress + "</p>";
});