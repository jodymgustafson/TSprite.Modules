import {IPoint, Sprite, ICollisionChecker} from "./Base";

function updateCircle(sprite: Sprite, offset: IPoint, circle: SAT.Circle): void
{
    circle.pos.x = sprite.x + sprite.w / 2;
    circle.pos.y = sprite.y + sprite.h / 2;
    if (offset)
    {
        circle.pos.x += offset.x;
        circle.pos.y += offset.y;
    }
}

function updatePolygon(sprite: Sprite, offset: IPoint, polygon: SAT.Polygon): void
{
    polygon.pos.x = sprite.x;
    polygon.pos.y = sprite.y;
    if (offset)
    {
        polygon.translate(offset.x, offset.y);
    }
}

/**
 * Separating axis theorem collision checker
 * Requires SAT.js
 */
export class SATCollisionChecker implements ICollisionChecker
{
    protected shape: SAT.Circle | SAT.Polygon
    protected offset: IPoint;
    public response = new SAT.Response();

    constructor(sprite: Sprite, circle: SAT.Circle);
    constructor(sprite: Sprite, polygon: SAT.Polygon);
    constructor(sprite: Sprite, points: SAT.Vector[]);
    constructor(protected sprite: Sprite, shapeOrPoints: SAT.Circle | SAT.Polygon | SAT.Vector[])
    {
        if (shapeOrPoints instanceof Array)
        {
            this.shape = new SAT.Polygon(new SAT.Vector(sprite.x, sprite.y), shapeOrPoints);
        }
        else
        {
            this.shape = shapeOrPoints;
        }
    }

    public setOffset(x: number, y: number): SATCollisionChecker
    {
        this.offset = {
            x: x,
            y: y
        };
        return this;
    }

    public intersects(otherSprite: Sprite): boolean
    {
        if (!otherSprite.collisionChecker) return null;

        let otherShape = (<SATCollisionChecker>otherSprite.collisionChecker).shape;
        let otherOffset = (<SATCollisionChecker>otherSprite.collisionChecker).offset;

        if (this.shape instanceof SAT.Circle)
        {
            updateCircle(this.sprite, this.offset, <SAT.Circle>this.shape);
            if (otherShape instanceof SAT.Circle)
            {
                updateCircle(otherSprite, otherOffset, otherShape);
                return SAT.testCircleCircle(<SAT.Circle>this.shape, otherShape, this.response);
            }
            else
            {
                updatePolygon(otherSprite, otherOffset, otherShape);
                return SAT.testCirclePolygon(<SAT.Circle>this.shape, otherShape, this.response);
            }
        }
        else // this.shape instanceof SAT.Polygon
        {
            updatePolygon(this.sprite, this.offset, <SAT.Polygon>this.shape);
            if (otherShape instanceof SAT.Circle)
            {
                updateCircle(otherSprite, otherOffset, otherShape);
                return SAT.testPolygonCircle(<SAT.Polygon>this.shape, otherShape, this.response);
            }
            else
            {
                updatePolygon(otherSprite, otherOffset, otherShape);
                return SAT.testPolygonPolygon(<SAT.Polygon>this.shape, otherShape, this.response);
            }
        }
    }
}