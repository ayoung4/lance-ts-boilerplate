import { GameEngine as GE } from 'lance-gg';

interface IPlayer {
    isMovingUp: boolean;
    isMovingDown: boolean;
    isRotatingLeft: boolean;
    isRotatingRight: boolean;
}

enum Directions {
    
}

export class GameEngine extends GE {

    constructor(options) {
        super(options);
    }

    start() {

        super.start();

        this.worldSettings = {
            width: 400,
            height: 400
        };
    }

    processInput(inputData, playerId) {

        super.processInput(inputData, playerId);

        // get the player's primary object
        const player = this.world.getPlayerObject<IPlayer>(playerId);

        if (player) {
            console.log(`player ${playerId} pressed ${inputData.input}`);
            if (inputData.input === 'up') {
                player.isMovingUp = true;
            } else if (inputData.input === 'down') {
                player.isMovingDown = true;
            } else if (inputData.input === 'right') {
                player.isRotatingRight = true;
            } else if (inputData.input === 'left') {
                player.isRotatingLeft = true;
            } else if (inputData.input === 'space') {
                // this.fire(player, inputData.messageIndex);
                // this.emit('fire');
            }
        }
    }
}