import state from "./state.js";

import fs from "fs";
import path from "path";
import ytdl from 'ytdl-core';
import ffmpegInstaller from '@ffmpeg-installer/ffmpeg';
import ffmpeg from 'fluent-ffmpeg';
import { io } from "../../index.js";

ffmpeg.setFfmpegPath(ffmpegInstaller.path);

export default async function download(props = {}) {
    state.downloading = true;

    await downloadAudio(props);
    await downloadVideo(props);
    await merge(props);
    await removeTempFiles(props);

    state.downloading = false;

}


async function downloadContent(props) {
    const ytdlConfig = { filter: props.type };

    if (props.quality) {
        ytdlConfig.quality = props.quality;
    }

    if (props.cookie) {
        ytdlConfig.requestOptions = {
            headers: {
                cookie: props.cookie
            },
        }
    }

    const stream = ytdl(props.url, ytdlConfig);
    stream.pipe(fs.createWriteStream(path.join(props.path, props.name)));

    state.stream = stream;

    stream.on("progress", (_, current, total) => {
        const percentage = current / total * 100;
        io.emit('progress', { progress: percentage, message: `${props.updateMessage}` })
    });

    return new Promise((resolve, reject) => {
        stream.on("finish", () => {
            io.emit('progress', { progress: 100, message: `Working` })
            state.downloading = false;
            state.stream = null;
            resolve();

        });
        stream.on("error", (e) => {
            state.downloading = false;
            state.stream = null;
            reject(e);
        });

        stream.on('close', (e) => {
            state.downloading = false;
            state.stream = null;
            reject('stream closed!')
        })

    });
}




async function downloadAudio(props) {
    return downloadContent({
        type: 'audioonly',
        path: props.path,
        url: props.url,
        path: props.path,
        name: 'temp.wav',
        updateMessage: 'Audio',
        cookie: props.cookie
    })
}

async function downloadVideo(props) {
    return downloadContent({
        type: 'videoonly',
        path: props.path,
        url: props.url,
        path: props.path,
        name: 'temp.mp4',
        updateMessage: 'Video',
        quality: getItag(props.quality),
        cookie: props.cookie
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
    if (fs.existsSync(path.join(props.path, 'temp.wav')))
        fs.unlinkSync(path.join(props.path, 'temp.wav'));

    if (fs.existsSync(path.join(props.path, 'temp.mp4')))
        fs.unlinkSync(path.join(props.path, 'temp.mp4'));
}

async function merge(props) {

    return new Promise((resolve, reject) => {
        ffmpeg()
            .addInput(path.join(props.path, './temp.wav'))
            .addInput(path.join(props.path, './temp.mp4'))
            .outputOptions('-c:v', 'copy', '-c:a', 'aac')
            .save(path.join(props.path, `video${props.index}.mp4`))
            .on('progress', (progress) => {
                io.emit('progress', { progress: progress.percent, message: `Merging` })

            })
            .on('end', () => {
                resolve();
                io.emit('progress', { progress: 100, message: `Done` })
            })
            .on('error', function (err) {
                reject(err);
            })
    })
}

