import MockStream from "./mock.js";
import UI from "./UI.js";

export default function download({ url = "", quality = 480, path = "/home/prince", index = 1, name = "video.mp4" } = {}) {
    const mock = new MockStream();

    return new Promise((resolve, reject) => {
        mock.on('data', (percentage) => {
            UI.updateProgressBar(percentage, 'Downloading')
        })
        mock.on('end', () => {
            UI.updateProgressBar(100, 'Done')
            resolve();
        })
    })

}