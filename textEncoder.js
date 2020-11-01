const { ipcRenderer } = require('electron');

const skipEncodingButton = document.getElementById('skip-encoding-button');
const encodeDataButton = document.getElementById('encode-data-button');

const preloader = document.getElementById('preloader');
const preloaderStatus = document.getElementById('preloader-status')

skipEncodingButton.addEventListener('click', () => {
    skipEncodingButton.disabled = true;
    encodeDataButton.disabled = true;
    ipcRenderer.send('request-encoded-dataset');
});

encodeDataButton.addEventListener('click', () => {
    skipEncodingButton.disabled = true;
    encodeDataButton.disabled = true;
    preloader.style.display = "block";
    preloaderStatus.style.display = "block";
    ipcRenderer.send('request-raw-dataset');
});

ipcRenderer.on('reply-encoded-dataset', (event) => {
    window.location = "modelTrainerGUI.html";
});

ipcRenderer.on('encoding-finished', (event) => {
    window.location = "modelTrainerGUI.html";
});