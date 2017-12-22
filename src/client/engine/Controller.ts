import * as _ from 'lodash';

type controls = 'space' | 'left' | 'up' | 'right' | 'down' | 'a' | 'w' | 's' | 'd';

interface IKeyCodeTable<T> {
    [key: number]: T;
}

const keyCodeTable: IKeyCodeTable<controls> = {
    32: 'space',
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down',
    65: 'a',
    87: 'w',
    68: 'd',
    83: 's'
};

interface IKeyBindingOptions {
    repeat: boolean;
}

interface IKeyBinding {
    actionName: string;
    options: IKeyBindingOptions;
}

interface IKeyState {
    count: number;
    isDown: boolean
}

export class Controller {

    keyStates: {
        [key in controls]: IKeyState;
    };
    private boundKeys: { [key: string]: IKeyBinding }
    private lastKeyPressed: string;

    constructor() {

        this.setupListeners();

        const keys = _.values(keyCodeTable);
        const keyStates = _.map(keys, (k) => ({ count: 0, isDown: false }));
        this.keyStates = _.zipObject(keys, keyStates) as {[key in controls]: IKeyState; };

        this.boundKeys = {};

    }

    setupListeners() {

        document.addEventListener('keydown', (e) => { this.onKeyChange(e, true); });
        document.addEventListener('keyup', (e) => { this.onKeyChange(e, false); });

    }

    onKeyChange(e, isDown) {
        e = e || window.event;

        let keyName = keyCodeTable[e.keyCode];
        if (keyName) {

            if (this.keyStates[keyName] === null) {
                this.keyStates[keyName] = {
                    count: 0,
                    isDown,
                }
            }

            this.keyStates[keyName].isDown = isDown;

            if (!isDown) {
                this.keyStates[keyName].count = 0;
            }

            this.lastKeyPressed = isDown ? e.keyCode : null;

            e.preventDefault();
        }
    }

}
