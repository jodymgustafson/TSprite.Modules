import {AnimatedSprite, ImageAnimationFrames} from "../../src/Canvas";

describe("Canvas", () =>
{
    describe("when animated sprite", () =>
    {
        var img = new Image();
        img.width = 100;
        img.height = 100;
        var frames = new ImageAnimationFrames(img, 32, 32, 2, 3);
        var s1 = new AnimatedSprite(frames, 10);

        it("should be frame 0 at start", () =>
        {
            expect(frames.index).toBe(0);
        });
        it("should be frame 1 after first update", () =>
        {
            s1.update(100);
            expect(frames.index).toBe(1);
        });
        it("should be frame 2 after second update", () =>
        {
            s1.update(150);
            expect(frames.index).toBe(2);
        });
        it("should be frame 3 after third update", () =>
        {
            s1.update(150);
            expect(frames.index).toBe(3);
        });
        it("should be frame 3 after fourth update", () =>
        {
            s1.update(10);
            expect(frames.index).toBe(3);
        });
        it("should be frame 5 after moving to 5", () =>
        {
            frames.moveTo(5);
            expect(frames.index).toBe(5);
        });
        it("should go back to first after last frame", () =>
        {
            s1.update(100);
            expect(frames.index).toBe(0);
        });
    });
});