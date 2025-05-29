import { Actor, Color, Font, Label, Vector } from "excalibur";

export class UI extends Actor {
    label;
    healthbar;

    onInitialize(engine){
        this.label = new Label({
            text: 'Scoore: 0',
            pos: new Vector(50, 50),
            font: new Font({
                family: 'Arial',
                size: 24,
                color: Color.Blue,
            })
        });

        let barbackground = new Actor({ x: 10, y: 40, color: Color.fromRGB(255, 255, 255, 0.4), width: 200, height: 20, anchor: Vector.Zero})
        this.addChild(barbackground)

        this.healthbar = new Actor({ x: 10, y: 40, color: Color.Green, width: 200, height: 20, anchor: Vector.Zero })
        this.addChild(this.healthbar)

        this.addChild(this.label);
    }

    reduceHealth() {
        this.healthbar.scale = new Vector(0.5, 1) // de health is nu 50%
    }

    updateScore(score) {
        this.label.text = `Score: ${score}`;
    }
}