import { Vector } from "excalibur";
import { Resources } from "./resources";
import { Zombie } from "./zombie";

export class SpeedZombie extends Zombie {
    constructor(shooter) {
        super(shooter); // Roep de constructor van Zombie aan
        this.speed = 150 + Math.random() * 50; // Maak deze zombie sneller
        this.graphics.use(Resources.Speedzombie.toSprite()); // Gebruik een ander plaatje
        this.scale = new Vector(0.05, 0.05); // Optioneel: pas schaal aan
    }
}