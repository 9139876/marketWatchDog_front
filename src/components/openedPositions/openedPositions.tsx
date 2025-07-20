import {observer} from "mobx-react";
import React from 'react';
import {Button, Tree} from 'antd';
import type {TreeDataNode, TreeProps} from 'antd';
import {useStores} from "../../stores/hooks/useStores";
import OpenedPositionItem from "./openedPositionItem";
import {ApplicationLogEventType} from "../../models/applicationLog/applicationLogEventType";
// import styles from "./openedPositions.css";
import "./openedPositions.css";


const OpenedPositions = observer(() => {

    const {openedPositionsStore} = useStores();

    const treeData: TreeDataNode[] = [
        {
            title: 'Позиция 1',
            key: '0-0',
            children: [],
        },
        {
            title: 'Позиция 2',
            key: '1-0',
            children: [
                {
                    title: 'Ордер 1',
                    key: '1-0-0-0',
                },
                {
                    title: 'Ордер 2',
                    key: '1-0-0-1',
                },
                {
                    title: 'Ордер 3',
                    key: '1-0-0-2',
                },
            ],
        },
    ];

    const onSelect: TreeProps['onSelect'] = (selectedKeys, info) => {
        console.log('selected', selectedKeys, info);
    };

    const mapOpenedPositions = (): TreeDataNode[] => {

        return openedPositionsStore.openedPositions.map((item, index) => (
            {
                title: OpenedPositionItem(item),
                key: index.toString(),
                children: []
            }));
    };

    return (
        // <div>
        //     <Tree
        //         showLine
        //         onSelect={onSelect}
        //         treeData={mapOpenedPositions()}
        //         // treeData={treeData}
        //     />
        //
        //     <Button style={{margin: '1em'}} onClick={() => openedPositionsStore.refreshOpenedPositions()}>
        //         Обновить
        //     </Button>
        // </div>

        // <table style={{border: "2px solid rgb(140 140 140)", width: "100%"}}>
        // <table >//className='openedPositionsTable'>
        <table>
            <thead>
            <tr>
                <th scope="col">Person</th>
                <th scope="col">Most interest in</th>
                <th scope="col">Age</th>
                <th scope="col">Triggers</th>
            </tr>
            </thead>

            <tbody>
            <tr>
                <td>HTML tables</td>
                <td>HTML tables</td>
                <td>22</td>
                <td>
                    <tr>trigger 1</tr>
                    <tr>trigger 2</tr>
                    <tr>trigger 3</tr>
                </td>
            </tr>
            <tr>
                <th scope="row">Dennis</th>
                <td>Web accessibility</td>
                <td>45</td>
                <td>
                    <td>22</td>
                    <td>22</td>
                    <td>22</td>
                </td>
            </tr>
            <tr>
                <td>Sarah</td>
                <td>JavaScript frameworks</td>
                <td></td>
                <td></td>
            </tr>
            <tr>
                <td>Karen</td>
                <td>Web performance</td>
                <td>36</td>
                <td></td>
            </tr>
            </tbody>
        </table>
    );
});

export default OpenedPositions;