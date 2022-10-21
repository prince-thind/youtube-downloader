import { io } from "../index.js";
import ytpl from 'ytpl';
import download from "./download.js";
import state from "./state.js";


export default async function processInput(input) {
  io.emit('clear-error');
  if (state.downloading) return;

  if (input.type == 'video') {
    return await download({ url: input.url, path: input.path, name: 'video.mp4', cookie: input.cookie });
  }


  //playlist
  let playlist = await getPlaylistArray(input.url).catch(() => {
    throw new Error('Unable to fetch Playlist info: Check URL?')
  })

  const startingIndex = input['index-start'] - 1;
  const endIndex = input['index-end'] || undefined;

  playlist = playlist.slice(startingIndex, endIndex);

  for (const [i, videoInformation] of playlist.entries()) {
    const { url } = videoInformation;
    await download({ url, path: input.path, name: `video${i}.mp4`, cookie: input.cookie })
  }

}

async function getPlaylistArray(url) {
  const res = await ytpl(url, { pages: Infinity });
  return res.items.map((item) => ({ url: item.shortUrl, title: item.title }));
}