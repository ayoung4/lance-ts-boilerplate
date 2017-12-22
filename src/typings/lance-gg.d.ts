declare module 'lance-gg' {

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
        worldSettings: { width: number, height: number };
        constructor(options: IGameEngineOptions);
        findLocalShadow(serverObj): object | null;
        initWorld(): void;
        on(event: engineEvent, handler: () => void)
        start(): void;
        step(isReenact: boolean, t?: number, dt?: number, physicsOnly?: boolean): void;
        addObjectToWorld(object: object): object;
        processInput<T extends IInputMessage>(inputMsg: T, playerId: string, isServer?: boolean): void;
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
        serializer: serialize.Serializer;
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

    export class ClientEngine {
        options: IClientEngineOptions;
        serializer: serialize.Serializer;
        gameEngine: GameEngine;
        playerId: string;
        networkTransmitter: NetworkTransmitter;
        networkMonitor: NetworkMonitor
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

    type syncStrategyType = 'extrapolate' | 'interpolate' | 'frameSync';
    type syncStrategy = any;

    interface ISynchronizerOptions {
        sync: syncStrategyType;
    }

    export class Synchronizer {
        clientEngine: ClientEngine;
        options: ISynchronizerOptions;
        syncStrategy: syncStrategy;
        constructor(clientEngine: ClientEngine, options: ISynchronizerOptions);
    }

    export class GameWorld {
        objects: object;
        stepCount: number;
        playerCount: number;
        idCount: number;
        constructor();
        forEachObject(callback: (id: string, obj: object) => void): void;
        getPlayerObject<T>(playerId: string): T;
        getOwnedObject<T>(playerId: string): T[];
    }

    export module serialize {

        interface INetSchemProp {
            type: any;
            itemType?: any;
        }

        interface IINetScheme {
            id: INetSchemProp;
            playerId: INetSchemProp;
            position: INetSchemProp;
            velocity: INetSchemProp;
            angle: INetSchemProp;
            [key: string]: INetSchemProp;
        }

        export class Serializer {
            constructor();
            registerClass(classRef: (...args: any[]) => object, classId?: string): void;
            deserialize<T>(dataBuffer: any, byteOffset?: number): T;
            writeDataView(dataView: DataView, value: any, bufferOffset: number, netSchemProp: INetSchemProp): void;
            readDataView(dataView: DataView, bufferOffset: number, netSchemProp: INetSchemProp): { data: any, bufferSize: number };
            private getTypeByteSize(type: string): number;
            private typeCanAssign(type: string): boolean;
        }

        interface ISerializableOptions {
            dataBuffer?: object;
            bufferOffset?: number;
            dry?: boolean;
        }

        export class Serializable {
            classId: string;
            netScheme: object;
            serialize(serializer: object, options: ISerializableOptions);
            prunedStringsClone(serializer: object, prevObject: any): Serializable;
            syncTo(other: any): void;
        }

        export class PhysicalObject { }

        export class THREEPhysicalObject { }

        export class GameObject extends Serializable {
            netScheme: IINetScheme;
            id: string;
            constructor(id: string);
            init(options: object): void;
            toString(): string;
            bendingToString(): string;
            saveState(other: object): void;
            bendToCurrentState(bending, worldSettings, isLocal, bendingIncrements): void;
            bendToCurrent(original, bending, worldSettings, isLocal, bendingIncrements): void;
            syncTo(other: GameObject): void;
        }

        export class DynamicObject<T extends IINetScheme> extends GameObject {
            netScheme: T;
            playerId: number;
            position: TwoVector;
            velocity: TwoVector;
            friction: TwoVector;
            affectedByGravity: boolean;
            angle: number;
            isRotatingLeft: boolean;
            isRotatingRight: boolean;
            isAccelerating: boolean;
            rotationSpeed: number;
            acceleration: number;
            bending: TwoVector;
            bendingAngle: number;
            deceleration: number;
            constructor(id: string, position?: TwoVector, velocity?: TwoVector);
            x: number;
            y: number;
            bendingToString(): string;
            syncTo(other: DynamicObject<any>): void;
            bendToCurrent(original: DynamicObject<any>, bending: number, worldSettings: { width: number, height: number }, isLocal: boolean, bendingIncrements: number): void;
            applyIncrementalBending(): void;
            interpolate(nextObj: DynamicObject<T>, playPercentage: number, worldSettings: { width: number, height: number }): void;
        }

        export class TwoVector extends Serializable {
            x: number;
            y: number;
            constructor(x: number, y: number);
            set(x: number, y: number): TwoVector;
            add(other: TwoVector): TwoVector;
            subtract(other: TwoVector): TwoVector;
            multiply(other: TwoVector): TwoVector;
            multiplyScalar(s: number): TwoVector;
            length(): number;
            normalize(): TwoVector;
            copy(source: TwoVector): TwoVector;
            clone(): TwoVector;
            lerp(target: TwoVector, p: number): void;
        }

        export class ThreeVector extends Serializable {
            x: number;
            y: number;
            z: number;
            constructor(x: number, y: number, z: number);
            set(x: number, y: number, z: number): ThreeVector;
            add(other: ThreeVector): ThreeVector;
            subtract(other: ThreeVector): ThreeVector;
            multiply(other: ThreeVector): ThreeVector;
            multiplyScalar(s: number): ThreeVector;
            length(): number;
            normalize(): ThreeVector;
            copy(source: ThreeVector): ThreeVector;
            clone(): ThreeVector;
            lerp(target: ThreeVector, p: number): void;
        }

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

        export class ThreeRenderer { }

        export class AFrameRenderer { }

    }

    export module controls {

        interface IKeyBindingOptions {
            repeat: boolean;
        }

        interface IKeyBinding {
            actionName: string;
            options: IKeyBindingOptions;
        }

        interface IKeyState {
            count: number;
            isDown: boolean
        }

        export class Keyboard {
            private keyState: { [key: string]: IKeyState };
            private boundKeys: { [key: string]: IKeyBinding }
            constructor(clientEngine: ClientEngine);
            setupListeners(): void;
            bindKey(keys: string | string[], actionName: string, options?: IKeyBindingOptions);
        }

    }

    class NetworkMonitor {
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

    class NetworkTransmitter {
        serializer: serialize.Serializer
        registeredEvents: any[];
        payload: any[]
        constructor(serializer: serialize.Serializer);
        registerNetworkedEventFactory(eventName, options): void;
        addNetworkedEvent(eventName, payload): any;
        serializePayload(): any
        deserializePayload(payload): any;
        clearPayload(): void;
    }

}
