import { exec } from 'child_process'
import { io } from '../index.js';
import state from './state.js';

export default function IOConnectionHandler(socket) {
    socket.on('pick-path', pickDirHandler);
    socket.on('stop', stopStreamHandler)
}

function stopStreamHandler() {
    state.stream?.emit('stop');
}

async function pickDirHandler() {
    const dir = (await executeCommand('zenity --file-selection --directory')) //gnome-like only
    if (dir) {
        io.emit('path-picked', dir)
    }
}

function executeCommand(command) {
    return new Promise((resolve, reject) => {
        exec(command, function (err, stdout, stderr) {
            if (err) {
                resolve(null);
                return;
            }
            if (stderr) {
                reject(stderr);
                return;
            }
            resolve(stdout)
        });
    })

}


