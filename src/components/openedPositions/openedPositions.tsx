import {observer} from "mobx-react";
import React, {ReactNode} from 'react';
import {useStores} from "../../stores/hooks/useStores";
import "./openedPositions.css";
import {OpenedPositionInfo} from "../../models/openedPositions/openedPositionInfo";
import {Button} from "antd";
import {PositionDirectionTypeEnum} from "../../models/openedPositions/positionDirectionTypeEnum";

const OpenedPositions = observer(() => {

    const {openedPositionsStore} = useStores();

    const onStopLossClick = (identifier: number) => {
        console.log('identifier', identifier);
    }

    const mapToStopLossCell = (item: OpenedPositionInfo): ReactNode => {
        return (

            <a onClick={() => onStopLossClick(item.identifier)}>
                {
                    !!item.stopLoss
                        ? <div>item.stopLoss</div>
                        : <div style={{color: "red", fontWeight: "bold"}}>!!! ОТСУТСТВУЕТ !!!</div>
                }
            </a>
        );
    }


    const mapToRow = (item: OpenedPositionInfo): ReactNode => {
        return (
            <tr key={item.identifier}>
                {/*Symbol*/}
                <td>{`${item.dealer} - ${item.symbol}`}</td>

                {/*Тип*/}
                <td>{item.type === PositionDirectionTypeEnum.Long
                    ? (<div style={{color: "blue", fontWeight: "bold"}}>Long</div>)
                    : (<div style={{color: "red", fontWeight: "bold"}}>Short</div>)}</td>

                {/*Время открытия*/}
                <td>{`${new Date(item.openedTime).toLocaleDateString()} ${new Date(item.openedTime).toLocaleTimeString()}`}</td>

                {/*Цена открытия*/}
                <td>{item.priceOpen}</td>

                {/*Текущая цена*/}
                <td>{item.currentPrice}</td>

                {/*Профит*/}
                <td>{item.profit > 0 ? <div style={{color: "green", fontWeight: "bold"}}>{item.profit}</div> : <div style={{color: "red", fontWeight: "bold"}}>{item.profit}</div>}  </td>

                {/*StopLoss*/}
                <td>{mapToStopLossCell(item)}</td>

                {/*Триггеры*/}
                <td>Триггеры</td>
            </tr>
        );
    }

    return (
        <>
            <table>
                <thead>
                <tr>
                    <th scope="col" style={{width: "10%"}}>Symbol</th>
                    <th scope="col" style={{width: "5%"}}>Тип</th>
                    <th scope="col" style={{width: "5%"}}>Время открытия</th>
                    <th scope="col" style={{width: "7%"}}>Цена открытия</th>
                    <th scope="col" style={{width: "7%"}}>Текущая цена</th>
                    <th scope="col" style={{width: "7%"}}>Профит</th>
                    <th scope="col" style={{width: "10%"}}>StopLoss</th>
                    <th scope="col">Триггеры</th>
                </tr>
                </thead>

                <tbody>
                {openedPositionsStore.openedPositions.map(mapToRow)}
                </tbody>
            </table>

            <Button style={{margin: '1em'}} onClick={() => openedPositionsStore.refreshOpenedPositions()}>
                Обновить
            </Button>
        </>
    )
        ;
});

export default OpenedPositions;