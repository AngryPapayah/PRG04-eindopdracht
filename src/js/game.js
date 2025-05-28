import '../css/style.css'
import { Actor, Engine, Vector, DisplayMode } from "excalibur"
import { Resources, ResourceLoader } from './resources.js'
import { Shooter } from './shooter.js'
import { Zombie } from './zombie.js'
import { Background } from './background.js'
import { Bullet } from './bullet.js'

export class Game extends Engine {
    shooter 
    
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

        const background = new Background()
        this.add(background);

        const shooter = new Shooter()
        this.add(shooter)
        this.shooter = shooter // Bewaar de shooter in de Game


        for (let i = 0; i < 8; i++) {
            const zombie = new Zombie(shooter) // Geef shooter mee
            this.add(zombie)
        }

    }

}

new Game()
