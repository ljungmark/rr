import ScrambleText from '../vendor/ScrambleText.js';

enum State {
    Vacant = 'vacant',
    Occupied = 'occupied',
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

        if (this.state === State.Occupied) {
            document.querySelector('.human-format').textContent = `Available in ${time.fromNow(true)}`;
        }

        if (this.state === State.Occupied && moment(this.expire).diff(moment(), 'minutes') < 0) {
            this.setState(State.Vacant);
            document.querySelector('.human-format').textContent = '';
        }
    }

    public increment(): void {
        const previousState = this.state;

        if (previousState !== State.Occupied) {
            this.setState(State.Occupied);
        }

        if (moment().isAfter(this.expire)) {
            this.expire = moment().format('YYYY-MM-DD HH:mm:ss');
        }

        this.expire = moment(this.expire).add(30, 'minutes').format('YYYY-MM-DD HH:mm:ss');

        if (document.body.dataset.threshold = 'false' && moment(this.expire).diff(moment(), 'minutes') >= 90) {
            document.body.dataset.threshold = 'true';
        } else if (document.body.dataset.threshold = 'true' && moment(this.expire).diff(moment(), 'minutes') < 90) {
            document.body.dataset.threshold = 'false';
        }

        this.update();
    }

    public clear(): void {
        this.setState(State.Vacant);
        this.expire = moment().format('YYYY-MM-DD HH:mm:ss');

        document.body.dataset.threshold = 'false';

        this.update();
    }
}

export { Restful };
