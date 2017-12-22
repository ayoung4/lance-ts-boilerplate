import { ClientEngine as CE } from 'lance-gg';
import { Renderer } from 'Client/renderer/Renderer';
import { Controller } from 'Client/engine/Controller';

export class ClientEngine extends CE {

    controller: Controller;

    constructor(gameEngine, options) {

        super(gameEngine, options, Renderer);

        this.controller = new Controller();
    
    }

    step() {

        if (this.controller.keyStates.up.isDown) {
            this.sendInput('up', { movement: true });
        }

        if (this.controller.keyStates.down.isDown) {
            this.sendInput('down', { movement: true });
        }

        if (this.controller.keyStates.left.isDown) {
            this.sendInput('left', { movement: true });
        }

        if (this.controller.keyStates.right.isDown) {
            this.sendInput('right', { movement: true });
        }

        if (this.controller.keyStates.space.isDown) {
            this.sendInput('space', { movement: true });
        }
    }

}