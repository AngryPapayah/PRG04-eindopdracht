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
        const cat = new Actor()
        cat.graphics.use(Resources.Cat.toSprite())
        cat.pos = new Vector(0, 0)
        // cat.vel = new Vector(-10,0)
        cat.events.on("exitviewport", (e) => this.catleft(e))
        this.add(cat)
    }

    catleft(e) {
        e.target.pos = new Vector(1350, 300)
    }
}

new Game()
