import { Actor, Vector } from "excalibur";
import { Resources } from './resources.js';


export class Shooter extends Actor {
   onInitialize() {
      this.graphics.use(Resources.Shooter.toSprite());
      this.pos = new Vector(1, 500);
      this.scale = new Vector(0.25, 0.25);
      if (this.vel.x > 0) {
         this.graphics.flipHorizontal = true;
      }
   }
}