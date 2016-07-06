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

        if (this.shape instanceof SAT.Circle)
        {
            context.beginPath();
            context.arc(this.sprite.x + this.sprite.w / 2, this.sprite.y + this.sprite.h / 2, (<SAT.Circle>this.shape).r, 0, 2 * Math.PI);
            context.stroke();
        }
        else
        {
            context.beginPath();
            (<SAT.Polygon>this.shape).points.forEach(point =>
            {
                context.lineTo(this.sprite.x + point.x,this.sprite.y + point.y);
            });
            context.closePath();
            context.stroke();
        }
    }
}