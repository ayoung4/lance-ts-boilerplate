import { serialize, GameEngine as GE } from 'lance-gg';
import { Player } from 'Shared/engine/Player';
import * as _ from 'lodash';

export class GameEngine extends GE {

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

    addPlayer(playerId: number) {

        const position = new serialize.TwoVector(_.random(400), _.random(400));
        
        const player = new Player(++this.world.idCount, position);
        player.playerId = playerId;
        
        this.addObjectToWorld(player);
        console.log(`player added: ${player.toString()}`);
        
        return player;
    }

    processInput(inputData, playerId) {

        super.processInput(inputData, playerId);

        const player = this.world.getPlayerObject<Player>(playerId);

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