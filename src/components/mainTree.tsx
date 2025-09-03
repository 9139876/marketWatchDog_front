import React from 'react';
import {Collapse, Divider} from 'antd';
import MarketSignalSettings from "./marketSignalSettings/marketSignalSettings";
import {observer} from "mobx-react";
import EventsList from "./log/eventsList";
import OpenedPositions from "./openedPositions/openedPositions";

const MainTree = observer(() => {
    return (
        <>
            <Divider orientation="left">Рыночные сигналы</Divider>
            <Collapse
                size="large"
                items={[
                    {
                        key: '1',
                        label: 'Настройки рыночных сигналов',
                        children: <MarketSignalSettings/>
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
                items={[
                    {
                        key: '1',
                        label: 'Открытые позиции',
                        children: <OpenedPositions/>
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