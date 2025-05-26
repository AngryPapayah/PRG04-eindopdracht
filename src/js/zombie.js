import { Actor,Vector } from "excalibur";
import { Resources } from './resources.js';

export class Zombie extends Actor {
    shooter;

    constructor(shooter) {
        super();
        this.shooter = shooter;

    }
    onInitialize() {
        
        this.zombieRandomPosition();
        this.graphics.use(Resources.Zombie.toSprite())
        
        this.events.on("exitviewport", (e) => this.zombieRandomPosition(e))
        
        
    }

    zombieRandomPosition() {
        this.pos = new Vector(Math.random() * 800, Math.random() * 600);
        this.vel = new Vector(Math.random() * 100, Math.random() * 100);
        this.scale = new Vector(0.52, 0.52)

        if (this.vel.x > 0) {
            this.graphics.flipHorizontal = true;
        }
    }

}