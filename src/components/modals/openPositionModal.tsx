import React, {FC, useState} from "react";
import {observer} from "mobx-react";
import {useStores} from "../../stores/hooks/useStores";
import {InputNumber, Modal, Select} from "antd";
import {PositionDirectionTypeEnum} from "../../models/openedPositions/positionDirectionTypeEnum";
import StrongButton from "../../customControls/strongButton";
import strongButtonStyles from "../../customControls/strongButton.module.css";

const OpenPositionModal: FC = observer(() => {
    const {openPositionModalStore, sharedStore} = useStores();

    const [disableControls, setDisableControls] = useState(false);

    const checkPosition = async () => {
        try {
            setDisableControls(true);
            await openPositionModalStore.checkPosition();
        } finally {
            setDisableControls(false);
        }
    };

    const onSymbolChange = async (value: string | null) => {
        try {
            setDisableControls(true);
            await openPositionModalStore.setCurrentSymbol(value);
        } finally {
            setDisableControls(false);
        }
    }

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
            title={(<div style={{fontSize: 'xx-large'}}>Открытие позиции</div>)}
            closable={false}
            open={openPositionModalStore.isVisible}
            footer={[
                <StrongButton className={strongButtonStyles.greenButton} key="openPosition" onClick={openPositionModalStore.openPosition} disabled={!openPositionModalStore.allCorrect}>
                    Открыть позицию
                </StrongButton>,
                <StrongButton className={strongButtonStyles.greenButton} key="checkPosition" onClick={checkPosition} disabled={disableControls}>
                    Проверить
                </StrongButton>,
                <StrongButton className={strongButtonStyles.grayButton} key="cancel" onClick={openPositionModalStore.hideModal}>
                    Отмена
                </StrongButton>,
            ]}>
            <div style={{fontSize: "large"}}>

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
                        onChange={onSymbolChange}
                        disabled={disableControls}
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
                        min="0.01"
                        max="1000"
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

                    <div style={{color: openPositionModalStore.lossPercentIfStopLossFiredIsValid ? "green" : "red"}}>
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

                    <div style={{color: openPositionModalStore.lossDivMarginFreeIsValid ? "green" : "red"}}>
                        {openPositionModalStore.lossDivMarginFreePercentStr.length > 0 ? `${openPositionModalStore.lossDivMarginFreePercentStr}%` : ''}
                    </div>
                </div>

                <hr></hr>

                <div style={{paddingBottom: "2em", color: openPositionModalStore.allCorrect ? "green" : "red"}}>
                    {openPositionModalStore.notValidReasons.map(reason => (
                        <div>{reason}</div>
                    ))}
                </div>

            </div>
        </Modal>
    );
});

export default OpenPositionModal;