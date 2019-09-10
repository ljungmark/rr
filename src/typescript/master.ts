import { Restful } from "./core/restful.js";

const restful = new Restful();


const incrementButton = document.querySelector('.increment');

(function update() {
    restful.update();
    setTimeout(update, 999 - (Date.now() % 999));
})();

incrementButton.addEventListener('click', function() {
    restful.increment();
});
