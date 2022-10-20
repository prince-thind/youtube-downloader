import UI from "./UI.js"

const IOHandlers = {
    errorHandler, progressHandler, pathPickHandler

}
function errorHandler(message) {
    console.error(message);
    UI.displayError(message)
}

function progressHandler({ message, percentage, showPercentage }) {

}

function pathPickHandler(path){

}

export default IOHandlers;