import { Actor, Keys, Vector, CollisionType } from "excalibur";
import { Resources } from './resources.js';
import { Bullet } from './bullet.js'; // <-- voeg deze import toe


export class Shooter extends Actor {


   constructor() {
      super({
         width: Resources.Shooter.width,
         height: Resources.Shooter.height,
         collisionType: CollisionType.Active // <-- voeg toe
      });

   }
   speed = 3;
   
   onInitialize(engine) {
      this.graphics.use(Resources.Shooter.toSprite());
      this.scale = new Vector(0.18, 0.18);
      // Zet de shooter in het midden van het scherm
      this.pos = new Vector(engine.drawWidth / 2, engine.drawHeight / 2);
   }

   onPreUpdate(engine) {
      let xspeed = 0;
      let yspeed = 0;

      if (engine.input.keyboard.isHeld("ArrowUp")) {
         yspeed = -this.speed;
         xspeed = 0;

      }
      if (engine.input.keyboard.isHeld("ArrowDown")) {
         yspeed = this.speed;
         xspeed = 0;

      }
      if (engine.input.keyboard.isHeld("ArrowLeft")) {
         xspeed = -this.speed;
         yspeed = 0;

      }
      if (engine.input.keyboard.isHeld("ArrowRight")) {
         xspeed = this.speed;
         yspeed = 0;

      }
      if (engine.input.keyboard.wasPressed(Keys.Space)) {
         // Maak een bullet aan en schiet in de kijkrichting
         const bullet = new Bullet();
         bullet.pos = this.pos.clone();
         bullet.rotation = this.rotation;

         const direction = new Vector(Math.cos(this.rotation - Math.PI / 2), Math.sin(this.rotation - Math.PI / 2));
         bullet.vel = direction.scale(500)
         engine.add(bullet);
      }

      this.vel = new Vector(xspeed * 200, yspeed * 200);

      if (xspeed !== 0 || yspeed !== 0) {
         // Update de rotatie van de shooter op basis van de beweging
         this.rotation = Math.atan2(yspeed, xspeed) + Math.PI / 2; 
         // this.lastDirection = new Vector(xspeed, yspeed).normalize(); // update de laatste richting
      }

      // Houd de shooter binnen het scherm
      const halfWidth = this.width * this.scale.x / 2;
      const halfHeight = this.height * this.scale.y / 2;
      this.pos.x = Math.max(halfWidth, Math.min(engine.drawWidth - halfWidth, this.pos.x));
      this.pos.y = Math.max(halfHeight, Math.min(engine.drawHeight - halfHeight, this.pos.y));
   }
}
