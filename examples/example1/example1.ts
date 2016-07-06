import {ExampleApp} from "../ExampleApp";
import * as Canvas from  "../../src/Canvas";

class Example1App extends ExampleApp
{
    private sprite: Canvas.CanvasSprite;

    constructor()
    {
        super("Simple Canvas Sprite");

        this.sprite = new Canvas.CanvasSprite(
            (context, x, y, w, h) =>
            {
                var r = w / 2;
                context.fillStyle = "Blue";
                context.beginPath();
                context.arc(x + r, y + r, r, 0, 2 * Math.PI);
                context.fill();
            }
            , 32, 32);

        this.sprite.moveTo(10, 10);

        this.setRandomVelocity(this.sprite);
    }

    /** @override */
    update(dt: number)
    {
        this.sprite.update(dt);

        if (this.sprite.right >= this.canvas.width || this.sprite.left <= 0)
        {
            this.sprite.vx *= -1;
        }
        if (this.sprite.bottom >= this.canvas.height || this.sprite.top <= 0)
        {
            this.sprite.vy *= -1;
        }

        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.sprite.draw(this.context);

        super.update(dt);
    }
}

new Example1App().start();
