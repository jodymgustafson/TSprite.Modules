import {Sprite, resetUID} from "../../src/Base";
import {OrderedSpriteList} from "../../src/Collections";

describe("Collections", () =>
{
    describe("Ordered sprite list", () =>
    {
        // create list ordered by x-pos
        var list = new OrderedSpriteList((s1, s2) =>
        {
            return s2.x - s1.x;
        });

        // Need to reset sprite ids so they match below
        beforeAll(()=> resetUID(0));

        describe("when list initialized", () =>
        {
            it("should be empty", () => expect(list.isEmpty()).toBeTruthy());
            it("should have 0 count", () => expect(list.count).toBe(0));
        });

        describe("when first sprite added", () =>
        {
            beforeAll(() => list.add(new Sprite().moveTo(20, 0)));
            it("should NOT be empty", () => expect(list.isEmpty()).toBeFalsy());
            it("should have correct count", () => expect(list.count).toBe(1));
        });

        describe("when second sprite added", () =>
        {
            beforeAll(() => list.add(new Sprite().moveTo(30, 0)));
            it("should have correct count", () => expect(list.count).toBe(2));
        });

        describe("when third sprite added", () =>
        {
            beforeAll(() => list.add(new Sprite().moveTo(10, 0)));
            it("should have correct count", () => expect(list.count).toBe(3));
            it("should have string value", () => expect(list.toString()).toBe("2,0,1"));
            it("item 0 should have id 2", () => expect(list.itemAt(0).id).toBe("2"));
            it("item 1 should have id 0", () => expect(list.itemAt(1).id).toBe("0"));
            it("item 2 should have id 1", () => expect(list.itemAt(2).id).toBe("1"));
        });

        describe("when fourth sprite added", () =>
        {
            beforeAll(() => list.add(new Sprite().moveTo(25, 0)));
            it("should have correct count", () => expect(list.count).toBe(4));
            it("should have string value", () => expect(list.toString()).toBe("2,0,3,1"));
        });

        describe("when fifth sprite added", () =>
        {
            beforeAll(() => list.add(new Sprite().moveTo(1, 0)));
            it("should have correct count", () => expect(list.count).toBe(5));
            it("should have string value", () => expect(list.toString()).toBe("4,2,0,3,1"));
        });

        let s: Sprite;

        describe("when sixth sprite added", () =>
        {
            beforeAll(() =>
            {
                s = new Sprite().moveTo(100, 0);
                list.add(s);
            });
            it("should have correct count", () => expect(list.count).toBe(6));
            it("should have string value", () => expect(list.toString()).toBe("4,2,0,3,1,5"));
        });

        describe("when remove sprite", () =>
        {
            beforeAll(() => list.removeSprite(s));
            it("should remove the sprite", () => expect(list.count).toBe(5));
        });

        describe("when remove items 3 and 1", () =>
        {
            beforeAll(() =>
            {
                list.removeAt(3);
                list.removeAt(1);
            });
            it("should have the correct count", () => expect(list.count).toBe(3));
            it("should have string value", () => expect(list.toString()).toBe("4,0,1"));
        });

        describe("when remove item 0", () =>
        {
            beforeAll(() => list.removeAt(0));
            it("should have the correct count", () => expect(list.count).toBe(2));
            it("should have string value", () => expect(list.toString()).toBe("0,1"));
        });

        describe("when remove item 1", () =>
        {
            beforeAll(() => list.removeAt(1));
            it("should have the correct count", () => expect(list.count).toBe(1));
            it("should have string value", () => expect(list.toString()).toBe("0"));
        });

        describe("when remove item 0", () =>
        {
            beforeAll(() => list.removeAt(0));
            it("should have the correct count", () => expect(list.count).toBe(0));
            it("should have string value", () => expect(list.toString()).toBe(""));
        });

        describe("when add multiple sprites", () =>
        {
            beforeAll(() => list.addSprites(new Sprite(), new Sprite(), new Sprite(), new Sprite()));
            it("should NOT be empty", () => expect(list.isEmpty()).toBeFalsy());
            it("should have correct count", () => expect(list.count).toBe(4));
        });

        describe("when purge inactive sprites", () =>
        {
            beforeAll(() =>
            {
                list.itemAt(0).disable();
                list.itemAt(3).disable();
                list.purgeInactive();
            });
            it("should have correct count", () => expect(list.count).toBe(2));
        });

    });
});
