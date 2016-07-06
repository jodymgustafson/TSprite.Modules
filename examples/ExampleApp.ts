import {Sprite} from "../src/Base";
import {AnimationLoop} from "../src/AnimationLoop";

/**
* Base class for example apps
* @abstract
*/
export class ExampleApp
{
    /** @protected */
    canvas: HTMLCanvasElement;
    context: CanvasRenderingContext2D;
    loop: AnimationLoop;
    $fps: HTMLElement;

    constructor(appName: string)
    {
        document.getElementsByTagName("header").item(0).innerText = appName;

        this.canvas = document.getElementsByTagName("canvas").item(0);
        this.context = this.canvas.getContext("2d");
        this.$fps = <HTMLElement>document.querySelector("footer>span");

        this.loop = new AnimationLoop((dt) => this.update(dt));

        this.canvas.addEventListener("click", () => this.togglePause());
    }

    /** @protected */
    update(dt: number)
    {
        this.$fps.innerText = this.loop.framesPerSecond.toFixed(2);
    }

    public start()
    {
        this.loop.start();
    }

    /** @protected */
    togglePause()
    {
        if (this.loop.isRunning)
        {
            this.loop.stop();
        }
        else
        {
            this.loop.start();
        }
    }

    /** @protected */
    setRandomVelocity(sprite: Sprite)
    {
        sprite.setVelocity(100 * Math.random() + 50, 100 * Math.random() + 50);
    }
} 