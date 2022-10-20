import UI from "./UI.js"

const IOHandlers = {
    errorHandler, progressHandler, pathPickHandler

}
function errorHandler(message) {
    console.error(message);
    UI.displayError(message)
}

function progressHandler({ message, percentage, displayPercentage }) {
    const progress = UI.progressContainer.querySelector('#progress');
    const progressText = UI.progressContainer.querySelector('.progress-text');
    const progressPercentage = UI.progressContainer.querySelector('.progress-percentage');

    if (displayPercentage) {
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

export default IOHandlers;