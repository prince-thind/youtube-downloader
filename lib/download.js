import fs from "fs";
import path from "path";

import state from "./state.js";
import { io } from "../index.js";
import merge from "./helpers/merge.js";
import downloadContent from "./helpers/downloadContent.js";



export default async function download(props) {
    state.downloading = true;

    try {
        await downloadAudio(props);
        await downloadVideo(props);
        await merge(props);
    }
    catch (e) {
        if (e.message == 'stream-stopped') {
            cleanUp()
        }
        throw e;
    }
    finally {
        await removeTempFiles(props);
    }

    state.downloading = false;
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


function getItag() {

    //todo implement this
    return 'highestvideo';

    // switch (quality) {
    //     case "144":
    //         return 160;
    //     case "240":
    //         return 133;
    //     case "360":
    //         return 134;
    //     case "480":
    //         return 135;
    //     case "720":
    //         return 136;
    //     case "1080":
    //         return 137;
    //     default:
    //         return 137;
    // }
}

async function removeTempFiles(props) {
    if (fs.existsSync(path.join(props.path, 'temp.wav')))
        fs.unlinkSync(path.join(props.path, 'temp.wav'));

    if (fs.existsSync(path.join(props.path, 'temp.mp4')))
        fs.unlinkSync(path.join(props.path, 'temp.mp4'));
}