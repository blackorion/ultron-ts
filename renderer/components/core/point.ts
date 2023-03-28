import {Command} from "./command";
import {makeAutoObservable} from "mobx";

export class Point implements Command {
    private x = 0;
    private y = 0;

    constructor({x, y}: { x: number, y: number }) {
        this.x = x;
        this.y = y;

        makeAutoObservable(this);
    }

    get position() {
        return {x: this.x, y: this.y};
    }

    render(ctx: CanvasRenderingContext2D, index: number) {
        ctx.rect(this.x - 4, this.y - 4, 8, 8);
        ctx.fill();
    }

    get commands(): string[] {
        return [`x: ${this.x}, y: ${this.y}`];
    }
}