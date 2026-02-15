import React from 'react';
import {Collapse, Divider} from 'antd';
import MarketSignalSettings from "./marketSignalSettings/marketSignalSettings";
import {observer} from "mobx-react";
import EventsList from "./log/eventsList";
import OpenedPositions from "./openedPositions/openedPositions";
import FrontEndLog from "./log/frontEndLog";
import MarketSignalHistoryList from "./marketSignalHistory/marketSignalHistoryList";
import ClosedPositions from "./dealsHistory/closedPositions";
import {useStores} from "../stores/hooks/useStores";
import RunHistoryTest from "./historyTest/runHistoryTest";


const Main = observer(() => {
    const {appStateStore} = useStores();

    const getMarketSignalsItems = () => {
        return [
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
        ];
    }

    const getHistoryTestItems = () => {
        return [
            {
                key: '1',
                label: 'Запуск теста на истории',
                children: <RunHistoryTest/>
            },
        ];
    }

    const getMarketPositionsItems = () => {
        return appStateStore.operatingModeIsStandard() || appStateStore.operatingModeIsAutoTrade()
            ? [
                {
                    key: '1',
                    label: 'Открытые позиции',
                    children: <OpenedPositions/>
                },
                {
                    key: '2',
                    label: 'История сделок',
                    children: <ClosedPositions/>,
                },
            ]
            : [
                {
                    key: '1',
                    label: 'История сделок',
                    children: <ClosedPositions/>,
                },
            ]
    }

    const getLogItems = () => {
        return appStateStore.operatingModeIsStandard() || appStateStore.operatingModeIsAutoTrade()
            ? [
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
            ]
            : [
                {
                    key: '1',
                    label: 'Ошибки',
                    children: <FrontEndLog/>
                }
            ]
    }

    return (
        <>
            {
                (appStateStore.operatingModeIsStandard() || appStateStore.operatingModeIsAutoTrade())
                    ? (<div>
                        <Divider style={{fontSize: '1.5em'}} orientation="left">Рыночные сигналы</Divider>

                        <Collapse
                            style={{fontSize: '1.5em'}}
                            size="large"
                            items={getMarketSignalsItems()}
                        />
                    </div>)
                    : null
            }

            {
                appStateStore.operatingModeIsHistoryTest()
                    ? (<div>
                        <Divider style={{fontSize: '1.5em'}} orientation="left">Тест на истории</Divider>

                        <Collapse
                            style={{fontSize: '1.5em'}}
                            size="large"
                            items={getHistoryTestItems()}
                        />
                    </div>)
                    : null
            }

            <div>
                <Divider style={{fontSize: '1.5em'}} orientation="left">Рыночные позиции</Divider>

                <Collapse
                    style={{fontSize: '1.5em'}}
                    size="large"
                    items={getMarketPositionsItems()}
                />
            </div>

            <div>
                <Divider style={{fontSize: '1.5em'}} orientation="left">Лог</Divider>

                <Collapse
                    style={{fontSize: '1.5em'}}
                    size="large"
                    items={getLogItems()}
                />
            </div>

        </>
    );
});

export default Main;