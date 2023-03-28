import {Command} from "./command";
import {makeAutoObservable} from "mobx";
import {Point} from "./point";

export class Path implements Command {
    points: Point[] = [];

    constructor() {
        makeAutoObservable(this);
    }

    add(point: Point) {
        this.points.push(point);
    }

    render(ctx: CanvasRenderingContext2D) {
        const renderEdge = (pointA: Point, pointB: Point) => {
            ctx.moveTo(pointA.position.x, pointA.position.y);
            ctx.lineTo(pointB.position.x, pointB.position.y);
            ctx.stroke();
        }

        this.points.forEach((point, ix) => {
            point.render(ctx, ix);

            if (ix > 0)
                renderEdge(this.points[ix - 1], point);
        });
    }

    get commands() {
        return this.points.flatMap(point => point.commands);
    }
}