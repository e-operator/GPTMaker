const {ipcRenderer} = require('electron');

const downloadProgressContainer = document.getElementById('download-progress-container');
const downloadProgressBar = document.getElementById('download-progress-bar');

ipcRenderer.on('download-progress', (event, progress) => {
    console.log(progress);
    if(progress >= 0 && progress != null){
        downloadProgressContainer.innerHTML = "<p style='color: white;'>" + progress + "%</p>"
        downloadProgressBar.style.width = progress + "%";
    }
});