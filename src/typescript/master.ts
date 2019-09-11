import { Restful } from "./core/restful.js";

const restful = new Restful();


const incrementButton = document.querySelectorAll('.increment').forEach(element => {
    element.addEventListener('click', function() {
        restful.increment();
    });
});
const clearButton = document.querySelector('.clear').addEventListener('click', function() {
    restful.clear();
});

(function update() {
    restful.update();
    setTimeout(update, 999 - (Date.now() % 999));
})();
