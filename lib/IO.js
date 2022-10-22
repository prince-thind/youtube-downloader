import { exec } from 'child_process'
import { io, server } from '../index.js';
import state from './state.js';
import getDefaultDir from './helpers/defaultDir.js';

export default function IOConnectionHandler(socket) {
    state.instances++;
    socket.emit('path-picked', getDefaultDir())
    socket.on('pick-path', pickDirHandler);
    socket.on('stop', stopStreamHandler);
    socket.on('disconnect', disconnectHandler)
}

function disconnectHandler() {
    state.instances--;
    setTimeout(() => {
        if (state.instances <= 0) {
            server.close(() => {
                console.log('server closed gracefully')
            })
        }
    }, 2000)
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


