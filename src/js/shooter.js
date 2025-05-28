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
   // lastDirection = new Vector(1, 0); // standaard naar rechts

   onInitialize(engine) {
      this.graphics.use(Resources.Shooter.toSprite());
      // this.pos = new Vector(1, 500);
      this.scale = new Vector(0.18, 0.18);
   }

   onPreUpdate(engine) {
      let xspeed = 0;
      let yspeed = 0;

      if (engine.input.keyboard.isHeld("ArrowUp")) {
         yspeed = -this.speed;
         xspeed = 0;
         // this.lastDirection = new Vector(0, -1);
         this.rotation = Math.PI; // Draai de shooter naar boven
      }
      if (engine.input.keyboard.isHeld("ArrowDown")) {
         yspeed = this.speed;
         xspeed = 0;
         // this.lastDirection = new Vector(0, 1);
         this.rotation = 0; // Draai de shooter naar beneden
      }
      if (engine.input.keyboard.isHeld("ArrowLeft")) {
         xspeed = -this.speed;
         yspeed = 0;
         // this.lastDirection = new Vector(-1, 0);
         this.rotation = Math.PI / 2; // Draai de shooter naar links
      }
      if (engine.input.keyboard.isHeld("ArrowRight")) {
         xspeed = this.speed;
         yspeed = 0;
         // this.lastDirection = new Vector(1, 0);
         this.rotation = -Math.PI / 2; // Draai de shooter naar rechts
      }
      if (engine.input.keyboard.wasPressed(Keys.Space)) {
         // Maak een bullet aan en schiet in de kijkrichting
         const bullet = new Bullet();
         bullet.pos = this.pos.clone();
         // bullet.vel = this.lastDirection.scale(600); // snelheid aanpassen indien gewenst
         bullet.rotation = this.rotation;
         engine.add(bullet);
      } 

      this.vel = new Vector(xspeed * 200, yspeed * 200);

      // Zet de rotatie op basis van de richting, zodat de sprite de juiste kant op kijkt
      // this.rotation = Math.atan2(this.lastDirection.y, this.lastDirection.x) - Math.PI / 2;

      // Houd de shooter binnen het scherm
      const halfWidth = this.width * this.scale.x / 2;
      const halfHeight = this.height * this.scale.y / 2;
      this.pos.x = Math.max(halfWidth, Math.min(engine.drawWidth - halfWidth, this.pos.x));
      this.pos.y = Math.max(halfHeight, Math.min(engine.drawHeight - halfHeight, this.pos.y));
   }
}
