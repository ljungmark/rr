import { Restful } from "./core/restful.js";
var restful = new Restful();
var incrementButton = document.querySelectorAll('.increment').forEach(function (element) {
    element.addEventListener('click', function () {
        restful.increment();
    });
});
document.querySelector('.add-more-time').addEventListener('click', function () {
    restful.increment();
});
var clearButton = document.querySelector('.clear').addEventListener('click', function () {
    restful.clear();
});
(function update() {
    restful.update();
    setTimeout(update, 60000 - (Date.now() % 60000) + 1);
})();
