import {ExampleApp} from "../ExampleApp";
import {Sprite, BorderCheck, Rectangle, debugEnabled} from "../../src/Base";
import {Panel} from "../../src/Panel";
import * as Canvas from  "../../src/Canvas";
import {CanvasSATCollisionChecker as SATCollisionChecker} from "../../src/CanvasSATCollisionChecker";

class Example4App extends ExampleApp
{
    private sprites: Canvas.CanvasSprite[] = [];
    private bounds: Panel;

    constructor()
    {
        super("Collision Detection with SAT");

        debugEnabled(true);
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
            var spriteSheet = new Canvas.SpriteSheet(img);

            var frames = spriteSheet.getAnimationFrames(32, 32, 2, 4, 0, 0);
            let s = new Canvas.AnimatedSprite(frames, 24);
            this.sprites.push(s);
            s.moveTo(100, 10);
            s.collisionChecker = new SATCollisionChecker(s, new SAT.Circle(new SAT.Vector(0, 0), 16));
            this.setRandomVelocity(s);

            frames = spriteSheet.getAnimationFrames(32, 32, 2, 4, 0, 64);
            s = new Canvas.AnimatedSprite(frames, 12);
            this.sprites.push(s);
            s.moveTo(10, 100);
            s.collisionChecker = new SATCollisionChecker(s, new SAT.Circle(new SAT.Vector(0, 0), 16));
            this.setRandomVelocity(s);

            frames = spriteSheet.getAnimationFrames(32, 32, 2, 4, 0, 0);
            s = new Canvas.AnimatedSprite(frames, 12);
            this.sprites.push(s);
            s.moveTo(10, 180);
            s.collisionChecker = new SATCollisionChecker(s, [new SAT.Vector(16, 0), new SAT.Vector(32, 16), new SAT.Vector(16, 32), new SAT.Vector(0, 16)]);
            this.setRandomVelocity(s);

            frames = spriteSheet.getAnimationFrames(32, 32, 2, 4, 0, 64);
            s = new Canvas.AnimatedSprite(frames, 12);
            this.sprites.push(s);
            s.moveTo(180, 10);
            s.collisionChecker = new SATCollisionChecker(s, [new SAT.Vector(16, 0), new SAT.Vector(32, 16), new SAT.Vector(16, 32), new SAT.Vector(0, 16)]);
            this.setRandomVelocity(s);

            super.start();
        }
    }

    /** @override */
    update(dt: number)
    {
        for (let i = 0; i < this.sprites.length; i++)
        {
            let s1 = this.sprites[i];
            for (let j = i + 1; j < this.sprites.length; j++)
            {
                let s2 = this.sprites[j];
                // Check sprite collision
                if (s1.intersects(s2))
                {
                    this.bounceSprite(s1, s2);
                    this.bounceSprite(s2, s1);
                    // This will prevent sticking
                    s1.update(dt);
                    s2.update(dt);
                }
            }
        }

        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.sprites.forEach(s =>
        {
            s.update(dt);
            this.checkBounds(s)
            s.draw(this.context);
        });

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
    private checkBounds(sprite: Sprite): Example4App
    {
        var borders = this.bounds.restrictBounds(sprite);
        if (borders)
        {
            if (BorderCheck.leftOrRight(borders))
            {
                sprite.vx *= -1;
            }
            if (BorderCheck.topOrBottom(borders))
            {
                sprite.vy *= -1;
            }
        }
        return this;
    }
}

new Example4App().start();
