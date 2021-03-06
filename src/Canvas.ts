import {Sprite, debugEnabled, ICollisionChecker, Rectangle} from "./Base";

/**
* Sprite objects that are drawn on a canvas
* @author JM Gustafson
* @version 1.00
*/

///////////////////////////////////////////////////////////////////////
/** Interface for an object that can be drawn on a canvas */
export interface IDrawable
{
    /**
    * @param context The canvas context to draw on
    * @param x x-pos to draw at
    * @param y y-pos to draw at
    * @param w Width to draw it
    * @param h Height to draw it
    */
    draw(context: CanvasRenderingContext2D, x: number, y: number, w: number, h: number);

    getWidth(): number;
    getHeight(): number;
}

interface DrawableFunction
{
    (context: CanvasRenderingContext2D, x: number, y: number, w: number, h: number): any;
}

///////////////////////////////////////////////////////////////////////
/** Implements a drawable image that is extracted from a spritesheet */
export class SpriteSheetImage implements IDrawable
{
    /**
    * @param image - The sprite sheet image
    * @param x X offset of the image in the sprite sheet
    * @param y Y offset of the image in the sprite sheet
    * @param w Width of the image in the sprite sheet
    * @param h Height of the image in the sprite sheet
    */
    constructor(public image: HTMLImageElement, public x: number, public y: number, public w: number, public h: number)
    {
    }

    /**
    * @param context CanvasRenderingContext2D to draw on
    * @param x X position to draw at
    * @param y Y position to draw at
    * @param w (optional) If not specified uses the image's width
    * @param h (optional) If not specified uses the image's height
    */
    public draw(context: CanvasRenderingContext2D, x: number, y: number, w?: number, h?: number): SpriteSheetImage
    {
        context.drawImage(this.image,
            // Set offset and size within sprite sheet
            this.x, this.y, this.w, this.h,
            // Set position to draw image at and size to draw it
            x, y,
            w || this.w, h || this.h);
        return this;
    }

    public getWidth(): number
    {
        return this.w;
    }
    public getHeight(): number
    {
        return this.h;
    }
}

export interface IAnimationFrames extends IDrawable
{
    /** Moves to the next frame */
    next(): IAnimationFrames;
    /** Gets the current frame index */
    index: number;
}

///////////////////////////////////////////////////////////////////////
/** Implements a drawable object containting animation frames from images arranged in a grid */
export class ImageAnimationFrames implements IAnimationFrames
{
    private frameIdx = 0;
    private frames: SpriteSheetImage[] = [];

    /**
        * @param image An HTML image
        * @param frameW Width of each animation frame
        * @param frameH Height of each animation frame
        * @param rows (optional) Number of rows in the grid
        * @param cols (optional) Number of columns in the grid
        * @param xoff (optional) X location of the first frame in the sheet
        * @param yoff (optional) Y location of the first frame in the sheet
    */
    constructor(private image: HTMLImageElement, frameW: number, frameH: number, rows?: number, cols?: number, xoff?: number, yoff?: number)
    {
        cols = cols || Math.floor(this.image.width / frameW);
        rows = rows || Math.floor(this.image.height / frameH);
        xoff = xoff || 0;
        yoff = yoff || 0;

        // Get location of each frame in the sheet
        for (var r = 0; r < rows; r++)
        {
            for (var c = 0; c < cols; c++)
            {
                this.frames.push(new SpriteSheetImage(
                    this.image,
                    c * frameW + xoff,
                    r * frameH + yoff,
                    frameW,
                    frameH
                    ));
            }
        }
    }

    public get index(): number
    {
        return this.frameIdx;
    }

    /** Gets the current frame */
    public get currentFrame(): SpriteSheetImage
    {
        return this.frames[this.frameIdx];
    }
    /** Moves to the next frame **/
    public next(): ImageAnimationFrames
    {
        this.frameIdx = (++this.frameIdx % this.frames.length);
        return this;
    }
    /** Moves to the previous frame */
    public prev(): ImageAnimationFrames
    {
        this.frameIdx = (--this.frameIdx < 0 ? this.frames.length - 1 : this.frameIdx);
        return this;
    }
    /** Moves to the specified frame */
    public moveTo(frame: number): ImageAnimationFrames
    {
        this.frameIdx = Math.min(Math.max(frame, 0), this.frames.length - 1);
        return this;
    }

    /** Draws the current animation frame at the specified location and optional size */
    public draw(context: CanvasRenderingContext2D, x: number, y: number, w?: number, h?: number): ImageAnimationFrames
    {
        var frame = this.currentFrame;
        context.drawImage(this.image,
            frame.x, frame.y, frame.w, frame.h,
            // Set position to draw image at and size to draw it
            x, y,
            w || frame.w, h || frame.h);
        return this;
    }

    public getWidth(): number
    {
        return this.currentFrame.w;
    }
    public getHeight(): number
    {
        return this.currentFrame.h;
    }
}

///////////////////////////////////////////////////////////////////////
/** Implements a sprite sheet to get multiple sprite images from one image */
export class SpriteSheet
{
    /** @param image An HTML Image object */
    constructor(private image: HTMLImageElement)
    {
    }

    /** Gets the entire sprite sheet image */
    public getImage(): SpriteSheetImage;
    /** Gets an image from the sheet at the specified offset with the specified size
        * @param x X offset of the image in the sheet
        * @param y Y offset of the image in the sheet
        * @param w The width of the image
        * @param h The height of the image
        */
    public getImage(x: number, y: number, w: number, h: number): SpriteSheetImage;
    public getImage(x?: number, y?: number, w?: number, h?: number): SpriteSheetImage
    {
        return new SpriteSheetImage(this.image,
            x || 0,
            y || 0,
            w || this.image.width,
            h || this.image.height);
    }

    /**
        * Gets animation frames from images inside the sprite sheet arranged in a grid
        * @param frameW Width of each animation frame
        * @param frameH Height of each animation frame
        * @param rows (optional) Number of rows in the grid
        * @param cols (optional) Number of columns in the grid
        * @param xoff (optional) X location of the first frame in the sheet
        * @param yoff (optional) Y location of the first frame in the sheet
        */
    public getAnimationFrames(frameW: number, frameH: number, rows?: number, cols?: number, xoff?: number, yoff?: number): ImageAnimationFrames
    {
        // Create an instance of an AnimationFrames object
        var animFrames = new ImageAnimationFrames(this.image, frameW, frameH, rows, cols, xoff, yoff);
        return animFrames;
    }
}

export interface ICanvasCollisionChecker extends ICollisionChecker
{
    draw(context: CanvasRenderingContext2D): void;
}

///////////////////////////////////////////////////////////////////////
/** Implements a sprite that is drawn to a canvas using a drawable object */
export class CanvasSprite extends Sprite
{
    protected _drawable: IDrawable;

    /** Creates a sprite with no IDrawable object, for custom subclasses */
    constructor(w?: number, h?: number);
    /** Creates a sprite using a IDrawable object */
    constructor(drawable: IDrawable, w?: number, h?: number);
    /** Creates a sprite using a draw function */
    constructor(drawFn: DrawableFunction, w: number, h: number);
    /** The constructor */
    constructor(drawableOrW?: any, wOrH?: number, h?: number)
    {
        super();

        if (drawableOrW)
        {
            if (typeof drawableOrW === "function")
            {
                // Create a drawable object using the drawable function
                this._drawable = {
                    draw: drawableOrW,
                    getWidth: () => wOrH,
                    getHeight: () => h
                };
                this.w = wOrH;
                this.h = h;
            }
            else
            {
                // Must be IDrawable
                this._drawable = drawableOrW;
                if (wOrH || h)
                {
                    this.w = wOrH;
                    this.h = h;
                }
                else
                {
                    // Set from drawable object
                    this.w = this._drawable.getWidth();
                    this.h = this._drawable.getHeight();
                }
            }
        }
        else
        {
            // Only passed in width and height (maybe)
            this.w = drawableOrW;
            this.h = wOrH;
        }
    }

    /**
        * Draws the sprite on the context if it is visible.
        * Overrides should call super.draw() to get collision area drawing in debug mode.
        */
    public draw(context: CanvasRenderingContext2D): CanvasSprite
    {
        if (this.visible)
        {
            if (this._drawable)
            {
                this._drawable.draw(context, this.x, this.y, this.w, this.h);
            }
            if (debugEnabled())
            {
                this.drawCollisionAreas(context);
            }
        }
        return this;
    }

    /** @override */
    public update(dt: number): CanvasSprite
    {
        super.update(dt);
        return this;
    }

    /** Scales the sprite by the amount specified */
    public scale(amount: number): CanvasSprite;
    /** Scales the sprite by different x and y amounts */
    public scale(xAmount: number, yAmount: number): CanvasSprite;
    public scale(amount: number, yAmount?: number): CanvasSprite
    {
        this.w *= amount;
        this.h *= (yAmount || amount);
        return this;
    }

    /** Used for debugging to draw the collision areas of the sprite.
    * The outer bounds of the sprite is drawn as green.
    * If there are collision areas defined they are drawn as red.
    */
    public drawCollisionAreas(context: CanvasRenderingContext2D): void
    {
        context.save();
        // Draw rect bounds
        context.strokeStyle = "green";
        context.strokeRect(this.x, this.y, this.w, this.h);
        if (this.collisionChecker && this.collisionChecker["draw"])
        {
            this.collisionChecker["draw"](context);
        }
        context.restore();
    }
}

///////////////////////////////////////////////////////////////////////
/**
    * Implements a sprite that is an image drawn to a canvas
    */
export class ImageSprite extends CanvasSprite
{
    /**
    * @param image An HTML image element
    * @param w Set to width of the image by default
    * @param h Set to height of the image by default
    */
    constructor(image: HTMLImageElement, w?: number, h?: number)
    {
        super(// Define an IDrawable that draws the image
            (context: CanvasRenderingContext2D, xi: number, yi: number, wi: number, hi: number) =>
                {
                    context.drawImage(image, xi, yi, wi, hi);
                },
            w || image.width,
            h || image.height);
    }
}

///////////////////////////////////////////////////////////////////////
/**
    * Implements a sprite that is a series of images drawn to a canvas
    */
export class AnimatedSprite extends CanvasSprite
{
    private msPerFrame = 0;
    private time = 0;

    /**
    * @param animFrames The animation frames to use for the sprite
    * @param fps Frames per second
    */
    constructor(public animFrames: IAnimationFrames, public fps: number)
    {
        super(animFrames, animFrames.getWidth(), animFrames.getHeight());

        // Keeps track of when to change image
        this.msPerFrame = (1000 / this.fps);
    }

    /** @override */
    public update(dt: number): AnimatedSprite
    {
        if (this.active)
        {
            super.update(dt);

            this.time += dt;
            if (this.time >= this.msPerFrame)
            {
                if (this.time >= 2 * this.msPerFrame)
                {
                    // If we get too far behind then reset the timer (probably stuck in debugger)
                    this.time = 0;
                }
                else
                {
                    this.time -= this.msPerFrame;
                }
                this.animFrames.next();
            }
        }
        return this;
    }
}
