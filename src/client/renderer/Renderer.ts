import { render } from 'lance-gg';
import * as p5 from 'p5';
import * as _ from 'lodash';

export class Renderer extends render.Renderer {

    renderer: any;

    constructor(gameEngine, clientEngine) {
        super(gameEngine, clientEngine);
        
        // TODO: remove this delay, worldSettings is undefined before delay 
        _.delay(() => {
            this.renderer = new p5((sketch) => {
                this.renderer = sketch;
                sketch.setup = () => {
                    sketch.createCanvas(this.gameEngine.worldSettings.width, this.gameEngine.worldSettings.height);
                }
                
            });
        }, 50);

    }
    
    draw() {
        super.draw();
    }

}