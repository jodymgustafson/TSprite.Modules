/// <reference path="../scripts/typings/sat.d.ts" />
import {IPoint, Sprite, ICollisionChecker} from "./Base";

function updateCircle(sprite: Sprite, circle: SAT.Circle): void
{
    circle.pos.x = sprite.x + sprite.w / 2;
    circle.pos.y = sprite.y + sprite.h / 2;
}

function updatePolygon(sprite: Sprite, polygon: SAT.Polygon): void
{
    polygon.pos.x = sprite.x;
    polygon.pos.y = sprite.y;
}

/**
 * Separating axis theorem collision checker
 * Requires SAT.js
 */
export class SATCollisionChecker implements ICollisionChecker
{
    protected shape: SAT.Circle | SAT.Polygon
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

    public intersects(otherSprite: Sprite): boolean
    {
        let otherShape = (<SATCollisionChecker>otherSprite.collisionChecker).shape;

        if (this.shape instanceof SAT.Circle)
        {
            updateCircle(this.sprite, <SAT.Circle>this.shape);
            if (otherShape instanceof SAT.Circle)
            {
                updateCircle(otherSprite, otherShape);
                return SAT.testCircleCircle(<SAT.Circle>this.shape, otherShape, this.response);
            }
            else
            {
                updatePolygon(otherSprite, otherShape);
                return SAT.testCirclePolygon(<SAT.Circle>this.shape, otherShape, this.response);
            }
        }
        else // this.shape instanceof SAT.Polygon
        {
            updatePolygon(this.sprite, <SAT.Polygon>this.shape);
            if (otherShape instanceof SAT.Circle)
            {
                updateCircle(otherSprite, otherShape);
                return SAT.testPolygonCircle(<SAT.Polygon>this.shape, otherShape, this.response);
            }
            else
            {
                updatePolygon(otherSprite, otherShape);
                return SAT.testPolygonPolygon(<SAT.Polygon>this.shape, otherShape, this.response);
            }
        }
    }
}