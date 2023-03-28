import {useContext} from "react";
import {CommandsContext} from "./context";

export function useCommands() {
    return useContext(CommandsContext);
}