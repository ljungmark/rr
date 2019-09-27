import ScrambleText from '../vendor/ScrambleText.js';
var State;
(function (State) {
    State["Vacant"] = "vacant";
    State["Occupied"] = "occupied";
})(State || (State = {}));
var ExpireRanges;
(function (ExpireRanges) {
    ExpireRanges["Add"] = "add";
    ExpireRanges["Reset"] = "reset";
})(ExpireRanges || (ExpireRanges = {}));
var Restful = /** @class */ (function () {
    function Restful() {
        this.setState();
        this.expire = moment();
        document.body.dataset.accept = 'true';
        return;
    }
    Restful.prototype.setState = function (state) {
        if (state == null) {
            state = State.Vacant;
        }
        this.state = state;
        document.body.dataset.state = state;
        document.querySelector('.status').textContent = (this.state === State.Vacant) ? 'Vacant' : 'Occupied';
        var scrambleText = new ScrambleText(document.querySelector('.status')).play().start();
    };
    Restful.prototype.update = function () {
        var diff = this.expire.diff(moment(), 'minutes');
        var shouldBeVacant = diff < 0;
        if (!shouldBeVacant && this.state === State.Occupied) {
            document.querySelector('.human-format').textContent = "Available " + moment().to(this.expire);
        }
        if (shouldBeVacant && this.state === State.Occupied) {
            this.setState(State.Vacant);
            document.querySelector('.human-format').textContent = 'Available now';
        }
        if (this.accept = 'true' && this.expire.diff(moment(), 'minutes') >= 90) {
            this.accept = 'false';
            document.body.dataset.accept = this.accept;
        }
        else if (this.accept = 'false' && this.expire.diff(moment(), 'minutes') < 90) {
            this.accept = 'true';
            document.body.dataset.accept = this.accept;
        }
        document.querySelector('.time-visualization .bar').style.width = Math.ceil((diff / 120) * 100) + '%';
        this.render();
    };
    Restful.prototype.render = function () {
        document.querySelector('.current-time').textContent = moment().format('HH:mm');
        document.querySelector('.current-date').textContent = moment().format('dddd, MMMM Do');
    };
    Restful.prototype.increment = function () {
        var previousState = this.state;
        if (previousState !== State.Occupied) {
            this.setState(State.Occupied);
        }
        if (moment().isAfter(this.expire)) {
            this.expire = moment();
        }
        this.setExpire(ExpireRanges.Add);
        this.update();
    };
    Restful.prototype.clear = function () {
        this.setExpire(ExpireRanges.Reset);
        this.update();
    };
    Restful.prototype.setExpire = function (operation) {
        switch (operation) {
            case ExpireRanges.Add: {
                this.expire = moment(this.expire).add(30, 'minutes');
                break;
            }
            case ExpireRanges.Reset: {
                this.expire = moment().subtract(1, 'minute');
                break;
            }
        }
    };
    return Restful;
}());
export { Restful };
