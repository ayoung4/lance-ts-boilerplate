import * as express from 'express';
import * as socketIO from 'socket.io';
import * as path from 'path';

import { GameEngine } from 'Shared/engine/GameEngine';
import { ServerEngine } from 'Server/engine/ServerEngine';

export class Server {

    private server;
    private onError: (err, port) => void;

    constructor(onError: (err, port) => void) {
        this.server = express();
        this.server.use('/', express.static(path.join(__dirname, '/public')));
        this.server.get('/', (req, res) => {
            const index = path.join(__dirname, 'public/index.html');
            res.sendFile(index, { root: __dirname });
        });
        this.onError = onError;
    }

    listen(port: number) {
        this.server.on('error', (err) => this.onError(err, port));
        const requestHandler = this.server.listen(port, () => console.log(`Listening on ${port}`));
        const io = socketIO(requestHandler);
        const gameEngine = new GameEngine({ traceLevel: 1 });
        const serverEngine = new ServerEngine(io, gameEngine, { debug: {}, updateRate: 6 });
        serverEngine.start();
    }

}
