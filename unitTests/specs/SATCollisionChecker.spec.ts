import {Sprite} from "../../src/Base";
import {SATCollisionChecker} from "../../src/SATCollisionChecker";

describe("SATCollisionChecker", () =>
{
    describe("Circle to Circle", () =>
    {
        let s1 = new Sprite(100, 100);
        s1.collisionChecker = new SATCollisionChecker(s1, new SAT.Circle(new SAT.Vector(50, 50), 50));
        let s2 = new Sprite(100, 100);
        s2.collisionChecker = new SATCollisionChecker(s2, new SAT.Circle(new SAT.Vector(50, 50), 50));

        describe("When intersect", () =>
        {
            beforeAll(() => 
            {
                s1.moveTo(100, 100);
                s2.moveTo(150, 150);
            });
            it("first should intersect second", () => expect(s1.intersects(s2)).toBeTruthy());
            it("second should intersect first", () => expect(s2.intersects(s1)).toBeTruthy());
        });

        describe("When don't intersect", () =>
        {
            beforeAll(() => 
            {
                s1.moveTo(0, 0);
                s2.moveTo(150, 150);
            });
            it("first should not intersect second", () => expect(s1.intersects(s2)).toBeFalsy());
            it("second should not intersect first", () => expect(s2.intersects(s1)).toBeFalsy());
        });

        describe("When don't intersect but bounding rects do", () =>
        {
            beforeAll(() => 
            {
                s1.moveTo(60, 60);
                s2.moveTo(150, 150);
            });
            it("first should not intersect second", () => expect(s1.intersects(s2)).toBeFalsy());
            it("second should not intersect first", () => expect(s2.intersects(s1)).toBeFalsy());
        });
    });

    describe("Circle to Polygon", () =>
    {
        let s1 = new Sprite(100, 100);
        s1.collisionChecker = new SATCollisionChecker(s1, new SAT.Circle(new SAT.Vector(50, 50), 50));
        let s2 = new Sprite(100, 100);
        s2.collisionChecker = new SATCollisionChecker(s2, [new SAT.Vector(50, 0), new SAT.Vector(100, 50), new SAT.Vector(50, 100), new SAT.Vector(0, 50)]);

        describe("When intersect", () =>
        {
            beforeAll(() => 
            {
                s1.moveTo(100, 100);
                s2.moveTo(150, 150);
            });
            it("first should intersect second", () => expect(s1.intersects(s2)).toBeTruthy());
            it("second should intersect first", () => expect(s2.intersects(s1)).toBeTruthy());
        });

        describe("When don't intersect", () =>
        {
            beforeAll(() => 
            {
                s1.moveTo(0, 0);
                s2.moveTo(150, 150);
            });
            it("first should not intersect second", () => expect(s1.intersects(s2)).toBeFalsy());
            it("second should not intersect first", () => expect(s2.intersects(s1)).toBeFalsy());
        });

        describe("When don't intersect but bounding rects do", () =>
        {
            beforeAll(() => 
            {
                s1.moveTo(60, 60);
                s2.moveTo(150, 150);
            });
            it("first should not intersect second", () => expect(s1.intersects(s2)).toBeFalsy());
            it("second should not intersect first", () => expect(s2.intersects(s1)).toBeFalsy());
        });
    });

    describe("Polygon to Polygon", () =>
    {
        let s1 = new Sprite(100, 100);
        s1.collisionChecker = new SATCollisionChecker(s1, [new SAT.Vector(50, 0), new SAT.Vector(100, 50), new SAT.Vector(50, 100), new SAT.Vector(0, 50)]);
        let s2 = new Sprite(100, 100);
        s2.collisionChecker = new SATCollisionChecker(s2, [new SAT.Vector(50, 0), new SAT.Vector(100, 50), new SAT.Vector(50, 100), new SAT.Vector(0, 50)]);

        describe("When intersect", () =>
        {
            beforeAll(() => 
            {
                s1.moveTo(100, 150);
                s2.moveTo(150, 150);
            });
            it("first should intersect second", () => expect(s1.intersects(s2)).toBeTruthy());
            it("second should intersect first", () => expect(s2.intersects(s1)).toBeTruthy());
        });

        describe("When don't intersect", () =>
        {
            beforeAll(() => 
            {
                s1.moveTo(0, 0);
                s2.moveTo(150, 150);
            });
            it("first should not intersect second", () => expect(s1.intersects(s2)).toBeFalsy());
            it("second should not intersect first", () => expect(s2.intersects(s1)).toBeFalsy());
        });

        describe("When don't intersect but bounding rects do", () =>
        {
            beforeAll(() => 
            {
                s1.moveTo(60, 60);
                s2.moveTo(150, 150);
            });
            it("first should not intersect second", () => expect(s1.intersects(s2)).toBeFalsy());
            it("second should not intersect first", () => expect(s2.intersects(s1)).toBeFalsy());
        });
    });
});