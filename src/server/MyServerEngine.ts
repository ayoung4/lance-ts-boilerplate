import { ServerEngine } from 'lance-gg';
import { MyGameEngine } from 'Common/MyGameEngine';
import { PlayerAvatar } from 'Common/PlayerAvatar';

export class MyServerEngine extends ServerEngine {

    gameEngine: MyGameEngine;

    constructor(io, gameEngine, inputOptions) {
        super(io, gameEngine, inputOptions);
        this.serializer.registerClass(PlayerAvatar);
    }

    start() {
        super.start();
    }
    
    onPlayerConnected(socket) {
        super.onPlayerConnected(socket);
    }

    onPlayerDisconnected(socketId, playerId) {
        super.onPlayerDisconnected(socketId, playerId);

        delete this.gameEngine.world.objects[playerId];
    }

}
