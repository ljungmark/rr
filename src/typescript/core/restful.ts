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

    constructor() {
        this.setState();
        this.expire = moment().format('YYYY-MM-DD HH:mm:ss');

        document.body.dataset.threshold = 'false';

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
        const time = moment(this.expire);
        const diff = moment(this.expire).diff(moment(), 'minutes');
        const shouldBeVacant = diff < 0;

        if (!shouldBeVacant && this.state === State.Occupied) {
            document.querySelector('.human-format').textContent = `Available ${moment().to(time)}`;
        }
        if (shouldBeVacant && this.state === State.Occupied) {
            this.setState(State.Vacant);
            document.querySelector('.human-format').textContent = 'Available now';
        }

        document.querySelector('.progress-bar__variant').style.width = Math.ceil((diff / 120) * 100) + '%';
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

        if (document.body.dataset.threshold = 'false' && moment(this.expire).diff(moment(), 'minutes') >= 90) {
            document.body.dataset.threshold = 'true';
        } else if (document.body.dataset.threshold = 'true' && moment(this.expire).diff(moment(), 'minutes') < 90) {
            document.body.dataset.threshold = 'false';
        }

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
