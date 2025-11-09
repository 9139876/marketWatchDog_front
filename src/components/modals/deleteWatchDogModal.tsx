import React, {FC} from "react";
import {observer} from "mobx-react";
import {useStores} from "../../stores/hooks/useStores";
import {Button, Modal} from "antd";
import {PositionDirectionTypeEnum} from "../../models/openedPositions/positionDirectionTypeEnum";
import {formatDateTimeRusStr} from "../../utils/helpers/stringHelper";

const DeleteWatchDogModal: FC = observer(() => {
    const {deleteWatchDogModalStore} = useStores();

    return (
        <Modal
            style={{minWidth: "50em"}}
            title={'Удаление WatchDog'}
            closable={false}
            open={deleteWatchDogModalStore.isVisible}
            footer={[
                <Button key="deleteWatchDog" type="primary" onClick={async () => await deleteWatchDogModalStore.deleteWatchDog()}>
                    Удалить WatchDog
                </Button>,
                <Button key="cancel" type="default" onClick={deleteWatchDogModalStore.hideModal}>
                    Отмена
                </Button>,
            ]}>
            <div style={{fontSize: "large", fontWeight: "bold", fontFamily: "cursive"}}>
                <div style={{fontSize: "larger", textDecoration: "underline"}}>Позиция:</div>
                <div style={{color: "blue"}}>
                    <div>{`Инструмент: ${deleteWatchDogModalStore.position?.symbol}`}</div>
                    <div>{`Тип: ${deleteWatchDogModalStore.position?.positionDirectionType === PositionDirectionTypeEnum.Long ? 'Long' : 'Short'}`}</div>
                    <div>{`Открыта: ${formatDateTimeRusStr(deleteWatchDogModalStore.position?.openedTime)}`}</div>
                    <hr/>
                    <div>{`WatchDog: ${deleteWatchDogModalStore.watchDogType}`}</div>
                </div>

            </div>
        </Modal>
    );
});

export default DeleteWatchDogModal;