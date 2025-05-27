import { Actor, CollisionType, Vector } from "excalibur";
import { Resources } from './resources.js';

export class Zombie extends Actor {
    shooter;

    constructor(shooter) {
        super({
            width: 200,
            height: 200,
            collisionType: CollisionType.Passive,
        });
        this.shooter = shooter;
        this.speed = 80 + Math.random() * 50; // Random speed between 80 and 130

    }
    onInitialize() {

        this.zombieRandomPosition();
        this.graphics.use(Resources.Zombie.toSprite())

        this.events.on("exitviewport", (e) => this.zombieRandomPosition(e))

        this.on('postupdate', () => {
            const direction = this.shooter.pos.sub(this.pos).normalize();
            this.vel = direction.scale(this.speed);
            this.rotation = Math.atan2(direction.y, direction.x);

            // Flip zombie afhankelijk van richting
            // this.graphics.flipHorizontal = this.vel.x > 0;
        });

    }

    zombieRandomPosition() {
        this.pos = new Vector(Math.random() * 800, Math.random() * 600);
        this.vel = new Vector(Math.random() * 100, Math.random() * 100);
        this.scale = new Vector(0.52, 0.52)

        
    }

}