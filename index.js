import "./reload.js";
import UI from './lib/UI.js';

UI.dirInputHidden.addEventListener('change', pickDir);
UI.form.addEventListener('submit', main);

function main(e){
    e.preventDefault()
    console.log(Object.fromEntries(new FormData(e.target)))
}

function pickDir(e) {
    const value = e.target.value;
    UI.dirInput.value = value;
}