import {Sprite} from "./Base";
import {SATCollisionChecker} from "./SATCollisionChecker";
import {ICanvasCollisionChecker} from "./Canvas";

/**
 * A CanvasSATCollisionChecker that draws its collision area
 */
export class CanvasSATCollisionChecker extends SATCollisionChecker implements ICanvasCollisionChecker
{
    constructor(sprite: Sprite, circle: SAT.Circle);
    constructor(sprite: Sprite, polygon: SAT.Polygon);
    constructor(sprite: Sprite, points: SAT.Vector[]);
    constructor(sprite: Sprite, shapeOrPoints: any)
    {
        super(sprite, shapeOrPoints);
    }

    public draw(context: CanvasRenderingContext2D): void
    {
        context.strokeStyle = "red";
        context.lineWidth = 1;

        let x = this.sprite.x;
        let y = this.sprite.y;

        if (this.shape instanceof SAT.Circle)
        {
            if (this.offset)
            {
                x += this.offset.x / 2;
                y += this.offset.y / 2;
            }
            context.beginPath();
            context.arc(x + this.sprite.w / 2, y + this.sprite.h / 2, (<SAT.Circle>this.shape).r, 0, 2 * Math.PI);
            context.stroke();
        }
        else
        {
            if (this.offset)
            {
                x += this.offset.x;
                y += this.offset.y;
            }
            context.beginPath();
            (<SAT.Polygon>this.shape).points.forEach(point =>
            {
                context.lineTo(x + point.x, y + point.y);
            });
            context.closePath();
            context.stroke();
        }
    }
}