import {ExampleApp} from "../ExampleApp";
import * as Canvas from  "../../src/Canvas";


class Example2App extends ExampleApp
{
    private sprite: Canvas.CanvasSprite;

    constructor()
    {
        super("Image Sprite");
    }

    /** @override */
    public start()
    {
        var img = new Image();
        img.src = "images/ball.png";
        img.onload = () =>
        {
            // The size will be set to the size of the image
            this.sprite = new Canvas.ImageSprite(img);
            this.sprite.moveTo(10, 10);
            this.setRandomVelocity(this.sprite);
            super.start();
        }
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

new Example2App().start();
