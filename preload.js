const { ipcRenderer } = require('electron');
const download = require('./lib/download');

window.addEventListener('DOMContentLoaded', () => {
    init()
})

let progressBar = null;
let percentageBar = null;

function init() {
    const form = document.getElementById('form');
    const directoryPicker = document.getElementById('dir-picker');
    const dirInput = document.getElementById('dir-input');
    progressBar = document.getElementById('progress');
    percentageBar = document.getElementById('percentage');

    form.addEventListener('submit', main)
    directoryPicker.addEventListener('click', updateDirectory)

    async function updateDirectory(e) {
        e.preventDefault();
        const path = await ipcRenderer.invoke('dialog:openDir')
        dirInput.value = path;
    }
}


function main(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const url = formData.get('url');
    const outputPath = formData.get('dir-input');

    download(outputPath, url,{progressBar,percentageBar})
}

