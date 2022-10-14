

const UI = {
    form: document.querySelector('#form'),
    dirPickerButton: document.querySelector('#dir-picker'),
    dirInputHidden: document.querySelector('#dir-input-hidden'),
    dirInput: document.querySelector('#dir-input'),
    progress: document.querySelector('#progress'),
    progressLabel: document.querySelector('#progress-label'),
    error: document.querySelector('#error'),
    updateProgressBar,
    updateError
}

function updateProgressBar(value, text) {
    UI.progress.value = value;
    UI.progressLabel.textContent = `${text}: ${value}%`
}

function updateError(e) {
    UI.error.textContent += e.message;
}

export default UI;