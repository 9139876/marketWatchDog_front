import React from 'react';
import {Collapse, Divider} from 'antd';
import MarketSignalsSettings from "./marketSignalsSettings/marketSignalsSettings";
import {observer} from "mobx-react";
import EventsList from "./log/eventsList";

const MainTree = observer(() => {

    const onChange = (key: string | string[]) => {
        console.log(key);
    };

    return (
        <>
            <Divider orientation="left">Рыночные сигналы</Divider>
            <Collapse
                size="large"
                onChange={onChange}
                items={[
                    {
                        key: '1',
                        label: 'Настройки рыночных сигналов',
                        children: <MarketSignalsSettings/>
                    },
                    {
                        key: '2',
                        label: 'История рыночных сигналов',
                        children: <div>Здесь потом что-то будет...</div>,
                    },
                ]}
            />
            <Divider orientation="left">Рыночные позиции</Divider>
            <Collapse
                size="large"
                onChange={onChange}
                items={[
                    {
                        key: '1',
                        label: 'Открытые позиции',
                        children: <div>Здесь потом что-то будет...</div>
                    },
                    {
                        key: '2',
                        label: 'Закрытые позиции',
                        children: <div>Здесь потом что-то будет...</div>,
                    },
                ]}
            />
            <Divider orientation="left">Лог</Divider>
            <Collapse
                size="large"
                onChange={onChange}
                items={[
                    {
                        key: '1',
                        label: 'События',
                        children: <EventsList/>
                    }
                ]}
            />
        </>
    );
});

export default MainTree;