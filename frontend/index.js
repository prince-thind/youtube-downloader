const socket = io();

const dirPickerButton = document.querySelector('#dir-label');
const dirInput = document.querySelector('#dir-input');
dirPickerButton.addEventListener('click', pickDir);


socket.on('dir-picked', (dir) => {
    dirInput.value=dir;
})

function pickDir(e) {
    e.preventDefault();
    socket.emit('pick-dir');
}