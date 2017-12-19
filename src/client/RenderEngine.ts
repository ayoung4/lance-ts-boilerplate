import { render } from 'lance-gg';
import * as p5 from 'p5';

export class RenderEngine extends render.Renderer {

    renderer: any;

    constructor(gameEngine, clientEngine) {
        super(gameEngine, clientEngine);
        this.renderer = new p5();
    }

    draw() {
        super.draw();
    }

}