import '../css/style.css'
import { Actor, Engine, Vector, DisplayMode } from "excalibur"
import { Resources, ResourceLoader } from './resources.js'
import { Shooter } from './shooter.js'
import { Zombie } from './zombie.js'
import { Background } from './background.js'
import { Bullet } from './bullet.js'
import { UI } from './ui.js'
import { SpeedZombie } from './speedzombie.js'

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

        for (let i = 0; i < 2; i++) {
            const speedZombie = new SpeedZombie(this.shooter);
            this.add(speedZombie);
        }

        const speedZombie = new SpeedZombie(this.shooter);
        this.add(speedZombie);


    }

    increaseZombieSpeed() {
        const zombies = this.currentScene.actors.filter(actor => actor instanceof Zombie);
        for (const zombie of zombies) {
            zombie.speed *= 1.5; // Verhoog de snelheid van elke zombie met 10
        }
    }

    onPreUpdate() {
        // Tel het aantal zombies in de scene
        const zombies = this.currentScene.actors.filter(actor => actor instanceof Zombie);
        const speedZombies = this.currentScene.actors.filter(actor => actor instanceof SpeedZombie);

        // Zolang de shooter leeft, vul aan tot 8 zombies
        if (this.shooter && !this.shooter.isKilled() && zombies.length < 4) {
            const zombie = new Zombie(this.shooter);
            this.add(zombie);
        }

        // Vul aan tot 2 speedzombies
        if (this.shooter && !this.shooter.isKilled() && speedZombies.length < 2) {
            const speedZombie = new SpeedZombie(this.shooter);
            this.add(speedZombie);
        }



    }

}

new Game()
