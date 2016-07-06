import {ICollisionChecker, Rectangle, Sprite} from "./Base";

export class MultiRectCollisionChecker implements ICollisionChecker
{
    constructor(protected sprite: Sprite, protected colAreas: Rectangle[] = [])
    {
        this.colAreas = colAreas;
    }

    public get colAreaCount(): number
    {
        return this.colAreas.length;
    }

    /** Adds a collision area to be used to check for collisions */
    public addCollisionArea(x: number, y: number, w: number, h: number): MultiRectCollisionChecker
    {
        var rect = new Rectangle(w, h).moveTo(x, y);
        this.colAreas.push(rect);
        return this;
    }

    public intersects(otherSprite: Sprite): boolean
    {
        if (this.checkCollisionAreas(otherSprite)) return true;
        if (otherSprite.collisionChecker instanceof MultiRectCollisionChecker)
        {
            return (<MultiRectCollisionChecker>otherSprite.collisionChecker).checkCollisionAreas(this.sprite);
        }
    }

    /**
    * Checks collisions areas of two sprites
    * @param otherSprite The other sprite
    */
    private checkCollisionAreas(otherSprite: Sprite): boolean
    {
        for (let i = 0; i < this.colAreas.length; i++)
        {
            var thisArea = this.getCollisionArea(i);

            if (otherSprite.collisionChecker instanceof MultiRectCollisionChecker)
            {
                let otherChecker = <MultiRectCollisionChecker>otherSprite.collisionChecker;
                // Check against other sprite's collision areas
                for (let j = 0; j < otherChecker.colAreaCount; j++)
                {
                    if (thisArea.intersects(otherChecker.getCollisionArea(j))) return true;
                }
            }
            else
            {
                // Check against other sprite's outer bounds
                if (thisArea.intersects(otherSprite)) return true;
            }
        }

        return false;
    }

    /**
    * Get a collision area with offsets applied
    * @param idx Index of the collision area
    */
    public getCollisionArea(idx: number): Rectangle
    {
        var collArea = this.colAreas[idx];
        var rect = new Rectangle(collArea.w, collArea.h);
        rect.moveTo(this.sprite.x + collArea.x, this.sprite.y + collArea.y);
        return rect;
    }
}