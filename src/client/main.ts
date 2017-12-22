import { GameEngine } from 'Shared/engine/GameEngine';
import { ClientEngine } from 'Client/engine/ClientEngine';

document.addEventListener('DOMContentLoaded', function (e) {
    
    const options = {
        traceLevel: 1,
        delayInputCount: 3,
        clientIDSpace: 1000000,
        syncOptions: {
            sync: 'extrapolate',
            localObjBending: 0.0,
            remoteObjBending: 0.8,
            bendingIncrements: 6
        }
    };

    const gameEngine = new GameEngine(options);
    const clientEngine = new ClientEngine(gameEngine, options);
    clientEngine.start();

});