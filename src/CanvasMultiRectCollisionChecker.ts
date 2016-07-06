import {MultiRectCollisionChecker} from "./MultiRectCollisionChecker";
import {ICanvasCollisionChecker} from "./Canvas";
import {Sprite, Rectangle} from "./Base";

/**
 * A MultiRectCollisionChecker that draws its collision areas
 */
export class CanvasMultiRectCollisionChecker extends MultiRectCollisionChecker implements ICanvasCollisionChecker
{
    constructor(protected sprite: Sprite, colAreas?: Rectangle[])
    {
        super(sprite, colAreas);
    }

    public draw(context: CanvasRenderingContext2D): void
    {
        context.strokeStyle = "red";
        this.colAreas.forEach(area =>
        {
            context.strokeRect(
                this.sprite.x + area.x,
                this.sprite.y + area.y,
                area.w,
                area.h);
        });
    }
}
