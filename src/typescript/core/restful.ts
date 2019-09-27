import ScrambleText from '../vendor/ScrambleText.js';

enum State {
    Vacant = 'vacant',
    Occupied = 'occupied',
}

enum ExpireRanges {
    Add = 'add',
    Reset = 'reset',
}

interface RestfulInterface {
}

class Restful implements RestfulInterface {
    private state: State;
    private expire: string;
    private accept: boolean;

    constructor() {
        this.setState();
        this.expire = moment();

        document.body.dataset.accept = 'true';

        return;
    }

    public setState(state?: State): void {
        if (state == null) { state = State.Vacant; }

        this.state = state;
        document.body.dataset.state = state;

        document.querySelector('.status').textContent = (this.state === State.Vacant) ? 'Vacant' : 'Occupied';
        const scrambleText = new ScrambleText(document.querySelector('.status')).play().start();
    }

    public update(): void {
        const diff = this.expire.diff(moment(), 'minutes');
        const shouldBeVacant = diff < 0;

        if (!shouldBeVacant && this.state === State.Occupied) {
            document.querySelector('.human-format').textContent = `Available ${moment().to(this.expire)}`;
        }
        if (shouldBeVacant && this.state === State.Occupied) {
            this.setState(State.Vacant);
            document.querySelector('.human-format').textContent = 'Available now';
        }

        if (this.accept = 'true' && this.expire.diff(moment(), 'minutes') >= 90) {
            this.accept = 'false';
            document.body.dataset.accept = this.accept;
        } else if (this.accept = 'false' && this.expire.diff(moment(), 'minutes') < 90) {
            this.accept = 'true';
            document.body.dataset.accept = this.accept;
        }

        document.querySelector('.time-visualization .bar').style.width = Math.ceil((diff / 120) * 100) + '%';

        this.render();
    }

    private render(): void {
        document.querySelector('.current-time').textContent = moment().format('HH:mm');
        document.querySelector('.current-date').textContent = moment().format('dddd, MMMM Do');
    }

    public increment(): void {
        const previousState = this.state;

        if (previousState !== State.Occupied) {
            this.setState(State.Occupied);
        }

        if (moment().isAfter(this.expire)) {
            this.expire = moment();
        }

        this.setExpire(ExpireRanges.Add);

        this.update();
    }

    public clear(): void {
        this.setExpire(ExpireRanges.Reset);
        this.update();
    }

    private setExpire(operation: ExpireRanges) {
        switch(operation) {
            case ExpireRanges.Add: {
                this.expire = moment(this.expire).add(30, 'minutes');
                break;
            }
            case ExpireRanges.Reset: {
                this.expire = moment().subtract(1, 'minute');
               break;
            }
         }
    }
}

export { Restful };
