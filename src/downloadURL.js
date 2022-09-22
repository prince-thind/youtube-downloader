const download = require("./lib/download");
const dialog = require('dialog-node');

dialog.entry('Enter Video Url', "Youtube Downloader", 0, handleInput);

function handleInput(exitCode, input, stderr) {
  if (exitCode != 0) return;
  if (!input) return console.error('no input was specified. Terminating!')

  download(input)
}