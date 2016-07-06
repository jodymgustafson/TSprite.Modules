import {ExampleApp} from "../ExampleApp";
import {Sprite, BorderCheck, BorderFlags} from "../../src/Base";
import {Panel} from "../../src/Panel";
import * as Canvas from  "../../src/Canvas";
import {ScrollingPanel, BackgroundStyle} from  "../../src/CanvasPanel";

class Example6App extends ExampleApp
{
    private sprite1: Canvas.CanvasSprite;
    private sprite2: Canvas.CanvasSprite;
    private panels: ScrollingPanel[] = [];
    private bounds: Panel;

    constructor()
    {
        super("Scrolling Background Panels");

        // Create a bounding panel
        this.bounds = new Panel(this.canvas.width, this.canvas.height);
    }

    /** @override */
    public start()
    {
        var img = new Image();
        img.src = "images/sprites.png";
        img.onload = () =>
        {
            // Create sprites
            var spriteSheet = new Canvas.SpriteSheet(img);
            var frames = spriteSheet.getAnimationFrames(32, 32, 2, 4, 0, 0);
            this.sprite1 = new Canvas.AnimatedSprite(frames, 24);
            this.sprite1.moveTo(100, 10);
            this.setRandomVelocity(this.sprite1);

            frames = spriteSheet.getAnimationFrames(32, 32, 2, 4, 0, 64);
            this.sprite2 = new Canvas.AnimatedSprite(frames, 12);
            this.sprite2.moveTo(10, 100);
            this.setRandomVelocity(this.sprite2);

            // Create panels
            var image = spriteSheet.getImage(0, 128, 32, 32);
            this.panels.push(<ScrollingPanel>new ScrollingPanel(this.canvas.width, this.canvas.height, image, 30, 30)
                .setBackgroundColor("Green")
                .setBackgroundStyle(BackgroundStyle.REPEAT));

            this.panels.push(<ScrollingPanel>new ScrollingPanel(this.canvas.width, this.canvas.height / 2, image, -20, -10)
                .setBackgroundColor("Transparent")
                .setBackgroundStyle(BackgroundStyle.REPEAT)
                .moveTo(0, this.canvas.height / 2));

            super.start();
        }
    }

    /** @override */
    update(dt: number)
    {
        this.sprite1.update(dt);
        this.sprite2.update(dt);

        this.checkBounds(this.sprite1).checkBounds(this.sprite2);

        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        // Draw the panels
        this.panels.forEach((panel) => panel.update(dt).draw(this.context));
        // Draw the sprites
        this.sprite1.draw(this.context);
        this.sprite2.draw(this.context);

        if (this.sprite1.intersects(this.sprite2))
        {
            this.bounceSprite(this.sprite1, this.sprite2);
            this.bounceSprite(this.sprite2, this.sprite1);
            // This will prevent sticking
            this.sprite1.update(dt);
            this.sprite2.update(dt);
        }

        super.update(dt);
    }

    /** This will bounce a sprite off another sprite */
    private bounceSprite(sprite: Sprite, otherSprite: Sprite)
    {
        var xdif = Math.abs(sprite.left - otherSprite.left);
        var ydif = Math.abs(sprite.top - otherSprite.top);
        if (xdif >= ydif) sprite.vx *= -1;
        else if (xdif <= ydif) sprite.vy *= -1;
    }

    /** This will bounce the sprite off the walls of the containing panel */
    private checkBounds(sprite: Sprite): Example6App
    {
        var borders = this.bounds.restrictBounds(sprite);
        if (borders)
        {
            if (borders & BorderFlags.LEFTORRIGHT)
            {
                sprite.vx *= -1;
            }
            if (borders & BorderFlags.TOPORBOTTOM)
            {
                sprite.vy *= -1;
            }
        }
        return this;
    }
}

new Example6App().start();
