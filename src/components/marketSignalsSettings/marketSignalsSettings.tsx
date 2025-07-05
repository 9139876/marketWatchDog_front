import React from "react";
import {Button, Table} from 'antd';
import type {TableColumnsType} from 'antd';
import {CheckCircleTwoTone} from "@ant-design/icons";
import {observer} from "mobx-react";

const MarketSignalsSettings=observer(() => {

    interface DataType {
        key: React.Key;
        dealer: string;
        symbol: string;
        donchianAndRsi: string;
        divergence: string;
        havingSignal: boolean;
    }

    const data: DataType[] = [
        {
            key: '1',
            dealer: "Альфа",
            symbol: "EurUsd",
            donchianAndRsi: "M15, M30",
            divergence: "M30, H1",
            havingSignal: true
        },
        {
            key: '2',
            dealer: "Альфа",
            symbol: "GpbUsd",
            donchianAndRsi: "M5, M30",
            divergence: "M15, H1",
            havingSignal: true
        },
        {
            key: '3',
            dealer: "Финам",
            symbol: "Gold",
            donchianAndRsi: "",
            divergence: "M30, H1",
            havingSignal: true
        },
        {
            key: '4',
            dealer: "Финам",
            symbol: "Silver",
            donchianAndRsi: "M15, M30",
            divergence: "",
            havingSignal: true
        },
        {
            key: '5',
            dealer: "Финам",
            symbol: "Сбер",
            donchianAndRsi: "",
            divergence: "",
            havingSignal: false
        },
        {
            key: '6',
            dealer: "Финам",
            symbol: "Лукойл",
            donchianAndRsi: "",
            divergence: "",
            havingSignal: false
        },
    ];

    const columns: TableColumnsType<DataType> = [
        {
            title: 'Дилер',
            dataIndex: 'dealer',
            filters: data
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
            <Table<DataType>
                bordered
                columns={columns}
                dataSource={data}
                pagination={false}
                scroll={{y: 39 * 5}}
                size={"small"}
            />
            <Button
                style={{margin: 15}}
                type="primary"
            >
                Обновить
            </Button>
        </div>
    );
});

export default MarketSignalsSettings;