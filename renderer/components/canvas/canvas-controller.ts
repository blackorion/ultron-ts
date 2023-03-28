import {Commands} from "../core/commands";
import {action, makeAutoObservable} from "mobx";
import {PointDrawController} from "./point-draw-controller";
import {ControllerOption} from "./controller-option";

export class CanvasController {
    active: ControllerOption | null = null;
    options: ControllerOption[] = [];

    constructor(private commands: Commands) {
        this.options
            .push(new PointDrawController(commands, this));

        makeAutoObservable(this, {
            reset: action.bound
        });
    }

    reset() {
        this.commands.reset();
    }
}