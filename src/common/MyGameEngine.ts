import { serialize, GameEngine } from 'lance-gg';
import { PlayerAvatar } from 'Common/PlayerAvatar';
import * as _ from 'lodash';

export class MyGameEngine extends GameEngine {

    constructor(options) {
        super(options);
    }

    start() {

        super.start();

        this.worldSettings = {
            width: 400,
            height: 400,
        };

    }

    processInput(inputData, playerId) {

        super.processInput(inputData, playerId);

        const player = this.world.getPlayerObject<PlayerAvatar>(playerId);

        if (player) {

            if (inputData.input === 'up') {
                player.position.y -= 1;
            } else if (inputData.input === 'down') {
                player.position.y += 1;
            } else if (inputData.input === 'right') {
                player.position.x += 1;
            } else if (inputData.input === 'left') {
                player.position.x -= 1;
            }
            
        }
    }
}