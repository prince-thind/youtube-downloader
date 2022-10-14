

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
    const percentage = value.toFixed(2)
    UI.progress.value = percentage;
    UI.progressLabel.textContent = `${text}: ${percentage}%`
}

function updateError(e) {
    UI.error.textContent += e.message;
}

export default UI;