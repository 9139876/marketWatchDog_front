import React, {FC} from "react";
import {observer} from "mobx-react";
import {useStores} from "../../stores/hooks/useStores";
import {Modal} from "antd";
import {PositionDirectionTypeEnum} from "../../models/openedPositions/positionDirectionTypeEnum";
import {formatDateTimeRusStr} from "../../utils/helpers/stringHelper";
import {Input} from "antd/lib";
import strongButtonStyles from "../../customControls/strongButton.module.css";
import StrongButton from "../../customControls/strongButton";

const EditWatchDogModal: FC = observer(() => {
    const {TextArea} = Input;
    const {editWatchDogModalStore} = useStores();

    return (
        <Modal
            style={{minWidth: "50em", border: '2px solid', borderRadius: '0'}}
            title={(<div style={{fontSize: 'xx-large'}}>{`Редактирование ${editWatchDogModalStore.watchDog?.typeDescription}`}</div>)}
            closable={false}
            open={editWatchDogModalStore.isVisible}
            footer={[
                <StrongButton className={strongButtonStyles.greenButton} key="updateWatchDog" onClick={async () => await editWatchDogModalStore.updateWatchDog()}>
                    Обновить WatchDog
                </StrongButton>,
                <StrongButton className={strongButtonStyles.grayButton} key="cancel" onClick={editWatchDogModalStore.hideModal}>
                    Отмена
                </StrongButton>,
            ]}>
            <div style={{fontSize: "large"}}>
                <div style={{fontSize: "larger", textDecoration: "underline"}}>Позиция:</div>
                <div style={{color: "blue"}}>
                    <div>{`Инструмент: ${editWatchDogModalStore.position?.symbol}`}</div>
                    <div>{`Тип: ${editWatchDogModalStore.position?.positionDirectionType === PositionDirectionTypeEnum.Long ? 'Long' : 'Short'}`}</div>
                    <div>{`Открыта: ${formatDateTimeRusStr(editWatchDogModalStore.position?.openedTime)}`}</div>
                </div>
                <hr></hr>

                <TextArea
                    rows={(editWatchDogModalStore.watchDog?.serialized ?? '').split('\n').length}
                    value={editWatchDogModalStore.watchDog?.serialized}
                    onChange={editWatchDogModalStore.editCurrentPositionWatchDogSerializedParams}
                />

            </div>
        </Modal>
    );
});

export default EditWatchDogModal;