import { errorHandler } from './lib/IO.js';
import UI from './lib/UI.js';

const socket=io();

UI.radioButtons.addEventListener('change', UI.toggleIndexInputs);
UI.showOSPickButton();

socket.on('error',errorHandler)
