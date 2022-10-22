import { io } from "../../index.js";
import state from "../state.js";

import fs from "fs";
import path from "path";
import ytdl from 'ytdl-core';

export default async function downloadContent(props) {
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
            state.stream = null;
            resolve();

        });
        stream.on("error", (e) => {
            reject(e);
        });

        stream.on('stop', () => {
            stream.destroy?.();
            reject(new Error('stream-stopped'));
        })

    });
}