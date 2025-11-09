import React, {FC} from "react";
import {observer} from "mobx-react";
import {useStores} from "../../stores/hooks/useStores";
import {Button, Modal} from "antd";
import {PositionDirectionTypeEnum} from "../../models/openedPositions/positionDirectionTypeEnum";
import {formatDateTimeRusStr} from "../../utils/helpers/stringHelper";
import {Input} from "antd/lib";

const EditWatchDogModal: FC = observer(() => {
    const {TextArea} = Input;
    const {editWatchDogModalStore} = useStores();

    return (
        <Modal
            style={{minWidth: "50em"}}
            title={'Редактирование WatchDog'}
            closable={false}
            open={editWatchDogModalStore.isVisible}
            footer={[
                <Button key="updateWatchDog" type="primary" onClick={async () => await editWatchDogModalStore.updateWatchDog()}>
                    Обновить WatchDog
                </Button>,
                <Button key="cancel" type="default" onClick={editWatchDogModalStore.hideModal}>
                    Отмена
                </Button>,
            ]}>
            <div style={{fontSize: "large", fontWeight: "bold", fontFamily: "cursive"}}>
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