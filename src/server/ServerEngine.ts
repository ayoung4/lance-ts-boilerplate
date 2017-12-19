import { ServerEngine as SE } from 'lance-gg';

export class ServerEngine extends SE {

    constructor(io, gameEngine, inputOptions) {
        super(io, gameEngine, inputOptions);
        // this.serializer.registerClass(require('../common/PlayerAvatar'));
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
