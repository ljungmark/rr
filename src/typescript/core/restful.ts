enum State {
    Vacant = 'vacant',
    Occupied = 'occupied',
}

interface RestfulInterface {
}

class Restful implements RestfulInterface {
    private state: State;

    constructor() {
        this.setState();

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
            document.querySelector('.increment').textContent = 'I\'m done, make room available for others';

            const scrambleText = new ScrambleText(document.querySelector('.status')).play().start();
        }
    }
}

export { Restful };
