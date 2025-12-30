import React, {FC} from "react";
import {observer} from "mobx-react";
import {useStores} from "../../stores/hooks/useStores";
import {Button, Modal, Select} from "antd";
import {PositionDirectionTypeEnum} from "../../models/openedPositions/positionDirectionTypeEnum";
import {formatDateTimeRusStr} from "../../utils/helpers/stringHelper";
import {Input} from "antd/lib";

const AddWatchDogModal: FC = observer(() => {
    const {TextArea} = Input;
    const {addWatchDogModalStore} = useStores();

    return (
        <Modal
            style={{minWidth: "50em"}}
            title={(<div style={{fontSize: 'xx-large'}}>Добавление WatchDog</div>)}
            closable={false}
            open={addWatchDogModalStore.isVisible}
            footer={[
                <Button key="addWatchDog" type="primary" disabled={!addWatchDogModalStore.currentPositionWatchDog} onClick={async () => await addWatchDogModalStore.addWatchDog()}>
                    Добавить WatchDog
                </Button>,
                <Button key="cancel" type="default" onClick={addWatchDogModalStore.hideModal}>
                    Отмена
                </Button>,
            ]}>
            <div style={{fontSize: "large"}}>
                <div style={{fontSize: "larger", textDecoration: "underline"}}>Позиция:</div>
                <div style={{color: "blue"}}>
                    <div>{`Инструмент: ${addWatchDogModalStore.position?.symbol}`}</div>
                    <div>{`Тип: ${addWatchDogModalStore.position?.positionDirectionType === PositionDirectionTypeEnum.Long ? 'Long' : 'Short'}`}</div>
                    <div>{`Открыта: ${formatDateTimeRusStr(addWatchDogModalStore.position?.openedTime)}`}</div>
                </div>
                <hr></hr>

                <Select
                    style={{width: 400, marginBottom: '1em'}}
                    value={addWatchDogModalStore.currentPositionWatchDog?.type}
                    onChange={addWatchDogModalStore.setCurrentPositionWatchDog}
                    options={addWatchDogModalStore.positionWatchDogs.map(x => ({value: x.type, label: x.typeDescription}))}
                />

                <TextArea
                    rows={(addWatchDogModalStore.currentPositionWatchDog?.serialized ?? '').split('\n').length}
                    value={addWatchDogModalStore.currentPositionWatchDog?.serialized}
                    onChange={addWatchDogModalStore.editCurrentPositionWatchDogSerializedParams}
                />

            </div>
        </Modal>
    );
});

export default AddWatchDogModal;