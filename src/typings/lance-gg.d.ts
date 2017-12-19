declare module 'lance-gg' {

    export class GameWorld {
        objects: object;
        stepCount: number;
        playerCount: number;
        idCount: number;
        constructor();
        forEachObject(callback: (id: string, obj: object) => void): void;
        getPlayerObject(playerId: string): any;
        getOwnedObject(playerId: string): any[];
    }

    interface IGameEngineOptions {
        traceLevel?: number;
        delayInputCount?: number;
    }

    interface IInputMessage {
        input: string;
        messageIndex: string | number;
    }

    type engineEvent = 'preStep'
        | 'postStep'
        | 'objectAdded'
        | 'objectDestroyed'
        | 'playerJoined'
        | 'playerDisconnected'
        | 'syncReceived'
        | 'processInput'
        | 'client__preStep'
        | 'client__postStep'
        | 'client__processInput'
        | 'client__syncReceived'
        | 'client__stepReset'
        | 'client__slowFrameRate'
        | 'server__playerJoined'
        | 'server__playerDisconnected'
        | 'server__preStep'
        | 'server__processInput'
        | 'server__postStep'
        | 'server__inputReceived'
        | 'server__start'

    export class GameEngine {
        world: GameWorld;
        worldSettings: object;
        constructor(options: IGameEngineOptions);
        findLocalShadow(serverObj): object | null;
        initWorld(): void;
        on(event: engineEvent, handler: () => void)
        start(): void;
        step(isReenact: boolean, t?: number, dt?: number, physicsOnly?: boolean): void;
        addObjectToWorld(object: object): object;
        processInput(inputMsg: IInputMessage, playerId: string, isServer?: boolean): void;
        removeObjectFromWorld(id: string): void;
        registerClasses(serializer): void;
    }

    interface IServerEngineOptions {
        stepRate: number;
        updateRate: number;
        tracesPath: any;
        updateOnObjectCreation: any;
        timeoutInterval: number;
    }

    export class ServerEngine {
        gameEngine: GameEngine;
        serializer: any;
        constructor(io: SocketIO.Server, gameEngine: GameEngine, options: IServerEngineOptions);
        start(): void;
        step(): void;
        serializeUpdate(options): any;
        onObjectAdded(obj): void;
        onObjectDestroyed(obj): void;
        onPlayerConnected(socket): void;
        onPlayerTimeout(socket): void
        onPlayerDisconnected(socketId, playerId): void
        resetIdleTimeout(socket): void;
        queueInputForPlayer(data, playerId): void;
        onReceivedInput(data, socket): void;
        gameStatus(): string;
    }

    export module render {

        export class Renderer {
            gameEngine: GameEngine;
            clientEngine: ClientEngine;
            constructor(gameEngine: GameEngine, clientEngine: ClientEngine);
            init(): Promise<void>;
            reportSlowFrameRate(): void;
            draw(t?: number, dt?: number);
            runClientStep(t: number, dt: number): void;
            addObject(obj: object): void;
            removeObject(obj: object): void;
        }

    }

    interface IClientEngineOptions {
        autoConnect: boolean;
        delayInputCount: number;
        healthCheckInterval: number;
        healthCheckRTTSample: number;
        syncOptions: {
            sync: 'interpolate' | 'extrapolate' | 'frameSync';
            localObjBending: number;
            remoteObjBending: number;
        };
        scheduler: string;
    }

    type Serializer = any;

    export class ClientEngine {
        options: IClientEngineOptions;
        serializer: Serializer;
        gameEngine: GameEngine;
        playerId: string;
        constructor(gameEngine: GameEngine, inputOptions: IClientEngineOptions, Renderer: typeof render.Renderer);
        isOwnedByPlayer(object: object): boolean;
        configureSynchronization(): void
        connect(options: object): Promise<object>;
        start(): Promise<any>;
        checkDrift(checkType: string): void;
        step(t, dt, physicsOnly): void;
        doInputLocal(message: { data: string });
        applyDelayedInputs(): void
        sendInput(input: string | object, inputOptions: object): void;
        handleInboundMessage(syncData: any): void;
        handleOutboundInput(): void;
    }

    export class NetworkMonitor {
        queryIdCounter: number;
        RTTQueries: object;
        movingRTTAverage: number;
        movingRTTAverageFrame: any[];
        movingFPSAverageSize: number;
        clientEngine: ClientEngine;
        constructor();
        registerClient(clientEngine: ClientEngine): void;
        sendRTTQuery(): void;
        onReceivedRTTQuery(queryId: string): void
        registerPlayerOnServer(socket): void;
        respondToRTTQuery(socket, queryId: string): void;

    }

    export class NetworkTransmitter {
        serializer: Serializer
        registeredEvents: any[];
        payload: any[]
        constructor(serializer: Serializer);
        registerNetworkedEventFactory(eventName, options): void;
        addNetworkedEvent(eventName, payload): any;
        serializePayload(): any
        deserializePayload(payload): any;
        clearPayload(): void;
    }

}
