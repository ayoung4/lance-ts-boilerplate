import { ServerEngine as SE } from 'lance-gg';

const SerializableClasses = [

];

export class ServerEngine extends SE {

    constructor(io, gameEngine, inputOptions) {
        super(io, gameEngine, inputOptions);

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
