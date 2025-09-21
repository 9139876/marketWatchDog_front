import {observer} from "mobx-react";
import React, {ReactNode} from 'react';
import {useStores} from "../../stores/hooks/useStores";
import "./openedPositions.css";
import {OpenedPositionInfo} from "../../models/openedPositions/openedPositionInfo";
import {Button} from "antd";
import {PositionDirectionTypeEnum} from "../../models/openedPositions/positionDirectionTypeEnum";
import {Nullable} from "../../global/common/nullable";
import {CloseCircleTwoTone, PlusCircleTwoTone} from "@ant-design/icons";


const OpenedPositions = observer(() => {

    const {openedPositionsStore, openPositionModalStore, closePositionModalStore, addTriggerModalStore} = useStores();

    const onOpenPositionClick = () => {
        openPositionModalStore.showModal();
    }

    const onClosePositionClick = (position: OpenedPositionInfo) => {
        closePositionModalStore.showModal(position);
    }

    const onAddTriggerClick = (position: OpenedPositionInfo) => {
        addTriggerModalStore.showModal(position);
    }

    const getColorClassName = (value: Nullable<string>): string => {
        return !!value && parseFloat(value) >= 0 ? "opened-position-green-text" : "opened-position-red-text";
    }

    const mapToStopLossCell = (item: OpenedPositionInfo): ReactNode => {
        return (
            !!item.stopLoss
                ? (<div style={{color: "black"}}>
                    <div style={{fontWeight: "bold"}}>{`Value: ${item.stopLoss}`}</div>
                    <div className={getColorClassName(item.ifStopLossFiredProfitInPercents)}>
                        {`${(item.ifStopLossFiredProfitInPercents ?? 0) > 0 ? '+' : '-'}${item.ifStopLossFiredProfitInPercentsAbs}%'}`}
                    </div>
                </div>)
                : (<div style={{color: "red", fontWeight: "bold"}}>!!! ОТСУТСТВУЕТ !!!</div>)
        );
    }


    const mapToRow = (item: OpenedPositionInfo): ReactNode => {

        const positionTypeIcon = item.type === PositionDirectionTypeEnum.Long
            ? require('./img/long.png')
            : require('./img/short.png');

        const positionTypeIconAltText = item.type === PositionDirectionTypeEnum.Long
            ? 'long'
            : 'short';

        return (
            <tr key={item.identifier}>
                {/*Закрытие позиции*/}
                <td className="opened-position-cell">
                    <CloseCircleTwoTone twoToneColor={'#d9363e'} style={{fontSize: "1.5em"}} onClick={() => onClosePositionClick(item)}/>
                </td>

                {/*Symbol*/}
                <td className="opened-position-cell">{item.symbol}</td>

                {/*Тип*/}
                <td className="opened-position-cell">
                    <img alt={positionTypeIconAltText} src={positionTypeIcon} style={{width: "5em"}}/>
                </td>

                {/*Время открытия*/}
                <td className="opened-position-cell">{item.openedTime}</td>

                {/*Цена открытия*/}
                <td className="opened-position-cell">{item.priceOpen}</td>

                {/*Текущая цена*/}
                <td className="opened-position-cell">{item.currentPrice}</td>

                {/*Профит*/}
                <td className="opened-position-cell">
                    <div>
                        <div className={getColorClassName(item.profit)}>{item.profit}</div>

                        <div className={getColorClassName(item.profitInPercents)}>
                            {`${(parseFloat(item.profitInPercents) ?? 0) > 0 ? '+' : '-'}${item.profitInPercentsAbs}%`}
                        </div>
                    </div>
                </td>

                {/*StopLoss*/}
                <td className="opened-position-cell">{mapToStopLossCell(item)}</td>

                {/*Триггеры*/}
                <td className="opened-position-cell">
                    <div>Триггеры</div>
                    <PlusCircleTwoTone style={{fontSize: "1.5em"}} onClick={() => onAddTriggerClick(item)}/>
                </td>

            </tr>
        );
    }

    return (
        <>
            <table className="opened-position-table">
                <thead className="opened-position-thead">
                <tr>
                    <th className="opened-position-cell" scope="col" style={{width: "2%"}}></th>
                    <th className="opened-position-cell" scope="col" style={{width: "10%"}}>Инструмент</th>
                    <th className="opened-position-cell" scope="col" style={{width: "5%"}}>Тип</th>
                    <th className="opened-position-cell" scope="col" style={{width: "5%"}}>Время открытия</th>
                    <th className="opened-position-cell" scope="col" style={{width: "7%"}}>Цена открытия</th>
                    <th className="opened-position-cell" scope="col" style={{width: "7%"}}>Текущая цена</th>
                    <th className="opened-position-cell" scope="col" style={{width: "7%"}}>Профит</th>
                    <th className="opened-position-cell" scope="col" style={{width: "10%"}}>StopLoss</th>
                    <th className="opened-position-cell" scope="col">Триггеры</th>
                </tr>
                </thead>

                <tbody>
                {openedPositionsStore.openedPositions.map(mapToRow)}
                </tbody>
            </table>

            <div style={{paddingTop: "1em", display: "flex", alignItems: "center"}}>
                <PlusCircleTwoTone style={{fontSize: "3em"}} onClick={onOpenPositionClick}/>

                <div style={{paddingLeft: "0.5em", fontSize: "1.2em", fontWeight: "bold", fontStyle: "italic"}}>Открыть позицию</div>

                <Button style={{margin: '1em'}} onClick={() => openedPositionsStore.refreshOpenedPositions()}>
                    Обновить
                </Button>
            </div>
        </>
    )
        ;
});

export default OpenedPositions;