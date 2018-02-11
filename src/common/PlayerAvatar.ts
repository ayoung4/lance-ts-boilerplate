import { serialize } from 'lance-gg';

interface IPlayerScheme extends serialize.IINetScheme { }

export class PlayerAvatar extends serialize.DynamicObject<IPlayerScheme> {

    class: typeof PlayerAvatar;

    constructor(id, position, velocity) {
        super(id, position, velocity);
        this.class = PlayerAvatar;
    };

}
