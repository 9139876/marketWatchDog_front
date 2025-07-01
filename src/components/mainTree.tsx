import React from 'react';
import {Collapse, Divider} from 'antd';
import MarketSignalsSettings from "./marketSignalsSettings/marketSignalsSettings";

const MainTree: React.FC = () => {

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
                        label: <div>История рыночных сигналов</div>,
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
                        label: <div>Закрытые позиции</div>,
                        children: <div>Здесь потом что-то будет...</div>,
                    },
                ]}
            />
        </>
    );
};

export default MainTree;