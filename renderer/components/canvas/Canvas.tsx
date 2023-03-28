import {observer} from "mobx-react-lite";
import React, {useCallback, useEffect, useMemo, useRef, useState} from "react";
import {useCommands} from "../useCommands";
import {autorun} from "mobx";
import {CanvasController} from "./canvas-controller";
import {CanvasControls} from "./CanvasControls";
import {offset, useClientPoint, useFloating, useInteractions} from "@floating-ui/react";

export const Canvas = observer(() => {
    const ctx = useRef<CanvasRenderingContext2D>();
    const commands = useCommands();
    const controller = useMemo(() => new CanvasController(commands), []);

    useEffect(() => {
        autorun(() => {
            ctx.current.clearRect(0, 0, 400, 400);

            commands.list.forEach((command, ix) => {
                if (ix === 0) ctx.current.beginPath();

                command.render(ctx.current, ix);
            });
        });
    }, []);

    const setRef = useCallback((e: HTMLCanvasElement) => {
        if (!e) return;

        ctx.current = e.getContext('2d');
    }, []);

    const handleClick = (point) => {
        if (controller.active)
            controller.active.click(point);
    }

    return (
        <div>
            <DrawingCanvas onClick={handleClick} ref={setRef}/>

            <CanvasControls controller={controller}/>
        </div>
    );
})

const OFFSET = 20;

interface DrawingCanvasProps {
    onClick: (point: { x: number; y: number; }) => void;
}

const DrawingCanvas = observer(React.forwardRef<HTMLCanvasElement, DrawingCanvasProps>(({onClick}, ref) => {
    const [inFocus, setInFocus] = useState(false);
    const {x, y, refs, context} = useFloating({
        open: inFocus,
        placement: "bottom-start",
        middleware: [offset({mainAxis: OFFSET, crossAxis: OFFSET})]
    });
    const clientPoint = useClientPoint(context);
    const {getReferenceProps, getFloatingProps} = useInteractions([clientPoint]);

    const handleMouseEnter = () => setInFocus(true);
    const handleMouseLeave = () => setInFocus(false);

    const xInt = x | 0;
    const yInt = y | 0;

    const handleClick = () => {
        onClick({x: xInt - OFFSET, y: yInt - OFFSET});
    }

    return (
        <div className={'relative grid place-items-center bg-gray-100 p-4 overflow-hidden'}>
            <div className={'relative'}
                 ref={refs.setReference}
                 {...getReferenceProps()}
            >
                <canvas width={400}
                        height={400}
                        className={'border border-gray-200 shadow'}
                        onClick={handleClick}
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                        ref={ref}
                />

                <span className={`absolute top-0 left-0 z-10 p-2 bg-blue-500 pointer-events-none`}
                      style={{transform: `translate(${xInt}px, ${yInt}px)`}}
                      ref={refs.setFloating}
                      {...getFloatingProps()}
                >x: {xInt - OFFSET}, y: {yInt - OFFSET}</span>
            </div>
        </div>
    );
}));