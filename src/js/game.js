import '../css/style.css'
import { Actor, Engine, Vector, DisplayMode } from "excalibur"
import { Resources, ResourceLoader } from './resources.js'
import { Shooter } from './shooter.js'

export class Game extends Engine {

    constructor() {
        super({
            width: 1280,
            height: 720,
            maxFps: 60,
            displayMode: DisplayMode.FitScreen
        })
        this.start(ResourceLoader).then(() => this.startGame())
    }

    startGame() {
        console.log("start de game!")

        const background = new Actor()
        background.graphics.use(Resources.Background.toSprite())
        background.pos = new Vector(500, 500)
        background.scale = new Vector(1, 1)
        this.add(background);
        // const backgroundz = new Actor()
        // backgroundz.graphics.use(Resources.Backgroundz.toSprite())
        // backgroundz.pos = new Vector(0, 0)
        // backgroundz.scale = new Vector(4, 2.8)
        // this.add(backgroundz);

        const shooter = new Actor()
        // shooter.graphics.use(Resources.Shooter.toSprite())
        // shooter.pos = new Vector(6, 500)
        // if (shooter.vel.x > 0) {
        //     shooter.graphics.flipHorizontal = true
        // }
        // shooter.events.on("exitviewport", (e) => this.catleft(e))
        this.add(shooter)

        for (let i = 0; i < 10; i++) {
            const zombie = new Actor()
            zombie.graphics.use(Resources.Zombie.toSprite())
            zombie.pos = new Vector(600, 500)
            zombie.scale = new Vector(1, 1)
            this.add(zombie)
        }

    }

    catleft(e) {
        e.target.pos = new Vector(1350, 300)
    }
}

new Game()
