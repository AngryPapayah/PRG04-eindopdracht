import { Actor, Keys, Vector, CollisionType } from "excalibur";
import { Resources } from './resources.js';
import { Bullet } from './bullet.js'; // <-- voeg deze import toe
import { Zombie } from "./zombie.js";
import { UI } from "./ui.js";


export class Shooter extends Actor {
   /** @type {UI|null}*/
   ui = null;
   health = 100; // <-- voeg toe

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

      if (this.ui) this.ui.setHealth(this.health); // <-- voeg toe om de UI te initialiseren
   }

   takeDamage(amount) {
      this.health -= amount;
      if (this.health < 0) this.health = 0;
      if (this.ui) this.ui.setHealth(this.health);
      if (this.health === 0) {
         this.kill(); // De shooter gaat dood
         if (this.scene && this.scene.engine && typeof this.scene.engine.startGame() === "function") {
            this.scene.engine.startGame();
         }
      }
   }


   onPreUpdate(engine) {
      let xspeed = 0;
      let yspeed = 0;

      if (engine.input.keyboard.isHeld(Keys.W)) {
         yspeed = -this.speed;
         xspeed = 0;
      }
      if (engine.input.keyboard.isHeld(Keys.S)) {
         yspeed = this.speed;
         xspeed = 0;
      }
      if (engine.input.keyboard.isHeld(Keys.A)) {
         xspeed = -this.speed;
         yspeed = 0;
      }
      if (engine.input.keyboard.isHeld(Keys.D)) {
         xspeed = this.speed;
         yspeed = 0;
      }
      if (engine.input.keyboard.wasPressed(Keys.Space)) {
         // Zoek de dichtstbijzijnde zombie
         let nearestZombie = null;
         let minDist = Infinity;
         for (const actor of engine.currentScene.actors) {
            if (actor instanceof Zombie) {
               const dist = this.pos.distance(actor.pos);
               if (dist < minDist) {
                  minDist = dist;
                  nearestZombie = actor;
               }
            }
         }

         // Richting bepalen: naar dichtstbijzijnde zombie, anders huidige rotatie
         let direction;
         if (nearestZombie) {
            direction = nearestZombie.pos.sub(this.pos).normalize();
         } else {
            direction = new Vector(Math.cos(this.rotation - Math.PI / 2), Math.sin(this.rotation - Math.PI / 2));
         }

         // Maak en schiet de bullet
         const bullet = new Bullet();
         bullet.pos = this.pos.clone();
         bullet.rotation = Math.atan2(direction.y, direction.x) + Math.PI / 2;
         bullet.vel = direction.scale(500);
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
