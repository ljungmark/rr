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
        this.expire = moment().format('YYYY-MM-DD HH:mm');

        document.querySelector('html').dataset.threshold = false;

        return;
    }

    public setState(state?: State): void {
        if (state == null) { state = State.Vacant; }

        this.state = state;
        document.querySelector('html').dataset.state = state;
    }

    public update(): void {
        console.log('update');
    }

    public increment(): void {
        const previousState = this.state;

        if (previousState !== State.Occupied) {
            this.setState(State.Occupied);
            document.querySelector('.status').textContent = 'Occupied';

            const scrambleText = new ScrambleText(document.querySelector('.status')).play().start();
        }

        this.expire = moment(this.expire).add(30, 'minutes').format('YYYY-MM-DD HH:mm');
        console.log(this.expire)
        console.log(moment(this.expire).diff(moment(), 'minutes'))

        if (moment(this.expire).diff(moment(), 'minutes') >= 89) {
            document.querySelector('html').dataset.threshold = true;
        }
    }

    public clear(): void {
        this.setState(State.Vacant);
        this.expire = moment().format('YYYY-MM-DD HH:mm');

        document.querySelector('.status').textContent = 'Vacant';
        document.querySelector('html').dataset.threshold = false;

        const scrambleText = new ScrambleText(document.querySelector('.status')).play().start();
    }
}

export { Restful };
