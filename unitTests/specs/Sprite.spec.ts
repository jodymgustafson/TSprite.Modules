﻿import {BorderFlags, Sprite} from "../../src/Base";

describe("Sprite", () =>
{
    describe("Sprite collisions", () =>
    {
        var s1 = new Sprite(100, 100);
        var s2 = new Sprite(100, 100);

        describe("when sprites intersect", () =>
        {
            beforeAll(() =>
            {
                s1.moveTo(0, 0);
                s2.moveTo(50, 50);
            });
            it("first should intersect second", () => expect(s1.intersects(s2)).toBeTruthy());
            it("second should intersect first", () => expect(s2.intersects(s1)).toBeTruthy());
        });
        describe("when sprites don't intersect", () =>
        {
            beforeAll(() =>
            {
                s1.moveTo(0, 0);
                s2.moveTo(100, 100);
            });
            it("first should not intersect second", () => expect(s1.intersects(s2)).toBeFalsy());
            it("second should not intersect first", () => expect(s2.intersects(s1)).toBeFalsy());
        });
    });

    describe("Border intersections", () =>
    {
        var s1 = new Sprite(100, 100);
        var s2 = new Sprite(100, 100);

        describe("when sprites intersect", () =>
        {
            beforeAll(() =>
            {
                s1.moveTo(0, 0);
                s2.moveTo(50, 50);
            });
            it("first should intersect second bottom right", () => expect(s1.intersectsBorders(s2)).toBe(BorderFlags.BOTTOM | BorderFlags.RIGHT));
            it("second should intersect first top left", () => expect(s2.intersectsBorders(s1)).toBe(BorderFlags.TOP | BorderFlags.LEFT));
        });

        describe("when sprites don't intersect", () =>
        {
            beforeAll(() => s2.moveTo(100, 100));
            it("should not hit any border", () => expect(s2.intersectsBorders(s1)).toBe(BorderFlags.NONE));
        });
    });

    describe("Velocity", () =>
    {
        var s1 = new Sprite(100, 100, 10, 5);
        s1.moveTo(100, 100);

        describe("when update 0ms", () =>
        {
            beforeAll(() =>
            {
                s1.update(0);
            });
            it("x-pos should not change", () => expect(s1.x).toBe(100));
            it("y-pos should not change", () => expect(s1.y).toBe(100));
        });

        describe("when update 1000ms", () =>
        {
            beforeAll(() =>
            {
                s1.update(1000);
            });
            it("x-pos should change", () => expect(s1.x).toBe(110));
            it("y-pos should change", () => expect(s1.y).toBe(105));
        });

        describe("when change velocity update 1000ms", () =>
        {
            beforeAll(() =>
            {
                s1.setVelocity(5, 10);
                s1.update(1000);
            });
            it("x-pos should change", () => expect(s1.x).toBe(115));
            it("y-pos should change", () => expect(s1.y).toBe(115));
        });

        describe("when update sprite not active", () =>
        {
            beforeAll(() =>
            {
                s1.active = false;
                s1.update(1000);
            });
            it("x-pos should not change", () => expect(s1.x).toBe(115));
            it("y-pos should not change", () => expect(s1.y).toBe(115));
        });
    });

    describe("Contains", () =>
    {
        var s1 = new Sprite(100, 100)
        s1.moveTo(100, 100);
        describe("when check if sprite contains a point", () =>
        {
            it("should contain point", () => expect(s1.contains(150, 150)).toBeTruthy());
            it("should NOT contain point", () => expect(s1.contains(50, 50)).toBeFalsy());
        });
    });


});
