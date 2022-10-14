import download from "./download.js";

export default function processInput(input){
    if(input.type=='video'){
        download(input.dir,input.url,'video.mp4');
    }
}