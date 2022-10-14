import MockStream from "./mock.js";
import UI from "./UI.js";

const fs = require("fs");
const path = require("path");
const ytdl = require("ytdl-core");
// const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;
const ffmpeg = require('fluent-ffmpeg');

// ffmpeg.setFfmpegPath(ffmpegPath);


export default async function download(props = {}) {
    // { url, quality = 480, path, index = 1, name = "video.mp4" } = {}
    await downloadAudio(props);
    await downloadVideo(props);
    await merge(props);
    // await removeTempFiles();
}




async function downloadContent(props) {
    return new Promise((resolve, reject) => {

        const ytldConfig = { filter: props.type };
        if (props.quality) {
            ytldConfig.quality = props.quality;
        }

        const stream = ytdl(props.url, ytldConfig);
        stream.pipe(fs.createWriteStream(path.join(props.path, props.name)));


        stream.on("progress", (_, current, total) => {
            const percentage = current / total * 100;
            UI.updateProgressBar(percentage, props.updateMessage)
        });

        stream.on("finish", () => {
            resolve();
            UI.updateProgressBar(100, 'Done')

        });
        stream.on("error", (e) => {
            reject(e);
        });
    });
}




async function downloadAudio(props) {
    await downloadContent({
        type: 'audioonly',
        path: props.path,
        url: props.url,
        path: props.path,
        name: 'temp.wav',
        updateMessage: 'Audio'
    })
}

async function downloadVideo(props) {
    await downloadContent({
        type: 'videoonly',
        path: props.path,
        url: props.url,
        path: props.path,
        name: 'temp.mp4',
        updateMessage: 'Video',
        quality: getItag(props.quality)
    })
}

function getItag(quality) {

    //todo implement this
    return 'highestvideo';
    switch (quality) {
        case "144":
            return 160;
        case "240":
            return 133;
        case "360":
            return 134;
        case "480":
            return 135;
        case "720":
            return 136;
        case "1080":
            return 137;
        default:
            return 137;
    }
}

async function removeTempFiles(props) {
    if (fs.existsSync(path.join(props.path, './temp.wav')))
        fs.unlinkSync(path.join(props.path, './temp.wav'));

    if (fs.existsSync(path.join(props.path, './temp.mp4')))
        fs.unlinkSync(path.join(props.path, './temp.mp4'));
}

async function merge(props) {

    return new Promise((resolve, reject) => {
        ffmpeg()
            .addInput(path.join(props.path, './temp.wav'))
            .addInput(path.join(props.path, './temp.mp4'))
            .save(path.join(props.path, `video${props.index}.mp4`))
            .on('progress', (progress) => {
                UI.updateProgressBar(progress.percent, 'Merging');
            })
            .on('end', () => {
                resolve();
                UI.updateProgressBar(100, 'Ready');
            })
            .on('error', function (err) {
                reject(err);
            })
    })
}

