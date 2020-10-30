const { ipcRenderer, dialog } = require('electron');

const createButton = document.getElementById('create-button');
const modelNameInput = document.getElementById('opt-model-name');

const messageArea = document.getElementById('message-area');

createButton.addEventListener('click', () => {
    console.log(modelNameInput.value);
    if(modelNameInput.value == undefined || modelNameInput.value == null || modelNameInput.value == ""){
        messageArea.innerHTML = "<p style='color:red'>Enter a model name</p>";
    }else{
        var modelName = modelNameInput.value;
        
    }
});