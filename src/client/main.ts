import { GameEngine } from 'Shared/engine/GameEngine';
import { ClientEngine } from 'Client/engine/ClientEngine';

const options = {
    traceLevel: 1,
    delayInputCount: 3,
    clientIDSpace: 1000000,
    syncOptions: {
        sync: 'interpolate',
        localObjBending: 0.0,
        remoteObjBending: 0.8,
        bendingIncrements: 6
    }
};

const gameEngine = new GameEngine(options);
const clientEngine = new ClientEngine(gameEngine, options);

document.addEventListener('DOMContentLoaded', function (e) {
    clientEngine.start();
});