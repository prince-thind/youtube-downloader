import state from "./state.js";

import fs from "fs";
import path from "path";
import ytdl from 'ytdl-core';
import ffmpegInstaller from '@ffmpeg-installer/ffmpeg';
import ffmpeg from 'fluent-ffmpeg';
import { io } from "../index.js";

ffmpeg.setFfmpegPath(ffmpegInstaller.path);

export default async function download(props) {
    state.downloading = true;

    try {
        await downloadAudio(props);
        await downloadVideo(props);
        await merge(props);
        await removeTempFiles(props);
    }
    catch (e) {
        if (e.message == 'stream-stopped') {
            cleanUp()
        }
        else {
            throw e;
        }
        return false;
    }

    state.downloading = false;
    return true;
}

function cleanUp() {
    io.emit('progress', { percentage: 0, message: `Cancelled`, showPercentage: false })
    state.stream = null;
    state.downloading = false;
}

async function downloadAudio(props) {
    return downloadContent({
        type: 'audioonly',
        path: props.path,
        url: props.url,
        name: 'temp.wav',
        cookie: props.cookie,
        updateMessage: 'Audio',
        index: props.index
    })
}

async function downloadVideo(props) {
    return downloadContent({
        type: 'videoonly',
        url: props.url,
        path: props.path,
        name: 'temp.mp4',
        quality: getItag(props.quality),
        cookie: props.cookie,
        index: props.index,
        updateMessage: 'Video'
    })
}


async function merge(props) {

    return new Promise((resolve, reject) => {
        state.stream = ffmpeg()
            .addInput(path.join(props.path, './temp.wav'))
            .addInput(path.join(props.path, './temp.mp4'))
            .outputOptions('-c:v', 'copy', '-c:a', 'aac')
            .save(path.join(props.path, props.name))
            .on('progress', (progress) => {
                io.emit('progress', { percentage: progress.percent, message: `Merging(${props.index})`, showPercentage: true })

            })
            .on('end', () => {
                resolve();
                io.emit('progress', { percentage: 100, message: `Done(${props.index}`, showPercentage: true })
            })
            .on('error', function (err) {
                reject(err);
            })
            .on('stop', (e) => {
                state.stream?.kill?.("SIGTERM");
                setTimeout(() => {
                    reject(new Error('stream-stopped'))
                }, 100)
            })
    })
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
        io.emit('progress', { percentage, message: `${props.updateMessage}(${props.index})`, showPercentage: true })
    });

    return new Promise((resolve, reject) => {
        stream.on("finish", () => {
            io.emit('progress', { percentage: null, message: `Working(${props.index})`, showPercentage: false })
            state.downloading = false;
            state.stream = null;
            resolve();

        });
        stream.on("error", (e) => {
            reject(e);
        });

        stream.on('stop', (e) => {
            stream.destroy?.();
            reject(new Error('stream-stopped'));
        })

    });
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