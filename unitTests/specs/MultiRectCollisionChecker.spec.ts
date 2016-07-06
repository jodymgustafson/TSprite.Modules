import {Sprite} from "../../src/Base";
import {MultiRectCollisionChecker} from "../../src/MultiRectCollisionChecker";

describe("MultiRectCollisionChecker", () =>
{
    describe("Single collision area", () =>
    {
        var s1 = new Sprite(100, 100);
        let checker = s1.collisionChecker = new MultiRectCollisionChecker(s1);
        checker.addCollisionArea(10, 0, 80, 100);
        var s2 = new Sprite(100, 100);

        describe("when one sprite has a collision area should intersects", () =>
        {
            beforeAll(() =>
            {
                s1.moveTo(100, 100);
                s2.moveTo(150, 150);
            });
            it("first should intersect second", () => expect(s1.intersects(s2)).toBeTruthy());
            it("second should intersect first", () => expect(s2.intersects(s1)).toBeTruthy());
        });

        describe("when both sprites have a collision area should intersects", () =>
        {
            beforeAll(() =>
            {
                let s2Checker = s2.collisionChecker = new MultiRectCollisionChecker(s2);
                s2Checker.addCollisionArea(10, 0, 80, 100);
            });
            it("first should intersect second", () => expect(s1.intersects(s2)).toBeTruthy());
            it("second should intersect first", () => expect(s2.intersects(s1)).toBeTruthy());
        });

        describe("when both sprites have a collision area should NOT intersects", () =>
        {
            beforeAll(() =>
            {
                s2.moveTo(200, 200);
            });
            it("first should NOT intersect second", () => expect(s1.intersects(s2)).toBeFalsy());
            it("second should NOT intersect first", () => expect(s2.intersects(s1)).toBeFalsy());
        });

        describe("when move back into collision area should intersects", () =>
        {
            beforeAll(() =>
            {
                s2.moveTo(170, 170);
            });
            it("first should intersect second", () => expect(s1.intersects(s2)).toBeTruthy());
            it("second should intersect first", () => expect(s2.intersects(s1)).toBeTruthy());
        });
    });

    describe("Multiple collision areas", () =>
    {
        var s1 = new Sprite(100, 100);
        var s1Checker = s1.collisionChecker = new MultiRectCollisionChecker(s1);
        s1Checker.addCollisionArea(0, 0, 50, 50)
            .addCollisionArea(50, 50, 50, 50);

        var s2 = new Sprite(100, 100);
        var s2Checker = s2.collisionChecker = new MultiRectCollisionChecker(s2);
        s2Checker.addCollisionArea(0, 0, 50, 50)
            .addCollisionArea(50, 50, 50, 50);

        describe("when first area doesn't intersect", () =>
        {
            beforeAll(() =>
            {
                s2.moveTo(550, 550);
            });
            it("first should not intersect second", () => expect(s1.intersects(s2)).toBeFalsy());
            it("second should not intersect first", () => expect(s2.intersects(s1)).toBeFalsy());
        });

        describe("when first area intersects", () =>
        {
            beforeAll(() =>
            {
                s1.moveTo(100, 100);
                s2.moveTo(150, 150);
            });
            it("first should intersect second", () => expect(s1.intersects(s2)).toBeTruthy());
            it("second should intersect first", () => expect(s2.intersects(s1)).toBeTruthy());
        });

        describe("when second area intersects", () =>
        {
            beforeAll(() =>
            {
                s2.moveTo(149, 100);
            });
            it("first should intersect second", () => expect(s1.intersects(s2)).toBeTruthy());
            it("second should intersect first", () => expect(s2.intersects(s1)).toBeTruthy());
        });

        describe("when third area intersects", () =>
        {
            beforeAll(() =>
            {
                s2.moveTo(51, 100);
            });
            it("first should intersect second", () => expect(s1.intersects(s2)).toBeTruthy());
            it("second should intersect first", () => expect(s2.intersects(s1)).toBeTruthy());
        });

        describe("when no areas intersect", () =>
        {
            beforeAll(() =>
            {
                s2.moveTo(5, 100);
            });
            it("first should NOT intersect second", () => expect(s1.intersects(s2)).toBeFalsy());
            it("second should NOT intersect first", () => expect(s2.intersects(s1)).toBeFalsy());
        });
    });
});