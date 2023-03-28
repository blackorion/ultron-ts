import React from "react";
import {useCommands} from "./useCommands";
import {observer} from "mobx-react-lite";

export const CommandsList = observer(() => {
    const commands = useCommands();

    return (
        <div className={'flex-auto flex flex-col h-full px-2 gap-4 text-gray-600 bg-gray-200'}>
            <p className={'font-bold'}>программа:</p>

            <div className={'max-h-full overflow-auto'}>
                <ul className={'grid gap-1'}>
                    {commands.list.flatMap(command => command.commands)
                        .map((command, ix) => (
                            <li key={ix} className={'cursor-pointer'}>{command}</li>
                        ))}
                </ul>
            </div>
        </div>
    )
})