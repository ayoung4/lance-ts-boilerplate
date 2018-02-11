import { ClientEngine } from 'lance-gg';
import { MyRenderer } from 'Client/MyRenderer';
import { Controller } from 'Client/Controller';

import { PlayerAvatar } from 'Common/PlayerAvatar';

export class MyClientEngine extends ClientEngine {

    private controller: Controller;

    constructor(gameEngine, options) {

        super(gameEngine, options, MyRenderer);
        
        this.serializer.registerClass(PlayerAvatar);
        
        this.gameEngine.on('client__preStep', this.preStep.bind(this));
        
        this.controller = new Controller();

    }

    preStep() {

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