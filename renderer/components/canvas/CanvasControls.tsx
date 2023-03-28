import classNames from "classnames";
import React, {FC} from "react";
import {observer} from "mobx-react-lite";
import {CanvasController} from "./canvas-controller";

interface CanvasControlsProps {
    controller: CanvasController;
}

export const CanvasControls: FC<CanvasControlsProps> = observer(({controller}) => {
    return (
        <div className={'flex justify-between items-center'}>
            <div className={'flex gap-2'}>
                {controller.options.map(option => (
                    <button key={option.id}
                            className={classNames('btn-xs', {'btn-active': option.isActive})}
                            onClick={() => option.toggle()}>point
                    </button>
                ))}
            </div>
            <button className={'btn-xs'} onClick={controller.reset}>очистить</button>
        </div>
    )
});