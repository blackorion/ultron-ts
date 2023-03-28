import React, {FC, useEffect, useState} from 'react';

export interface ControlPanelProps {
}

export const ControlPanel: FC<ControlPanelProps> = ({}) => {
    const [port, setPort] = useState(null);

    useEffect(() => {
        return () => {
            if (!port) return;
            port.close();
        }
    }, []);

    const handleConnect = async () => {
        const p = await (navigator as any).serial.requestPort();
        await p.open({baudRate: 9600});
        setPort(p);
    }

    return (
        <div className={'flex gap-4'}>
            <button className={'btn'} onClick={handleConnect}>подключить</button>
            <button className={'btn'}>старт</button>

            <select className={'select'}>
                <option value="port">sp 1</option>
            </select>
        </div>
    );
};