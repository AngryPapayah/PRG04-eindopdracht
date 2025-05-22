import { Actor, Keys, Vector } from "excalibur";
import { Resources } from './resources.js';


export class Shooter extends Actor {

   constructor() {
      super({width:Resources.Shooter.width, height:Resources.Shooter.height});
      
   }
   speed = 3;
   onInitialize(engine) {
      this.graphics.use(Resources.Shooter.toSprite());
      this.pos = new Vector(1, 500);
      this.scale = new Vector(0.18, 0.18);
      // if (this.vel.x > 0) {
      //    this.graphics.flipHorizontal = true;
      // }
      
   }

   onPreUpdate(engine) {
      let xspeed = 0;
      let yspeed = 0;

      if (engine.input.keyboard.isHeld("ArrowUp")) {
         yspeed = -this.speed;
      }
      if (engine.input.keyboard.isHeld("ArrowDown")) {
         yspeed = this.speed;
      }
      if (engine.input.keyboard.isHeld("ArrowLeft")) {
         xspeed = -this.speed;
      }
      if (engine.input.keyboard.isHeld("ArrowRight")) {
         xspeed = this.speed;
      }
      if (engine.input.keyboard.wasPressed(Keys.Space)) {
         console.log("SHOOT MOFO!")
      } 

      this.vel = new Vector(xspeed * 200, yspeed * 200);
   }
}
