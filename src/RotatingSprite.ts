import * as Canvas from "./Canvas";

/**
 * Implements an image sprite that rotates about its center
 */
export class RotatingSprite extends Canvas.CanvasSprite
{
    // Radians per ms to rotate
    private rpms: number;
    // Current rotation amount
    private radians = 0;

    /**
     * Creates an image sprite that rotates about its center
     * @param image The sprite image
     * @param rps Rotations per second. Positive number to rotate clockwise.
     * @param w Optional width
     * @param h Optional height
     */
    constructor(image: Canvas.SpriteSheetImage, rps: number, w?: number, h?: number)
    {
        super(
            (context: CanvasRenderingContext2D, xi: number, yi: number, wi: number, hi: number) =>
            {
                context.save();
                // Move to where we want to draw the image
                context.translate(xi, yi);
                context.rotate(this.radians);
                // Draw image at its center
                var cx = (wi / 2);
                var cy = (hi / 2);
                image.draw(context, -cx, -cy, wi, hi);
                context.restore();
            },
            w || image.w,
            h || image.h);

        // convert rotations/sec to radians/ms
        this.rpms = (rps * Math.PI * 2) / 1000;
    }

    /** @override */
    public update(dt: number): RotatingSprite
    {
        if (this.active)
        {
            super.update(dt);

            this.radians += dt * this.rpms;
        }

        return this;
    }
}