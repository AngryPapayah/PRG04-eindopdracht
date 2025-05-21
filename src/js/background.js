import { Actor, Vector} from 'excalibur'
import { Resources } from './resources.js'

export class Background extends Actor {
    onInitialize(engine) {
        const backgroundSprite = Resources.Background.toSprite()
        this.graphics.use(backgroundSprite)

        this.pos = new Vector(engine.drawWidth / 2, engine.drawHeight / 2)

        const scaleX = engine.drawWidth / backgroundSprite.width
        const scaleY = engine.drawHeight / backgroundSprite.height
        this.scale = new Vector(scaleX, scaleY)
    }
}
