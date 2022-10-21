import IOHandlers from './lib/IO.js';
import UI from './lib/UI.js';

const socket = io();

UI.radioButtons.addEventListener('change', UI.toggleIndexInputs);

UI.pickButton.addEventListener('click', UI.pickClickHandler)
UI.form.addEventListener('submit', UI.formSubmitHandler)
UI.stopButton.addEventListener('click', UI.stopClickHandler)

UI.showOSPickButton();

socket.on('error', IOHandlers.errorHandler);
socket.on('clear-error', IOHandlers.clearErrorHandler);
socket.on('progress', IOHandlers.progressHandler);
socket.on('path-picked', IOHandlers.pathPickHandler);

export { socket }
