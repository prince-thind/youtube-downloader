

const UI = {
    form: document.querySelector('#form'),
    dirPickerButton: document.querySelector('#dir-picker'),
    dirInputHidden: document.querySelector('#dir-input-hidden'),
    dirInput: document.querySelector('#dir-input'),
    progress: document.querySelector('#progress'),
    progressLabel: document.querySelector('#progress-label'),
    updateProgressBar
}

function updateProgressBar(value,text){
    UI.progress.value=value;
    UI.progressLabel.textContent=`${text}: ${value}%`
}

export default UI;