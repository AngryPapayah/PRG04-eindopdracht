import '../css/style.css'
import { Actor, Engine, Vector, DisplayMode } from "excalibur"
import { Resources, ResourceLoader } from './resources.js'
import { Shooter } from './shooter.js'
import { Zombie } from './zombie.js'
import { Background } from './background.js'
import { Bullet } from './bullet.js'
import { UI } from './ui.js'

export class Game extends Engine {
    shooter;
    score = 0;
    ui;

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

        const ui = new UI();
        this.add(ui);
        this.ui = ui;

        const shooter = new Shooter()
        shooter.ui = ui;
        this.add(shooter)
        this.shooter = shooter


        // Spawn direct 8 zombies
        for (let i = 0; i < 8; i++) {
            const zombie = new Zombie(this.shooter);
            this.add(zombie);
        }
    }

    onPreUpdate() {
        // Tel het aantal zombies in de scene
        const zombies = this.currentScene.actors.filter(actor => actor instanceof Zombie);

        // Zolang de shooter leeft, vul aan tot 8 zombies
        if (this.shooter && !this.shooter.isKilled() && zombies.length < 4) {
            const zombie = new Zombie(this.shooter);
            this.add(zombie);
        }
    }

}

new Game()
