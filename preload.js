const { ipcRenderer } = require('electron');

window.addEventListener('DOMContentLoaded', () => {
    init()
})

function init() {
    const form = document.getElementById('form');
    const directoryPicker = document.getElementById('dir-picker');
    const dirInput = document.getElementById('dir-input');

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
}