﻿import {ExampleApp} from "../ExampleApp";
import {Sprite, BorderCheck, BorderFlags} from "../../src/Base";
import {Panel} from "../../src/Panel";
import * as Canvas from  "../../src/Canvas";
import {CanvasPanel, BackgroundStyle} from  "../../src/CanvasPanel";

class Example5App extends ExampleApp
{
    private sprite1: Canvas.CanvasSprite;
    private sprite2: Canvas.CanvasSprite;
    private panels: CanvasPanel[] = [];
    private bounds: Panel;

    constructor()
    {
        super("Canvas Panels");

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
            var ssImage = spriteSheet.getImage(0, 128, 32, 32);
            this.panels.push(new CanvasPanel(160, 50, ssImage)
                .setBackgroundColor("Green")
                .setBackgroundStyle(BackgroundStyle.REPEAT_X));

            this.panels.push(new CanvasPanel(160, 100, ssImage)
                .setBackgroundColor("Orange")
                .setBackgroundStyle(BackgroundStyle.REPEAT_Y)
                .moveTo(0, 50));

            this.panels.push(new CanvasPanel(160, 100, ssImage)
                .setBackgroundColor("Blue")
                .setBackgroundStyle(BackgroundStyle.REPEAT)
                .moveTo(0, 150));

            this.panels.push(new CanvasPanel(160, 100, ssImage)
                .setBackgroundColor("Yellow")
                .setBackgroundStyle(BackgroundStyle.FILL)
                .moveTo(160, 0));

            this.panels.push(new CanvasPanel(160, 100, ssImage)
                .setBackgroundColor("Purple")
                .setBackgroundStyle(BackgroundStyle.NO_REPEAT)
                .moveTo(160, 100));

            // For this panel use the entire HTML image, not the sprite sheet image
            this.panels.push(new CanvasPanel(160, 50, img)
                .setBackgroundColor("Black")
                .setBackgroundStyle(BackgroundStyle.FILL)
                .moveTo(160, 200));

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
        this.panels.forEach((panel) => panel.draw(this.context));
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
    private checkBounds(sprite: Sprite): Example5App
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

new Example5App().start();
