import { serialize } from 'lance-gg';

interface IPlayerScheme extends serialize.IINetScheme {

}

export class Player extends serialize.DynamicObject<IPlayerScheme> {
    class: typeof Player;
    constructor(id, position) {
        super(id, position, new serialize.TwoVector(0, 0));
        this.class = Player;
    };

}