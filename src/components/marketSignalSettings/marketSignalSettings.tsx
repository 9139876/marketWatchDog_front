import React, {useState} from "react";
import {Button, Table} from 'antd';
import type {TableColumnsType} from 'antd';
import {CheckCircleTwoTone} from "@ant-design/icons";
import {observer} from "mobx-react";
import {MarketSignalSettingsItem} from "../../models/marketSignalSettings/marketSignalSettingsItem";
import {useStores} from "../../stores/hooks/useStores";

const MarketSignalSettings = observer(() => {

    const {marketSignalSettingsStore} = useStores();

    const [disableRefreshButton, setDisableRefreshButton] = useState(false);

    const refreshMarketSignalSettingsItems = async () => {
        try {
            setDisableRefreshButton(true);
            await marketSignalSettingsStore.refreshMarketSignalSettingsItems();
        } finally {
            setDisableRefreshButton(false);
        }
    };

    const columns: TableColumnsType<MarketSignalSettingsItem> = [
        {
            title: 'Дилер',
            dataIndex: 'dealer',
            filters: marketSignalSettingsStore.marketSignalSettingsItems
                .map(x => x.dealer)
                .filter((value, index, self) => self.indexOf(value) === index)
                .map(x => ({text: x, value: x})),
            onFilter: (value, record) => record.dealer.indexOf(value as string) === 0,
            sorter: (a, b) => ('' + a.dealer).localeCompare(b.dealer),
            width: '10%'
        },
        {
            title: 'Инструмент',
            dataIndex: 'symbol',
            defaultSortOrder: 'ascend',
            render: (text, item) => <a onClick={() => alert(item.key)}>{text}</a>,
            sorter: (a, b) => ('' + a.symbol).localeCompare(b.symbol)
        },
        {
            title: 'Под наблюдением',
            dataIndex: 'havingSignal',
            //
            render: (value) => value ? <CheckCircleTwoTone/> : <div/>,
            sorter: (a, b) => (a.havingSignal === b.havingSignal) ? 0 : (a.havingSignal ? -1 : 1),
            filters: [
                {text: 'Да', value: true},
                {text: 'Нет', value: false}],
            onFilter: (value, record) => record.havingSignal === value,
            width: '10%',
            align: 'center',
        },
        {
            title: 'Таймфреймы для сигнала DonchianAndRsi',
            dataIndex: 'donchianAndRsi',
            sorter: (a, b) => ('' + a.donchianAndRsi).localeCompare(b.donchianAndRsi)
        },
        {
            title: 'Таймфреймы для сигнала Divergence',
            dataIndex: 'divergence',
            sorter: (a, b) => ('' + a.divergence).localeCompare(b.divergence)
        },
    ];

    return (
        <div>
            <Table<MarketSignalSettingsItem>
                bordered
                columns={columns}
                dataSource={marketSignalSettingsStore.marketSignalSettingsItems}
                pagination={false}
                scroll={{y: 39 * 5}}
                size={"small"}
            />
            <Button
                style={{margin: 15}}
                type="primary"
                disabled={disableRefreshButton}
                onClick={refreshMarketSignalSettingsItems}
            >
                Обновить
            </Button>
        </div>
    );
});

export default MarketSignalSettings;