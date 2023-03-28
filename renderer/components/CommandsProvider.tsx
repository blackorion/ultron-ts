import React, {FC, PropsWithChildren} from 'react';
import {CommandsContext} from "./context";
import {Commands} from "./core/commands";

let store: Commands;

export type CommandsProviderProps = PropsWithChildren;

export const CommandsProvider: FC<CommandsProviderProps> = ({children}) => {
    const store = initializeStore();

    return (
        <CommandsContext.Provider value={store}>
            {children}
        </CommandsContext.Provider>
    );
};

function initializeStore() {
    const _store = store ?? new Commands();

    if (typeof window === "undefined") return _store;

    if (!store) store = _store;

    return _store;
}