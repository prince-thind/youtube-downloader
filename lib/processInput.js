import download from "./download.js";
import state from "./state.js";

export default async function processInput(input) {
    if (state.downloading) return;

    if (input.type == 'video') {
        state.downloading = true;
        await download();
        state.downloading = false;
        return;
    }

    const fakePlaylist = [1, 2, 3, 4, 5];
    for (const [i, url] of fakePlaylist.entries()) {
    }

}