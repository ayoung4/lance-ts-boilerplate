import { render } from 'lance-gg';

export class MyRenderer extends render.Renderer {

    sprites: {
        [key: string]: string;
    };

    constructor(gameEngine, clientEngine) {
        super(gameEngine, clientEngine);
        this.sprites = {};
    }

    draw() {
        super.draw();
    }

}