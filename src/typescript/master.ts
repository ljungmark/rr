import { Restful } from "./core/restful.js";

const restful = new Restful();


const incrementButton = document.querySelectorAll('.increment').forEach(element => {
    element.addEventListener('click', function() {
        restful.increment();
    });
});
document.querySelector('.add-more-time').addEventListener('click', function() {
    restful.increment();
});
const clearButton = document.querySelector('.clear').addEventListener('click', function() {
    restful.clear();
});

(function update() {
    document.querySelector('.current-time').textContent = moment().format('HH:mm');
    document.querySelector('.current-date').textContent = moment().format('dddd, MMMM Do');
    restful.update();
    setTimeout(update, 60000 - (Date.now() % 60000) + 1);
})();
