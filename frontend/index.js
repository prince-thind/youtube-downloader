import IOHandlers from './lib/IO.js';
import UI from './lib/UI.js';

// eslint-disable-next-line no-undef
const socket = io();

UI.radioButtons.addEventListener('change', UI.toggleIndexInputs);

UI.pickButton.addEventListener('click', UI.pickClickHandler)
UI.form.addEventListener('submit', UI.formSubmitHandler)
UI.stopButton.addEventListener('click', UI.stopClickHandler)

UI.showOSPickButton();
UI.toggleIndexInputs();

socket.on('error', IOHandlers.errorHandler);
socket.on('clear-error', IOHandlers.clearErrorHandler);
socket.on('progress', IOHandlers.progressHandler);
socket.on('path-picked', IOHandlers.pathPickHandler);
socket.on('disconnect', IOHandlers.disconnectHandler);
socket.on('connect', IOHandlers.clearErrorHandler);

export { socket }
