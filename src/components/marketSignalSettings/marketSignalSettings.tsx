/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {useState} from "react";
import {Table} from 'antd';
import type {TableColumnsType} from 'antd';
import {CheckCircleTwoTone} from "@ant-design/icons";
import {observer} from "mobx-react";
import {useStores} from "../../stores/hooks/useStores";
import SymbolInfoWithMarketSignalSettingsModel from "../../models/marketSymbolsAndSignalSettings/symbolInfoWithMarketSignalSettingsModel";
import strongButtonStyles from "../../customControls/strongButton.module.css";
import StrongButton from "../../customControls/strongButton";

const MarketSignalSettings = observer(() => {

    const {marketSignalSettingsStore, editMarketSignalSettingsModalStore} = useStores();

    const [disableRefreshButton, setDisableRefreshButton] = useState(false);

    const refreshMarketSignalSettingsItems = async () => {
        try {
            setDisableRefreshButton(true);
            await marketSignalSettingsStore.refreshMarketSignalSettingsItems();
        } finally {
            setDisableRefreshButton(false);
        }
    };

    const columns: TableColumnsType<SymbolInfoWithMarketSignalSettingsModel> = [
        {
            title: 'Инструмент',
            dataIndex: 'symbol',
            defaultSortOrder: 'ascend',
            render: (text, item) => <a onClick={() => editMarketSignalSettingsModalStore.showModal(item)}>{text}</a>,
            sorter: (a, b) => ('' + a.symbol).localeCompare(b.symbol)
        },
        {
            title: 'MaxDailyProfit / Margin (%)',
            dataIndex: 'dailyMovingProfitToMarginPercentRatioStr',
            sorter: (a, b) => (a.dailyMovingProfitToMarginPercentRatio > b.dailyMovingProfitToMarginPercentRatio) ? 1 : -1,
            filters: [
                {text: '10', value: 10},
                {text: '20', value: 20},
                {text: '30', value: 30},
                {text: '40', value: 40},
                {text: '50', value: 50},
                {text: '60', value: 60},
                {text: '70', value: 70},
                {text: '80', value: 80},
                {text: '90', value: 90},
                {text: '100', value: 100}],
            onFilter: (value, record) => record.dailyMovingProfitToMarginPercentRatio >= value,
            align: 'center',
        },
        {
            title: 'MaxDailyProfit / SpreadLoss',
            dataIndex: 'dailyMovingProfitToSpreadLossRatioStr',
            sorter: (a, b) => (a.dailyMovingProfitToSpreadLossRatio > b.dailyMovingProfitToSpreadLossRatio) ? 1 : -1,
            filters: [
                {text: '10', value: 10},
                {text: '20', value: 20},
                {text: '30', value: 30},
                {text: '40', value: 40},
                {text: '50', value: 50},
                {text: '60', value: 60},
                {text: '70', value: 70},
                {text: '80', value: 80},
                {text: '90', value: 90},
                {text: '100', value: 100}],
            onFilter: (value, record) => record.dailyMovingProfitToSpreadLossRatio >= value,
            align: 'center',
        },
        {
            title: 'Под наблюдением',
            dataIndex: 'havingSignal',
            render: (value) => value ? <CheckCircleTwoTone/> : <div/>,
            sorter: (a, b) => (a.havingSignal === b.havingSignal) ? 0 : (a.havingSignal ? -1 : 1),
            filters: [
                {text: 'Да', value: true},
                {text: 'Нет', value: false}],
            onFilter: (value, record) => record.havingSignal === value,
            align: 'center',
        },
        {
            title: 'Таймфреймы для сигнала DonchianAndRsi',
            dataIndex: 'donchianAndRsiStr',
            sorter: (a, b) => ('' + a.donchianAndRsiStr).localeCompare(b.donchianAndRsiStr)
        },
        {
            title: 'Таймфреймы для сигнала Divergence',
            dataIndex: 'divergenceStr',
            sorter: (a, b) => ('' + a.divergenceStr).localeCompare(b.divergenceStr)
        },
    ];

    return (
        <div>
            <Table<SymbolInfoWithMarketSignalSettingsModel>
                bordered
                columns={columns}
                dataSource={marketSignalSettingsStore.marketSignalSettingsItems}
                pagination={false}
                scroll={{y: 39 * 5}}
                size={"small"}
            />
            <StrongButton
                className={strongButtonStyles.greenButton}
                style={{marginTop: 15}}
                disabled={disableRefreshButton}
                onClick={refreshMarketSignalSettingsItems}
            >
                Обновить
            </StrongButton>
        </div>
    );
});

export default MarketSignalSettings;