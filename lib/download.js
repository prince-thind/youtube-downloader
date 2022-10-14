import MockStream from "./mock.js";
import UI from "./UI.js";

const DEBUG_FAIL_CHANCE = 0.1;

export default function download({ url = "", quality = 480, path = "/home/prince", index = 1, name = "video.mp4" } = {}) {
    const mock = new MockStream();

    return new Promise((resolve, reject) => {
        mock.on('data', (percentage) => {
            UI.updateProgressBar(percentage, 'Downloading');

            if (DEBUG_FAIL_CHANCE > Math.random()) {
                reject(new Error('custom err'))
            }
        })
        
        mock.on('error', (e) => {
            reject(e);
        })
        mock.on('end', () => {
            UI.updateProgressBar(100, 'Done')
            resolve();
        })
    })

}