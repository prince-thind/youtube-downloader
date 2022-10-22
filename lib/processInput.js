import { io } from "../index.js";
import ytpl from 'ytpl';
import ytdl from 'ytdl-core';
import download from "./download.js";
import state from "./state.js";


export default async function processInput(input) {
  if (state.downloading) {
    io.emit('error', 'Video already being downloaded')
    return;
  }

  io.emit('clear-error');
  io.emit('progress', { message: 'Starting', showPercentage: false, percentage: null })


  if (input.type == 'playlist')
    return downloadPlaylist(input)


  //download single video
  state.downloading = true;
  const title = sanitizeName(await getTitleVideo(input.url));

  try {
    await download({ url: input.url, path: input.path, name: title, cookie: input.cookie, index: 0 });
  }
  catch (e) {
    if (e.message == 'stream-stopped') {
      io.emit('progress', { message: 'Cancelled', showPercentage: false, percentage: 0 });
      return;
    }
    console.error(e);
  }
}

async function downloadPlaylist(input) {
  //playlist
  let playlist = await getPlaylistArray(input.url).catch(() => {
    throw new Error('Unable to fetch Playlist info: Check URL?')
  })

  const startingIndex = input['index-start'] - 1;
  const endIndex = input['index-end'] || undefined;

  playlist = playlist.slice(startingIndex, endIndex);

  for (const [i, videoInformation] of playlist.entries()) {
    const { url, title } = videoInformation;
    try {
      await download({ url, path: input.path, name: `${i + 1}_${sanitizeName(title)}`, cookie: input.cookie, index: i + 1 + startingIndex })
    }
    catch (e) {
      if (e.message == 'stream-stopped') {
        io.emit('progress', { message: 'Cancelled', showPercentage: false, percentage: 0 });
        break;
      }
      console.error(e);
    }
  }
  io.emit('progress', { message: 'Finished', showPercentage: false, percentage: 0 });

}

function sanitizeName(str) {
  return str.replace(/ /g, "-").replace(/[^a-zA-Z0-9-]/g, '');
}

async function getPlaylistArray(url) {
  const res = await ytpl(url, { pages: Infinity });
  return res.items.map((item) => ({ url: item.shortUrl, title: item.title }));
}

async function getTitleVideo(videoUrl) {
  return (await ytdl.getInfo(videoUrl)).videoDetails.title
} 