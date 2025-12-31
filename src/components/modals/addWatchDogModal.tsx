import React, {FC} from "react";
import {observer} from "mobx-react";
import {useStores} from "../../stores/hooks/useStores";
import {Modal, Select} from "antd";
import {PositionDirectionTypeEnum} from "../../models/openedPositions/positionDirectionTypeEnum";
import {formatDateTimeRusStr} from "../../utils/helpers/stringHelper";
import {Input} from "antd/lib";
import strongButtonStyles from "../../customControls/strongButton.module.css";
import StrongButton from "../../customControls/strongButton";

const AddWatchDogModal: FC = observer(() => {
    const {TextArea} = Input;
    const {addWatchDogModalStore} = useStores();

    return (
        <Modal
            style={{minWidth: "50em", border: '2px solid', borderRadius: '0'}}
            title={(<div style={{fontSize: 'xx-large'}}>Добавление WatchDog</div>)}
            closable={false}
            open={addWatchDogModalStore.isVisible}
            footer={[
                <StrongButton className={strongButtonStyles.greenButton} key="addWatchDog" disabled={!addWatchDogModalStore.currentPositionWatchDog} onClick={async () => await addWatchDogModalStore.addWatchDog()}>
                    Добавить WatchDog
                </StrongButton>,
                <StrongButton className={strongButtonStyles.grayButton} key="cancel" onClick={addWatchDogModalStore.hideModal}>
                    Отмена
                </StrongButton>,
            ]}>
            <div style={{fontSize: "large", fontWeight: "bold"}}>
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