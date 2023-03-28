import React from "react";
import {Commands} from "./core/commands";

export const CommandsContext = React.createContext<Commands | null>(null);