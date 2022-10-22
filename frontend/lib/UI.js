import { socket } from "../index.js";

const UI = {
    form: document.querySelector('#form'),
    radioButtons: document.querySelector('#radio-buttons'),
    indexInputs: document.querySelector('#index-inputs'),
    pickButton: document.querySelector('#pick-button'),
    downloadButton: document.querySelector('#download-button'),
    stopButton: document.querySelector('#stop-button'),
    progressContainer: document.querySelector('#progress-container'),
    pathField: document.querySelector('#path'),
    error: document.querySelector('#error'),
    toggleIndexInputs,
    showOSPickButton,
    displayError,
    formSubmitHandler,
    stopClickHandler,
    pickClickHandler
}

function toggleIndexInputs() {
    const type = UI.form.elements.type.value;
    const inputFields = [...UI.indexInputs.querySelectorAll('input')];

    for (const field of inputFields) {
        if (type == 'video') {
            field.setAttribute('disabled', '')
            UI.indexInputs.classList.add('disabled')
        }
        else {
            field.removeAttribute('disabled');
            UI.indexInputs.classList.remove('disabled')

        }
    }
}

function showOSPickButton() {
    const isLinux = navigator.userAgent.toLowerCase().includes('linux');
    if (!isLinux) {
        UI.pickButton.style.display = 'none'
    }
}

function displayError(message) {
    UI.error.classList.remove('hidden')
    UI.error.textContent = message;
}

function formSubmitHandler(e) {
    e.preventDefault();

    const formData = Object.fromEntries(new FormData(e.target));

    fetch("/", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
    })
}

function stopClickHandler(e) {
    e.preventDefault();
    socket.emit('stop');
}

function pickClickHandler(e) {
    e.preventDefault();
    socket.emit('pick-path');
}


export default UI;