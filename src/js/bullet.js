import { Actor, CollisionType, Vector } from "excalibur";
import { Resources } from './resources.js';
import { Zombie } from './zombie.js'; // Importeer de Zombie class

export class Bullet extends Actor {
    constructor() {
        super({
            width: 150,
            height:150,
            collisionType: CollisionType.Passive, // Maak de bullet actief voor botsingen
        })
    }
    onInitialize(engine) {
        this.graphics.use(Resources.Bullet.toSprite());
        this.scale = new Vector(0.1, 0.1); // Verklein de kogel

        // Collision handler: als de bullet een zombie raakt
        this.on('collisionstart', (evt) => {
            if (evt.other.owner instanceof Zombie) {
                evt.other.owner.kill(); // Zombie gaat dood
                this.kill();    
                if(engine && engine.ui) {
                    engine.score += 1;
                    engine.ui.updateScore(engine.score); // Update de score in de UI
                }        // Bullet verdwijnt ook
            }
        });
    }
}
