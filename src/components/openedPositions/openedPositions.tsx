import {observer} from "mobx-react";
import React, {ReactNode} from 'react';
import {useStores} from "../../stores/hooks/useStores";
import "./openedPositions.css";
import {OpenedPositionInfo} from "../../models/openedPositions/openedPositionInfo";
import {Button, message, Popconfirm} from "antd";
import {PositionDirectionTypeEnum} from "../../models/openedPositions/positionDirectionTypeEnum";
import {Nullable} from "../../global/common/nullable";
import {CloseCircleTwoTone, MinusCircleTwoTone, PlusCircleTwoTone} from "@ant-design/icons";
import {formatDateTimeRusStr} from "../../utils/helpers/stringHelper";
import OpenedPositionInfoWithWatchDogs from "../../models/openedPositions/openedPositionInfoWithWatchDogs";
import PositionWatchDogStoredModel from "../../models/watchDog/positionWatchDogStoredModel";
import {PositionWatchDogTypeEnum} from "../../models/watchDog/positionWatchDogTypeEnum";
import {NoticeType} from "antd/es/message/interface";


const OpenedPositions = observer(() => {

    const {openedPositionsStore, openPositionModalStore, closePositionModalStore, addWatchDogModalStore, editWatchDogModalStore} = useStores();
    const [messageApi, contextHolder] = message.useMessage();

    const onOpenPositionClick = () => {
        openPositionModalStore.showModal();
    }

    const onClosePositionClick = (position: OpenedPositionInfo) => {
        closePositionModalStore.showModal(position);
    }

    const onAddWatchDogClick = async (position: OpenedPositionInfo) => {
        await addWatchDogModalStore.showModal(position);
    }

    const onDeleteWatchDog = async (position: OpenedPositionInfo, watchDogType: PositionWatchDogTypeEnum) => {
        const result = await openedPositionsStore.deleteWatchDog(position, watchDogType);
        const noticeType: NoticeType = result.isSuccess ? 'success' : 'error';

        messageApi.open({
            type: noticeType,
            content: result.message
        });
    }

    const getColorClassName = (value: Nullable<string>): string => {
        return !!value && parseFloat(value.replace(',', '.')) >= 0 ? "opened-position-green-text" : "opened-position-red-text";
    }

    const mapToStopLossCell = (item: OpenedPositionInfo): ReactNode => {
        return (
            !!item.stopLoss
                ? (<div style={{color: "black"}}>
                    <div style={{fontWeight: "bold"}}>{`Value: ${item.stopLoss}`}</div>
                    <div className={getColorClassName(item.ifStopLossFiredProfitInPercents)}>
                        {`${(parseFloat((item.ifStopLossFiredProfitInPercents ?? '').replace(',', '.')) ?? 0) >= 0 ? '+' : '-'}${item.ifStopLossFiredProfitInPercentsAbs}%`}
                    </div>
                </div>)
                : (<div style={{color: "red", fontWeight: "bold"}}>!!! ОТСУТСТВУЕТ !!!</div>)
        );
    }

    const mapWatchDog = (position: OpenedPositionInfo, watchDog: PositionWatchDogStoredModel): ReactNode => {
        return <div style={{display: 'flex', marginBottom: '1em'}}>
            <Popconfirm
                style={{fontSize: "1.5em"}}
                title={`Удалить ${watchDog.type}?`}
                onConfirm={async () => await onDeleteWatchDog(position, watchDog.type)}
                okText="Да"
                okType={'danger'}
                cancelText="Нет"
            >
                <MinusCircleTwoTone twoToneColor={'#d9363e'} style={{fontSize: "1.5em", marginRight: '0.5em'}}/>
            </Popconfirm>

            <Button variant={'link'} style={{fontWeight: 'bold', fontSize: "1em"}} onClick={async () => await editWatchDogModalStore.showModal(watchDog.positionIdentifier, watchDog.type)}>
                {watchDog.type}
            </Button>
        </div>
    }

    const mapToRow = (item: OpenedPositionInfoWithWatchDogs): ReactNode => {

        const positionTypeIcon = item.openedPositionInfo.positionDirectionType === PositionDirectionTypeEnum.Long
            ? require('./img/long.png')
            : require('./img/short.png');

        const positionTypeIconAltText = item.openedPositionInfo.positionDirectionType === PositionDirectionTypeEnum.Long
            ? 'long'
            : 'short';

        return (
            <tr key={item.openedPositionInfo.identifier}>
                {/*Закрытие позиции*/}
                <td className="opened-position-cell">
                    <CloseCircleTwoTone twoToneColor={'#d9363e'} style={{fontSize: "3em"}} onClick={() => onClosePositionClick(item.openedPositionInfo)}/>
                </td>

                {/*Symbol*/}
                <td className="opened-position-cell">{item.openedPositionInfo.symbol}</td>

                {/*Тип*/}
                <td className="opened-position-cell">
                    <img alt={positionTypeIconAltText} src={positionTypeIcon} style={{width: "5em"}}/>
                </td>

                {/*Время открытия*/}
                <td className="opened-position-cell">{formatDateTimeRusStr(item.openedPositionInfo.openedTime)}</td>

                {/*Цена открытия*/}
                <td className="opened-position-cell">{item.openedPositionInfo.priceOpen}</td>

                {/*Текущая цена*/}
                <td className="opened-position-cell">{item.openedPositionInfo.currentPrice}</td>

                {/*Профит*/}
                <td className="opened-position-cell">
                    <div>
                        <div className={getColorClassName(item.openedPositionInfo.profit)}>{item.openedPositionInfo.profit}</div>

                        <div className={getColorClassName(item.openedPositionInfo.profitInPercents)}>
                            {`${(parseFloat(item.openedPositionInfo.profitInPercents.replace(',', '.')) ?? 0) >= 0 ? '+' : '-'}${item.openedPositionInfo.profitInPercentsAbs}%`}
                        </div>
                    </div>
                </td>

                {/*StopLoss*/}
                <td className="opened-position-cell">{mapToStopLossCell(item.openedPositionInfo)}</td>

                {/*WatchDogs*/}
                <td className="opened-position-cell">
                    <div>
                        {item.watchDogs.map(wd => mapWatchDog(item.openedPositionInfo, wd))}
                    </div>

                    <PlusCircleTwoTone style={{fontSize: "3em"}} onClick={() => onAddWatchDogClick(item.openedPositionInfo)}/>
                </td>

            </tr>
        );
    }

    return (
        <>
            {contextHolder}
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
                    <th className="opened-position-cell" scope="col">WatchDogs</th>
                </tr>
                </thead>

                <tbody>
                {openedPositionsStore.openedPositions.map(mapToRow)}
                </tbody>
            </table>

            <div style={{paddingTop: "1em", display: "flex", alignItems: "center"}}>
                <PlusCircleTwoTone style={{fontSize: "3em"}} onClick={onOpenPositionClick}/>

                <div style={{paddingLeft: "0.5em", fontSize: "1.2em", fontWeight: "bold", fontStyle: "italic"}}>Открыть позицию</div>
            </div>
        </>
    )
        ;
});

export default OpenedPositions;