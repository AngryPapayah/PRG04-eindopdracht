import { Actor, CollisionType, Vector } from "excalibur";
import { Resources } from './resources.js';
import { Zombie } from './zombie.js';

export class Bullet extends Actor {
    constructor() {
        super({
            width: 150,
            height:150,
            collisionType: CollisionType.Passive,
        })
    }
    onInitialize(engine) {
        this.graphics.use(Resources.Bullet.toSprite());
        this.scale = new Vector(0.1, 0.1);

        this.on('collisionstart', (evt) => {
            if (evt.other.owner instanceof Zombie) {
                evt.other.owner.kill();
                this.kill();
                if(engine && engine.ui) {
                    engine.score += 1;
                    engine.ui.updateScore(engine.score);

                    // Verhoog zombie speed elke 5 kills
                    if (engine.score % 5 === 0 && typeof engine.increaseZombieSpeed === "function") {
                        engine.increaseZombieSpeed();
                    }
                }
            }
        });
    }
}