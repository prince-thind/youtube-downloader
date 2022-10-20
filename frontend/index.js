import UI from './lib/UI.js';

const socket=io();

UI.radioButtons.addEventListener('change', UI.toggleIndexInputs);
UI.showOSPickButton();


