import { io } from "../index.js";
import download from "./download.js";
import state from "./state.js";


export default async function processInput(input) {
  if (state.downloading) return;

  if (input.type == 'video') {
    return await download({ url: input.url, path: input.path, name: 'video.mp4', cookie: input.cookie });
  }

  //playlist
  return;
  const playlist = await getPlaylistArray(input.url)

  for (const [i, videoInformation] of playlist.entries()) {
    const { url } = videoInformation;
    await download({ url, path: input.dir, index: i, cookie: input.cookie })
  }

}

async function getPlaylistArray(url) {
  const res = await ytpl(url, { pages: Infinity });
  return res.items.map((item) => ({ url: item.shortUrl, title: item.title }));
}