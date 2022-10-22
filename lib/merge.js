import ffmpeg from 'fluent-ffmpeg';
import ffmpegInstaller from '@ffmpeg-installer/ffmpeg';
import path from "path";

import state from "./state.js";
import { io } from "../index.js";

ffmpeg.setFfmpegPath(ffmpegInstaller.path);

export default async function merge(props) {

    return new Promise((resolve, reject) => {
        state.stream = ffmpeg()
            .addInput(path.join(props.path, './temp.wav'))
            .addInput(path.join(props.path, './temp.mp4'))
            .outputOptions('-c:v', 'copy', '-c:a', 'aac')
            .on('progress', (progress) => {
                io.emit('progress', { percentage: progress.percent, message: `Merging(${props.index})`, showPercentage: true })

            })
            .save(path.join(props.path, props.name + ".mp4"))
            .on('end', () => {
                resolve();
                io.emit('progress', { percentage: 100, message: `Done(${props.index})`, showPercentage: true })
            })
            .on('error', function (err) {
                reject(err);
            })
            .on('stop', () => {
                state.stream?.kill?.("SIGTERM");
                state.stream = null;
                setTimeout(() => {
                    reject(new Error('stream-stopped'))
                }, 100)
            })
    })
}
