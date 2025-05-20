import { Actor, Vector } from "excalibur";
import { Resources } from './resources.js'


export class Shooter extends Actor {

    onInitialize() {
        this.shooterToRandomPosition();
        this.graphics.use(Resources.Shooter.toSprite())
        this.events.on("exitviewport", (e) => this.shooterToRandomPosition(e))
    }

    shooterToRandomPosition() {
        this.pos = new Vector(Math.random() * 1280, Math.random() * 720);
        this.vel = new Vector(Math.random() * 100 - 50, Math.random() * 100 - 50); this.scale = new Vector(1, 1);
        this.scale = new Vector(1, 1);

        if (this.vel.x > 0) {
            this.graphics.flipHorizontal = true
        }
    }


}

