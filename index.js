import "./reload.js";
import UI from './lib/UI.js';
import processInput from "./lib/processInput.js";

UI.dirInputHidden.addEventListener('change', pickDir);
UI.form.addEventListener('submit', main);

async function main(e) {
    e.preventDefault()
    const res = (Object.fromEntries(new FormData(e.target)));

    try {
        await processInput(res);
    }
    catch (e) {
        console.error(e);
        UI.updateError(e)
    }

}

function pickDir(e) {
    const value = e.target.value;
    UI.dirInput.value = value;
}