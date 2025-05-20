import '../css/style.css'
import { Actor, Engine, Vector, DisplayMode } from "excalibur"
import { Resources, ResourceLoader } from './resources.js'

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
        background.pos = new Vector(0, 0)
        background.scale = new Vector(4, 2.8)
        this.add(background);

        const cat = new Actor()
        cat.graphics.use(Resources.Cat.toSprite())
        cat.pos = new Vector(6, 500)
        if (cat.vel.x > 0) {
            cat.graphics.flipHorizontal = true
        }
        cat.events.on("exitviewport", (e) => this.catleft(e))
        this.add(cat)

        const mouse = new Actor()
        mouse.graphics.use(Resources.Mouse.toSprite())
        mouse.pos = new Vector(600, 500)
        mouse.scale = new Vector(1.7,1.7 )
        this.add(mouse)
    }

    catleft(e) {
        e.target.pos = new Vector(1350, 300)
    }
}

new Game()
