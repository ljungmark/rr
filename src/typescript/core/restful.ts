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
}

export { Restful };
