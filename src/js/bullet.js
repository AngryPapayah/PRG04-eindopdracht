import { Actor, Resource, Vector } from "excalibur";
import { Resources } from './resources.js';

export class Bullet extends Actor {
    onInitialize() {
        this.graphics.use(Resources.Bullet.toSprite());
        this.scale = new Vector(0.1, 0.1); // Verklein de kogel
    }
}
