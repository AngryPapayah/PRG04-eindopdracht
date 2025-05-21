import { Actor,Vector } from "excalibur";
import { Resources } from './resources.js';

export class Zombie extends Actor {
    onInitialize() {
        this.graphics.use(Resources.Zombie.toSprite())
        this.pos = new Vector(600, 500)
        this.scale = new Vector(0.52, 0.52)
        
        
    }

}