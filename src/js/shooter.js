import { Actor, Keys, Vector, CollisionType } from "excalibur";
import { Resources } from './resources.js';
import { Bullet } from './bullet.js';
import { Zombie } from "./zombie.js";
import { UI } from "./ui.js";

export class Shooter extends Actor {
   /** @type {UI|null} */
   ui = null;
   health = 100;

   bulletCount = 0;
   maxBullets = 5;
   isReloading = false;
   reloadTime = 1500;
   speed = 3;

   constructor() {
      super({
         width: Resources.Shooter.width,
         height: Resources.Shooter.height,
         collisionType: CollisionType.Active
      });
   }

   onInitialize(engine) {
      this.graphics.use(Resources.Shooter.toSprite());
      this.scale = new Vector(0.18, 0.18);
      this.pos = new Vector(engine.drawWidth / 2, engine.drawHeight / 2);

      if (this.ui) {
         this.ui.setHealth(this.health);
         this.ui.updateAmmo(this.bulletCount, this.maxBullets);
      }
   }

   takeDamage(amount) {
      this.health -= amount;
      if (this.health < 0) this.health = 0;
      if (this.ui) this.ui.setHealth(this.health);

      if (this.health === 0) {
         this.kill();
         if (this.scene && this.scene.engine && typeof this.scene.engine.startGame === "function") {
            this.scene.engine.startGame();
         }
      }
   }

   startReloading(engine) {
      if (this.isReloading) return;

      this.isReloading = true;
      if (this.ui) this.ui.showReloading();

      setTimeout(() => {
         this.bulletCount = 0;
         this.isReloading = false;

         if (this.ui) {
            this.ui.updateAmmo(this.bulletCount, this.maxBullets);
         }
      }, this.reloadTime);
   }

   onPreUpdate(engine) {
      let xspeed = 0;
      let yspeed = 0;

      if (engine.input.keyboard.isHeld(Keys.W)) yspeed = -this.speed;
      if (engine.input.keyboard.isHeld(Keys.S)) yspeed = this.speed;
      if (engine.input.keyboard.isHeld(Keys.A)) xspeed = -this.speed;
      if (engine.input.keyboard.isHeld(Keys.D)) xspeed = this.speed;

      // Schieten met spatie
      if (engine.input.keyboard.wasPressed(Keys.Space)) {
         if (!this.isReloading) {
            if (this.bulletCount < this.maxBullets) {
               this.bulletCount++;

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

               let direction;
               if (nearestZombie) {
                  direction = nearestZombie.pos.sub(this.pos).normalize();
               } else {
                  direction = new Vector(Math.cos(this.rotation - Math.PI / 2), Math.sin(this.rotation - Math.PI / 2));
               }

               const bullet = new Bullet();
               bullet.pos = this.pos.clone();
               bullet.rotation = Math.atan2(direction.y, direction.x) + Math.PI / 2;
               bullet.vel = direction.scale(500);
               engine.add(bullet);

               if (this.ui) this.ui.updateAmmo(this.bulletCount, this.maxBullets);

               // Automatisch reloaden als max bereikt is
               if (this.bulletCount >= this.maxBullets) {
                  this.startReloading(engine);
               }
            }
         }
      }

      // Reload handmatig met R
      if (engine.input.keyboard.wasPressed(Keys.R)) {
         if (!this.isReloading && this.bulletCount > 0) {
            this.startReloading(engine);
         }
      }

      // Beweging
      this.vel = new Vector(xspeed * 200, yspeed * 200);

      if (xspeed !== 0 || yspeed !== 0) {
         this.rotation = Math.atan2(yspeed, xspeed) + Math.PI / 2;
      }

      // Blijf binnen scherm
      const halfWidth = this.width * this.scale.x / 2;
      const halfHeight = this.height * this.scale.y / 2;
      this.pos.x = Math.max(halfWidth, Math.min(engine.drawWidth - halfWidth, this.pos.x));
      this.pos.y = Math.max(halfHeight, Math.min(engine.drawHeight - halfHeight, this.pos.y));
   }
}
