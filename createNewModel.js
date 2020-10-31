const { ipcRenderer, dialog } = require('electron');

const createButton = document.getElementById('create-button');
const modelNameInput = document.getElementById('opt-model-name');
const modelSizeRadio = document.getElementsByName('opt-model-size');

const messageArea = document.getElementById('message-area');

createButton.addEventListener('click', () => {
    console.log(modelNameInput.value);
    if(modelNameInput.value == undefined || modelNameInput.value == null || modelNameInput.value == ""){
        messageArea.innerHTML = "<p style='color:red'>Enter a model name</p>";
    }else{
        if(!/[^a-z0-9_.@()-]/i.test(modelNameInput.value)){
            var modelName = modelNameInput.value;
            var modelSize;

            for(var i = 0; i < modelSizeRadio.length; i ++)
            {
                if(modelSizeRadio[i].checked)
                {
                    modelSize = modelSizeRadio[i].value;
                    console.log("Continuing with size " + modelSize + " and name " + modelName);
                    createButton.disabled = true;
                    ipcRenderer.send("create-model", modelName, modelSize);
                }
            }
        }else{
            messageArea.innerHTML = "<p style='color:red'>Model name contains invalid characters</p>";
        }
        
    }
});

ipcRenderer.on('model-creation-success', () => {
    window.location = "trainModel.html";
});