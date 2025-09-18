import React, {FC, useState} from "react";
import {observer} from "mobx-react";
import {useStores} from "../../stores/hooks/useStores";
import {Button, InputNumber, Modal, Select} from "antd";
import {PositionDirectionTypeEnum} from "../../models/openedPositions/positionDirectionTypeEnum";

const OpenPositionModal: FC = observer(() => {
    const {openPositionModalStore, sharedStore} = useStores();

    const [disableRefreshButton, setDisableRefreshButton] = useState(false);

    const checkPosition = async () => {
        try {
            setDisableRefreshButton(true);
            await openPositionModalStore.checkPosition();
        } finally {
            setDisableRefreshButton(false);
        }
    };

    const getSymbols = () => {
        return sharedStore.getMarketSymbols().map(item =>
            ({
                value: item.symbol,
                label: item.symbol
            }));
    }

    return (
        <Modal
            style={{minWidth: "50em"}}
            title={'Открытие позиции'}
            closable={false}
            open={openPositionModalStore.isVisible}
            footer={[
                <Button key="openPosition" type="primary" onClick={openPositionModalStore.openPosition} disabled={!openPositionModalStore.allCorrect}>
                    Открыть позицию
                </Button>,
                <Button key="checkPosition" type="primary" onClick={checkPosition} disabled={disableRefreshButton}>
                    Проверить
                </Button>,
                <Button key="cancel" type="default" onClick={openPositionModalStore.hideModal}>
                    Отмена
                </Button>,
            ]}>
            <div style={{fontSize: "large", fontWeight: "bold", fontFamily: "cursive"}}>

                <div style={{display: "flex"}}>
                    <div style={{paddingRight: "0.5em"}}>Инструмент:</div>

                    <Select
                        showSearch
                        style={{width: "15em"}}
                        placeholder="Выбор инструмента"
                        optionFilterProp="label"
                        filterSort={(optionA, optionB) => (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())}
                        options={getSymbols()}
                        value={openPositionModalStore.currentSymbol}
                        onChange={openPositionModalStore.setCurrentSymbol}
                    />
                </div>

                <div style={{display: "flex", paddingTop: "0.5em"}}>
                    <div style={{paddingRight: "0.5em"}}>Тип сделки:</div>

                    <Select
                        style={{width: "7em"}}
                        options={[
                            {
                                value: PositionDirectionTypeEnum.Long,
                                label: PositionDirectionTypeEnum.Long,
                            },
                            {
                                value: PositionDirectionTypeEnum.Short,
                                label: PositionDirectionTypeEnum.Short,
                            }
                        ]}
                        value={openPositionModalStore.positionType}
                        onChange={openPositionModalStore.setPositionType}
                    />
                </div>

                <div style={{display: "flex", paddingTop: "0.5em"}}>
                    <div style={{paddingRight: "0.5em"}}>Объем (в лотах):</div>

                    <InputNumber<string>
                        style={{width: "7em"}}
                        value={openPositionModalStore.inLotsSize.toString()}
                        min="0"
                        max="10"
                        step="0.01"
                        precision={2}
                        onChange={openPositionModalStore.setInLotsSize}
                        stringMode
                    />
                </div>

                <div style={{display: "flex", paddingTop: "0.5em"}}>
                    <div style={{paddingRight: "0.5em"}}>Значение StopLoss:</div>

                    <InputNumber<string>
                        style={{width: "10em"}}
                        value={openPositionModalStore.stopLossValue?.toString() ?? ''}
                        min="0"
                        max="1000000"
                        // step="0.01"
                        precision={6}
                        onChange={openPositionModalStore.setStopLossValue}
                        stringMode
                    />
                </div>

                <div style={{display: "flex", paddingTop: "0.5em"}}>
                    <div style={{paddingRight: "0.5em"}}>Текущая цена:</div>

                    <div>{openPositionModalStore.currentPriceStr}</div>
                </div>

                <div style={{display: "flex", paddingTop: "0.5em"}}>
                    <div style={{paddingRight: "0.5em"}}>Потери при срабатывании StopLoss:</div>

                    <div style={{color: openPositionModalStore.lossPercentIfStopLossFiredIsValid ? "darkgreen" : "red"}}>
                        {openPositionModalStore.lossValueIfStopLossFiredAbsStr.length > 0 ? `${openPositionModalStore.lossValueIfStopLossFiredAbsStr} (${openPositionModalStore.lossPercentIfStopLossFiredAbsStr}%)` : ''}
                    </div>
                </div>

                <div style={{display: "flex", paddingTop: "0.5em"}}>
                    <div style={{paddingRight: "0.5em"}}>Требуемая маржа:</div>

                    <div>{openPositionModalStore.marginStr}</div>
                </div>

                <div style={{display: "flex", paddingTop: "0.5em"}}>
                    <div style={{paddingRight: "0.5em"}}>Свободная маржа:</div>

                    <div>{openPositionModalStore.marginFreeStr}</div>
                </div>

                <div style={{display: "flex", paddingTop: "0.5em"}}>
                    <div style={{paddingRight: "0.5em"}}>Отношение потерь StopLoss к свободной марже:</div>

                    <div style={{color: openPositionModalStore.lossDivMarginFreeIsValid ? "darkgreen" : "red"}}>
                        {openPositionModalStore.lossDivMarginFreePercentStr.length > 0 ? `${openPositionModalStore.lossDivMarginFreePercentStr}%` : ''}
                    </div>
                </div>

                <hr></hr>

                <div style={{paddingBottom: "2em", color: openPositionModalStore.allCorrect ? "darkgreen" : "red"}}>
                    {openPositionModalStore.notValidReasons.map(reason => (
                        <div>{reason}</div>
                    ))}
                </div>

            </div>
        </Modal>
    );
});

export default OpenPositionModal;