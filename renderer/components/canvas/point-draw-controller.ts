import {makeAutoObservable} from "mobx";
import {Commands} from "../core/commands";
import {CanvasController} from "./canvas-controller";
import {ControllerOption} from "./controller-option";
import {Path} from "../core/path";
import {Point} from "../core/point";

export class PointDrawController implements ControllerOption {
    id = Math.random().toFixed(5);
    currentPath = null;

    constructor(private commands: Commands, private controller: CanvasController) {
        makeAutoObservable(this);
    }

    click({x, y}: { x: number, y: number }) {
        if (!this.currentPath) {
            this.currentPath = new Path();
            this.commands.add(this.currentPath);
        }

        this.currentPath.add(new Point({x, y}));
    }

    get isActive() {
        return this.controller.active === this;
    }

    toggle() {
        this.controller.active = this.isActive
            ? null
            : this;

        if (!this.isActive) this.currentPath = null;
    }

}