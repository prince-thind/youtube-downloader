const download = require("./lib/download");
const dialog = require('dialog-node');

dialog.entry('Enter Video Url', "Youtube Downloader", 0, handleInput);


async function handleInput(exitCode, input, stderr) {
  if (exitCode != 0) return;
  if (!input) return console.error('no input was specified. Terminating!')

  await download(input);
  console.log('You may now exit')
  process.stdin.resume();
}

