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

    const onDeleteWatchDog = async (position: OpenedPositionInfo, watchDogType: string) => {
        const result = await openedPositionsStore.deleteWatchDog(position, watchDogType);
        const noticeType: NoticeType = result.isSuccess ? 'success' : 'error';

        messageApi.open({
            type: noticeType,
            content: result.message
        });
    }

    const getColorClassName = (value: Nullable<number>): string => {
        return !!value && value >= 0 ? "opened-position-green-text" : "opened-position-red-text";
    }

    const mapToStopLossCell = (item: OpenedPositionInfo): ReactNode => {
        return (
            !!item.stopLossStr
                ? (<div style={{color: "black"}}>
                    <div>{`Value: ${item.stopLossStr}`}</div>
                    <div className={getColorClassName(item.ifStopLossFiredProfitInPercents)}>
                        {`${(item.ifStopLossFiredProfitInPercents ?? 0) >= 0 ? '+' : '-'}${item.ifStopLossFiredProfitInPercentsAbsStr}%`}
                    </div>
                </div>)
                : (<div style={{color: "red"}}>!!! ОТСУТСТВУЕТ !!!</div>)
        );
    }

    const mapWatchDog = (position: OpenedPositionInfo, watchDog: PositionWatchDogStoredModel): ReactNode => {
        return <div style={{display: 'flex', marginBottom: '1em'}}>
            <Popconfirm
                style={{fontSize: "1.5em"}}
                title={`Удалить ${watchDog.typeDescription}?`}
                onConfirm={async () => await onDeleteWatchDog(position, watchDog.type)}
                okText="Да"
                okType={'danger'}
                cancelText="Нет"
            >
                <MinusCircleTwoTone twoToneColor={'#d9363e'} style={{fontSize: "1.5em", marginRight: '0.6em'}}/>
            </Popconfirm>

            <Button variant={'link'} style={{fontSize: "1em"}} onClick={async () => await editWatchDogModalStore.showModal(watchDog.positionIdentifier, watchDog.type)}>
                {watchDog.typeDescription}
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

                {/*Объем*/}
                <td className="opened-position-cell">{item.openedPositionInfo.volumeStr}</td>

                {/*Цена открытия*/}
                <td className="opened-position-cell">{item.openedPositionInfo.priceOpenStr}</td>

                {/*Текущая цена*/}
                <td className="opened-position-cell">{item.openedPositionInfo.currentPriceStr}</td>

                {/*Профит*/}
                <td className="opened-position-cell">
                    <div>
                        <div className={getColorClassName(item.openedPositionInfo.profit)}>{item.openedPositionInfo.profitStr}</div>

                        <div className={getColorClassName(item.openedPositionInfo.profitInPercents)}>
                            {`${item.openedPositionInfo.profitInPercents >= 0 ? '+' : '-'}${item.openedPositionInfo.profitInPercentsAbsStr}%`}
                        </div>
                    </div>
                </td>

                {/*StopLoss*/}
                <td className="opened-position-cell">{mapToStopLossCell(item.openedPositionInfo)}</td>

                {/*WatchDogs*/}
                <td className="opened-position-cell">
                    <div style={{display: 'flex', alignItems: 'center'}}>
                        <div>
                            {item.watchDogs.map(wd => mapWatchDog(item.openedPositionInfo, wd))}
                        </div>

                        <div style={{marginRight: '1em', marginLeft: 'auto'}}>
                            <PlusCircleTwoTone style={{fontSize: "3em"}} onClick={() => onAddWatchDogClick(item.openedPositionInfo)}/>
                        </div>

                    </div>
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
                    <th className="opened-position-cell" scope="col" style={{width: "5%"}}>Объем</th>
                    <th className="opened-position-cell" scope="col" style={{width: "5%"}}>Цена открытия</th>
                    <th className="opened-position-cell" scope="col" style={{width: "5%"}}>Текущая цена</th>
                    <th className="opened-position-cell" scope="col" style={{width: "5%"}}>Профит</th>
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

                <div style={{paddingLeft: "0.5em", fontSize: "1.2em"}}>Открыть позицию</div>
            </div>
        </>
    )
        ;
});

export default OpenedPositions;