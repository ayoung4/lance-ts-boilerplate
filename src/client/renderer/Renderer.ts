import { render } from 'lance-gg';
import * as p5 from 'p5';
import * as _ from 'lodash';

export class Renderer extends render.Renderer {

    renderer: p5Sketch;

    constructor(gameEngine, clientEngine) {
        super(gameEngine, clientEngine);

        this.renderer = new p5((sketch) => {
            this.renderer = sketch;
            sketch.setup = () => {
                sketch.createCanvas(this.gameEngine.worldSettings.width, this.gameEngine.worldSettings.height);
            }
        });

    }

    draw() {
        super.draw();
        this.renderer.background(255);
        this.gameEngine.world.forEachObject((id, obj: any) => {
            this.renderer.ellipse(obj.position.x, obj.position.y, 50, 50);
        });
    }

}