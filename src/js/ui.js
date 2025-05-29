import { Actor, Color, Font, Label, Vector, Rectangle } from "excalibur";
import { Resources } from './resources.js';

export class UI extends Actor {
    label;
    healthbar;
    healthRect;
    ammoLabel;

    onInitialize(engine) {
        this.label = new Label({
            text: 'Score: 0',
            pos: new Vector(100, 90),
            font: new Font({
                family: 'Arial',
                size: 24,
                color: Color.Black,
            })
        });

        let barbackground = new Actor({
            x: 10, y: 40,
            width: 200, height: 20,
            anchor: Vector.Zero
        });
        barbackground.graphics.use(new Rectangle({
            width: 200,
            height: 20,
            color: Color.fromRGB(255, 255, 255, 0.4)
        }));
        this.addChild(barbackground);

        this.healthbar = new Actor({
            x: 10, y: 40,
            width: 200, height: 20,
            anchor: Vector.Zero
        });

        this.healthRect = new Rectangle({
            width: 200,
            height: 20,
            color: Color.Green
        });

        this.ammoLabel = new Label({
            text: 'Ammo: 5/5',
            pos: new Vector(100, 120), // iets onder de score
            font: new Font({
                family: 'Arial',
                size: 24,
                color: Color.Black,
            })
        });
        this.addChild(this.ammoLabel);

        this.healthbar.graphics.use(this.healthRect);
        this.addChild(this.healthbar);
        this.addChild(this.label);
    }

    updateAmmo(current, max) {
        this.ammoLabel.text = `Ammo: ${max - current}/${max}`;
    }

    showReloading() {
        this.ammoLabel.text = 'Reloading...';
    }

    setHealth(percentage) {
        console.log(`Health percentage: ${percentage}%`);
        this.healthbar.scale = new Vector(percentage / 100, 1);

        if (percentage > 50) {
            this.healthRect.color = Color.Green;

        } else if (percentage > 20) {
            this.healthRect.color = Color.Yellow;
            console.log("Geel");
        } else {
            this.healthRect.color = Color.Red;
            console.log("Rood");
        }
    }

    updateScore(score) {
        this.label.text = `Score: ${score}`;
    }

    reduceHealth() {
        this.setHealth(50); // de health is nu 50%
    }

    showGameOver() {

        this.gameOverLabel = new Label({
            text: "Game Over",
            pos: new Vector(500, 300),
            font: new Font({
                family: 'Arial',
                size: 60,
                color: Color.Red,
                weight: 'bold'
            })
        });
        this.addChild(this.gameOverLabel);


        // Maak een HTML knop aan
        let btn = document.createElement("button");
        btn.innerText = "Restart";
        btn.style.position = "absolute";
        btn.style.left = "50%";
        btn.style.top = "60%";
        btn.style.transform = "translate(-50%, -50%)";
        btn.style.fontSize = "2rem";
        btn.id = "restart-btn";
        document.body.appendChild(btn);

        btn.onclick = () => {
            btn.remove();
            if (this.gameOverLabel) this.gameOverLabel.kill();
            // Start de game opnieuw
            if (this.scene && this.scene.engine && typeof this.scene.engine.startGame === "function") {
                this.scene.engine.startGame();
            }
        };
    }
}
