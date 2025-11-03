import React from 'react';
import {Collapse, Divider} from 'antd';
import MarketSignalSettings from "./marketSignalSettings/marketSignalSettings";
import {observer} from "mobx-react";
import EventsList from "./log/eventsList";
import OpenedPositions from "./openedPositions/openedPositions";
import FrontEndLog from "./log/frontEndLog";
import MarketSignalHistoryList from "./marketSignalHistory/marketSignalHistoryList";

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
                        children: <MarketSignalHistoryList/>,
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
                    },
                    {
                        key: '2',
                        label: 'Ошибки',
                        children: <FrontEndLog/>
                    }
                ]}
            />
        </>
    );
});

export default MainTree;