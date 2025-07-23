import React, {FC} from "react";
import {observer} from "mobx-react";
import {useStores} from "../../stores/hooks/useStores";
import {Button, Modal} from "antd";
import {PositionDirectionTypeEnum} from "../../models/openedPositions/positionDirectionTypeEnum";

const AddTriggerModal: FC = observer(() => {
    const {addTriggerModalStore} = useStores();

    return (
        <Modal
            style={{minWidth: "50em"}}
            title={'Добавление триггера'}
            closable={false}
            open={addTriggerModalStore.isVisible}
            footer={[
                <Button key="addTrigger" type="primary" onClick={addTriggerModalStore.addTrigger}>
                    Добавить триггер
                </Button>,
                <Button key="cancel" type="default" onClick={addTriggerModalStore.hideModal}>
                    Отмена
                </Button>,
            ]}>
            <div style={{fontSize: "large", fontWeight: "bold", fontFamily: "cursive"}}>
                <div style={{fontSize: "larger", textDecoration:"underline"}}>Позиция:</div>
                <div style={{color:"blue"}}>
                    <div>{`Инструмент: ${addTriggerModalStore.position?.dealer} - ${addTriggerModalStore.position?.symbol}`}</div>
                    <div>{`Тип: ${addTriggerModalStore.position?.type == PositionDirectionTypeEnum.Long ? 'Long' : 'Short'}`}</div>
                    <div>{`Открыта: ${addTriggerModalStore.position?.openedTimeStr}`}</div>
                </div>
                <hr></hr>
            </div>
        </Modal>
    );
});

export default AddTriggerModal;