import { ServerEngine as SE } from 'lance-gg';
import { GameEngine } from 'Shared/engine/GameEngine';
import { Player } from 'Shared/engine/Player';

export class ServerEngine extends SE {

    gameEngine: GameEngine;

    constructor(io, gameEngine, inputOptions) {
        super(io, gameEngine, inputOptions);
        this.serializer.registerClass(Player);
    }

    start() {
        super.start();
    }
    
    onPlayerConnected(socket) {
        super.onPlayerConnected(socket);
        this.gameEngine.addPlayer(socket.playerId);
    }

    onPlayerDisconnected(socketId, playerId) {
        super.onPlayerDisconnected(socketId, playerId);
        delete this.gameEngine.world.objects[playerId];
    }

}
