import { ClientEngine as CE } from 'lance-gg';
import { RenderEngine } from './RenderEngine';

export class ClientEngine extends CE {

    pressedKeys: { [key: string]: boolean };

    constructor(gameEngine, options) {
        super(gameEngine, options, RenderEngine);

        // this.serializer.registerClass(require('../common/PlayerAvatar'));
        this.gameEngine.on('client__preStep', this.preStep.bind(this));

        this.pressedKeys = {
            down: false,
            up: false,
            left: false,
            right: false,
            space: false
        };

        let that = this;
        
        
        document.onkeydown = (e) => { that.onKeyChange(e, true); };
        document.onkeyup = (e) => { that.onKeyChange(e, false); };
    }

    preStep() {

        if (this.pressedKeys.up) {
            this.sendInput('up', { movement: true });
        }

        if (this.pressedKeys.down) {
            this.sendInput('down', { movement: true });
        }

        if (this.pressedKeys.left) {
            this.sendInput('left', { movement: true });
        }

        if (this.pressedKeys.right) {
            this.sendInput('right', { movement: true });
        }

        if (this.pressedKeys.space) {
            this.sendInput('space', { movement: true });
        }
    }

    onKeyChange(e, isDown) {
        e = e || window.event;
        if (e.keyCode == '38') {
            this.pressedKeys.up = isDown;
        } else if (e.keyCode == '40') {
            this.pressedKeys.down = isDown;
        } else if (e.keyCode == '37') {
            this.pressedKeys.left = isDown;
        } else if (e.keyCode == '39') {
            this.pressedKeys.right = isDown;
        } else if (e.keyCode == '32') {
            this.pressedKeys.space = isDown;
        }
    }
}