import { Actor, Vector } from "excalibur";
import { Resources } from "./resources";

export class Background extends Actor {
    constructor() {
        super({
            anchor: Vector.Zero
        });
        
    }

    onInitialize(engine) {
        const sprite = Resources.Background.toSprite();
        const scaleX = engine.drawWidth / sprite.width;
        const scaleY = engine.drawHeight / sprite.height;
        sprite.scale = new Vector(scaleX, scaleY);
        this.graphics.use(sprite);
        // Let op: de positie wordt buiten deze class gezet bij het aanmaken!
    }

    onPreUpdate(engine, delta) {
        if (engine.shooter) {
            // Laat de achtergrond meebewegen met de shooter
            this.pos.y = Math.floor(engine.shooter.pos.y / engine.drawHeight) * engine.drawHeight;
            this.pos.x = 0;
        }
    }
}