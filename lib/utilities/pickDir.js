import { exec } from 'child_process'
import {io} from '../../index.js';

async function pickDir() {
    const dir = (await executeCommand('zenity --file-selection --directory')) //gnome-like only
    io.emit('dir-picked',dir)
}

function executeCommand(command) {
    return new Promise((resolve, reject) => {
        exec(command, function (err, stdout, stderr) {
            if (err) {
                resolve("/");
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

export default pickDir;