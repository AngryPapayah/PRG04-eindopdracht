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
        this.speed = 80 + Math.random() * 50;
        this.scale = new Vector(0.52, 0.52); // Zet de scale hier!
    }
    onInitialize() {
        this.zombieRandomPosition();
        // Alleen het sprite zetten als er nog geen sprite is
        if (!this.graphics.current) {
            this.graphics.use(Resources.Zombie.toSprite());
        }

        this.events.on("exitviewport", (e) => this.zombieRandomPosition(e));

        this.on('postupdate', () => {
            const direction = this.shooter.pos.sub(this.pos).normalize();
            this.vel = direction.scale(this.speed);
            this.rotation = Math.atan2(direction.y, direction.x);
        });

        this.on('collisionstart', (event) => {
            if (event.other.owner === this.shooter) {
                this.shooter.takeDamage(5);
                
            }
        });
    }

    zombieRandomPosition() {
        const screenWidth = 1280;
        const screenHeight = 720;
        const edge = Math.floor(Math.random() * 4);

        switch (edge) {
            case 0:
                this.pos = new Vector(Math.random() * screenWidth, -50);
                break;
            case 1:
                this.pos = new Vector(screenWidth + 50, Math.random() * screenHeight);
                break;
            case 2:
                this.pos = new Vector(Math.random() * screenWidth, screenHeight + 50);
                break;
            case 3:
                this.pos = new Vector(-50, Math.random() * screenHeight);
                break;
        }
    }

}