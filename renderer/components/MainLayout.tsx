import {CommandsList} from "./CommandsList";
import {Canvas} from "./canvas/Canvas";
import React from "react";
import {ControlPanel} from "./ControlPanel";

export const MainLayout = () => (
    <div className={'container mx-auto min-h-screen max-h-screen p-4'}>
        <div className={'flex gap-4 w-full h-full'}>
            <div className={'flex-auto flex h-full bg-red-300'}>
                <CommandsList/>
            </div>
            <div className={'flex-none grid gap-4'}>
                <Canvas/>
                <ControlPanel/>
            </div>
        </div>
    </div>
);