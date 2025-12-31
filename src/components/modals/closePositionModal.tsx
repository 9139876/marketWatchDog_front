import React, {FC} from "react";
import {observer} from "mobx-react";
import {useStores} from "../../stores/hooks/useStores";
import {Modal} from "antd";
import {PositionDirectionTypeEnum} from "../../models/openedPositions/positionDirectionTypeEnum";
import {Nullable} from "../../global/common/nullable";
import strongButtonStyles from "../../customControls/strongButton.module.css";
import StrongButton from "../../customControls/strongButton";

const ClosePositionModal: FC = observer(() => {
    const {closePositionModalStore} = useStores();

    const getColorClassName = (value: Nullable<number>): string => {
        return !!value && value >= 0 ? "opened-position-green-text" : "opened-position-red-text";
    }

    return (
        <Modal
            style={{minWidth: "50em", border: '2px solid', borderRadius: '0'}}
            title={(<div style={{fontSize: 'xx-large'}}>Закрытие позиции</div>)}
            closable={false}
            open={closePositionModalStore.isVisible}
            footer={[
                <StrongButton className={strongButtonStyles.redButton} key="closePosition" onClick={closePositionModalStore.closePosition}>
                    Закрыть позицию
                </StrongButton>,
                <StrongButton className={strongButtonStyles.grayButton} key="cancel" onClick={closePositionModalStore.hideModal}>
                    Отмена
                </StrongButton>,
            ]}>
            <div style={{fontSize: "large", fontWeight: "bold"}}>
                <div>{`Инструмент: ${closePositionModalStore.position?.symbol}`}</div>
                <div>{`Тип: ${closePositionModalStore.position?.positionDirectionType === PositionDirectionTypeEnum.Long ? 'Long' : 'Short'}`}</div>
                <div>{`Открыта: ${closePositionModalStore.position?.openedTime}`}</div>

                <div className={getColorClassName(closePositionModalStore.position?.profit)}>
                    {`Профит: ${closePositionModalStore.position?.profitStr} (${(closePositionModalStore.position?.profit ?? 0) >= 0 ? '+' : '-'}${closePositionModalStore.position?.profitInPercentsAbsStr}%)`}
                </div>
            </div>
        </Modal>
    );
});

export default ClosePositionModal;