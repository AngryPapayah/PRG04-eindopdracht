import { Vector } from "excalibur";
import { Resources } from "./resources";
import { Zombie } from "./zombie";

export class SpeedZombie extends Zombie {
    constructor(shooter) {
        super(shooter); 
        this.speed = 150 + Math.random() * 50; // Maak deze zombie sneller
        this.graphics.use(Resources.Speedzombie.toSprite()); 
        this.scale = new Vector(0.05, 0.05); 
    }
}