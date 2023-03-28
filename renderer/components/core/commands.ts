import {action, makeAutoObservable, observable} from "mobx";
import {enableStaticRendering} from "mobx-react-lite";
import {Command} from "./command";

enableStaticRendering(typeof window === 'undefined')

export class Commands {
    public list: Command[] = observable.array();

    constructor() {
        makeAutoObservable(this, {
            reset: action.bound,
        });
    }

    add(command: Command) {
        this.list.push(command);
    }

    reset() {
        this.list = [];
    }
}