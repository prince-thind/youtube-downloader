import UI from "./UI.js"

const IOHandlers = {
    errorHandler, progressHandler, pathPickHandler, clearErrorHandler, disconnectHandler

}
function errorHandler(message) {
    console.error(message);
    UI.displayError(message)
}

function progressHandler({ message, percentage, showPercentage }) {
    const progress = UI.progressContainer.querySelector('#progress');
    const progressText = UI.progressContainer.querySelector('.progress-text');
    const progressPercentage = UI.progressContainer.querySelector('.progress-percentage');

    if (percentage != null) {
        percentage = percentage.toFixed(2);
    }

    if (showPercentage) {
        progressPercentage.textContent = `${percentage}%`
    }
    else {
        progressPercentage.textContent = ``
    }

    progressText.textContent = `${message}: `;
    progress.setAttribute('value', percentage)

}

function pathPickHandler(path) {
    UI.pathField.value = path;
}

function clearErrorHandler(){
    UI.displayError("");
}

function disconnectHandler(){
    UI.displayError("backend disconnected!");
}

export default IOHandlers;