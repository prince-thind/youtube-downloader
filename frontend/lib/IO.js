import UI from "./UI.js"

function errorHandler(message) {
    console.error(message);
    UI.displayError(message)
}

export { errorHandler }