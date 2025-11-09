import React, {FC} from "react";
import {observer} from "mobx-react";
import {useStores} from "../../stores/hooks/useStores";
import {Button, Modal} from "antd";
import {PositionDirectionTypeEnum} from "../../models/openedPositions/positionDirectionTypeEnum";
import {Nullable} from "../../global/common/nullable";

const ClosePositionModal: FC = observer(() => {
    const {closePositionModalStore} = useStores();

    const getColorClassName = (value: Nullable<string>): string => {
        return !!value && parseFloat(value) >= 0 ? "opened-position-green-text" : "opened-position-red-text";
    }

    return (
        <Modal
            style={{minWidth: "50em"}}
            title={'Закрытие позиции'}
            closable={false}
            open={closePositionModalStore.isVisible}
            footer={[
                <Button key="closePosition" type="primary" danger onClick={closePositionModalStore.closePosition}>
                    Закрыть позицию
                </Button>,
                <Button key="cancel" type="default" onClick={closePositionModalStore.hideModal}>
                    Отмена
                </Button>,
            ]}>
            <div style={{fontSize: "large", fontWeight: "bold", fontFamily: "cursive"}}>
                <div>{`Инструмент: ${closePositionModalStore.position?.symbol}`}</div>
                <div>{`Тип: ${closePositionModalStore.position?.positionDirectionType === PositionDirectionTypeEnum.Long ? 'Long' : 'Short'}`}</div>
                <div>{`Открыта: ${closePositionModalStore.position?.openedTime}`}</div>

                <div className={getColorClassName(closePositionModalStore.position?.profit)}>
                    {`Профит: ${closePositionModalStore.position?.profit} (${parseFloat(closePositionModalStore.position?.profit ?? '0') >= 0 ? '+' : '-'}${closePositionModalStore.position?.profitInPercentsAbs}%)`}
                </div>
            </div>
        </Modal>
    );
});

export default ClosePositionModal;