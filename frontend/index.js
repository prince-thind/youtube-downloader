const socket = io();

const dirPickerButton = document.querySelector('#dir-label');
const dirInput = document.querySelector('#dir-input');
const form = document.querySelector('#form');
const progressBar = document.querySelector('#progress');
const progressLabel = document.querySelector('#progress-label');
const stopButton = document.querySelector('#stop-button');
const errorDiv = document.querySelector('#error');

dirPickerButton.addEventListener('click', pickDir);
stopButton.addEventListener('click', stop);
form.addEventListener('submit', submitForm);


socket.on('dir-picked', (dir) => {
    dirInput.value = dir;
})

socket.on('progress', ({ progress, message }) => {
    const percentage = progress.toFixed(2)
    progressBar.value = percentage;
    progressLabel.textContent = `${message}: ${percentage}%`
})

socket.on('error',(err)=>{
    errorDiv.textContent = err;
})

function pickDir(e) {
    e.preventDefault();
    socket.emit('pick-dir');
}

function submitForm(e) {
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

function stop(e){
    e.preventDefault();
    socket.emit('stop')
}