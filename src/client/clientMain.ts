import { MyGameEngine } from 'Common/MyGameEngine';
import { MyClientEngine } from 'Client/MyClientEngine';

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

    const gameEngine = new MyGameEngine(options);
    const clientEngine = new MyClientEngine(gameEngine, options);
    clientEngine.start();

});