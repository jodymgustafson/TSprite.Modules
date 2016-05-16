import {BorderCheck, BorderFlags, Sprite} from "../../src/Base";
import {Panel} from "../../src/Panel";

describe("Panel", () =>
{
    describe("Bounds checking in panel", () =>
    {
        var s1 = new Sprite(10, 10);
        var p1 = new Panel(100, 100);
        p1.moveTo(10, 10);

        describe("when touch panel bounds", () =>
        {
            beforeAll(() =>
            {
                s1.moveTo(10, 10);
            });
            it("should set top and left flags", () => expect(p1.checkBounds(s1)).toBe(BorderFlags.TOP | BorderFlags.LEFT));
            it("should hit top border", () => expect(BorderCheck.top(p1.checkBounds(s1))).toBeTruthy());
            it("should hit left border", () => expect(BorderCheck.left(p1.checkBounds(s1))).toBeTruthy());
            it("should not hit bottom border", () => expect(BorderCheck.bottom(p1.checkBounds(s1))).toBeFalsy());
            it("should not hit right border", () => expect(BorderCheck.right(p1.checkBounds(s1))).toBeFalsy());
            it("should hit top or bottom border", () => expect(BorderCheck.topOrBottom(p1.checkBounds(s1))).toBeTruthy());
            it("should hit left or right border", () => expect(BorderCheck.leftOrRight(p1.checkBounds(s1))).toBeTruthy());
        });

        describe("when inside panel bounds", () =>
        {
            beforeAll(() =>
            {
                s1.moveTo(50, 50);
            });
            it("should not set border flags", () => expect(p1.checkBounds(s1)).toBe(BorderFlags.NONE));
            it("should not hit top or bottom border", () => expect(BorderCheck.topOrBottom(p1.checkBounds(s1))).toBeFalsy());
            it("should not hit left or right border", () => expect(BorderCheck.leftOrRight(p1.checkBounds(s1))).toBeFalsy());

        });

        describe("when outside panel bounds", () =>
        {
            beforeAll(() =>
            {
                s1.moveTo(150, 150);
            });
            it("should set bottom and right flags", () => expect(p1.checkBounds(s1)).toBe(BorderFlags.BOTTOM | BorderFlags.RIGHT));
            it("should not hit top border", () => expect(BorderCheck.top(p1.checkBounds(s1))).toBeFalsy());
            it("should not hit left border", () => expect(BorderCheck.left(p1.checkBounds(s1))).toBeFalsy());
            it("should hit bottom border", () => expect(BorderCheck.bottom(p1.checkBounds(s1))).toBeTruthy());
            it("should hit right border", () => expect(BorderCheck.right(p1.checkBounds(s1))).toBeTruthy());
            it("should hit top or bottom border", () => expect(BorderCheck.topOrBottom(p1.checkBounds(s1))).toBeTruthy());
            it("should hit left or right border", () => expect(BorderCheck.leftOrRight(p1.checkBounds(s1))).toBeTruthy());

        });
    });

    describe("Restrict sprite in panel bounds", () =>
    {
        var s1 = new Sprite(10, 10);
        var p1 = new Panel(100, 100);
        p1.moveTo(10, 10);

        describe("when sprite leaves bounds", () =>
        {
            let bounds = BorderFlags.NONE;
            beforeAll(() =>
            {
                s1.moveTo(0, 0);
                bounds = p1.restrictBounds(s1);
            });
            it("should restrict x-pos", () => expect(s1.x).toBe(10));
            it("should restrict y-pos", () => expect(s1.x).toBe(10));
            it("should set top and left flags", () => expect(bounds).toBe(BorderFlags.TOP | BorderFlags.LEFT));
            it("should hit top border", () => expect(BorderCheck.top(bounds)).toBeTruthy());
            it("should hit left border", () => expect(BorderCheck.left(bounds)).toBeTruthy());
        });

        describe("when sprite straddles bounds", () =>
        {
            let bounds = BorderFlags.NONE;
            beforeAll(() =>
            {
                s1.moveTo(105, 105);
                bounds = p1.restrictBounds(s1);
            });
            it("should restrict x-pos", () => expect(s1.x).toBe(100));
            it("should restrict y-pos", () => expect(s1.x).toBe(100));
            it("should set bottom and right flags", () => expect(bounds).toBe(BorderFlags.BOTTOM | BorderFlags.RIGHT));
            it("should hit bottom border", () => expect(BorderCheck.bottom(bounds)).toBeTruthy());
            it("should hit right border", () => expect(BorderCheck.right(bounds)).toBeTruthy());
        });
    });
});