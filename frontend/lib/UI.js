const UI = {
    form: document.querySelector('#form'),
    radioButtons: document.querySelector('#radio-buttons'),
    indexInputs: document.querySelector('#index-inputs'),
    pickButton: document.querySelector('#pick-button'),
    downloadButton: document.querySelector('#download-button'),
    stopButton: document.querySelector('#stop-button'),
    progressContainer: document.querySelector('#progress-container'),
    toggleIndexInputs,
}

function toggleIndexInputs(e) {
    const type = e.target.value;
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

export default UI;