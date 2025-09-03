import {observer} from "mobx-react";
import {Button, Checkbox, Modal} from "antd";
import {FC} from "react";
import React from "react";
import {useStores} from "../../stores/hooks/useStores";
import styles from "../../app.module.css";
import {TimeFrameEnum} from "../../models/enums/timeFrameEnum";


const EditMarketSignalSettingsModal: FC = observer(() => {
    const {editMarketSignalSettingsModalStore} = useStores();

    const onChangeDivergence = (checkedValues: string[]) => {
        const selectedTypes = checkedValues.map(x => TimeFrameEnum[x as keyof typeof TimeFrameEnum]);
        editMarketSignalSettingsModalStore.changeSelectedDivergenceTimeFrames(selectedTypes);
    };

    const onChangeDonchianAndRsi = (checkedValues: string[]) => {
        const selectedTypes = checkedValues.map(x => TimeFrameEnum[x as keyof typeof TimeFrameEnum]);
        editMarketSignalSettingsModalStore.changeSelectedDonchianAndRsiTimeFrames(selectedTypes);
    };

    return (
        <Modal
            style={{minWidth: "50em"}}
            title={`Редактирование сигналов для ${editMarketSignalSettingsModalStore.symbol} (${editMarketSignalSettingsModalStore.dealer})`}
            closable={false}
            open={editMarketSignalSettingsModalStore.isVisible}
            footer={[
                <Button key="withSave" type="primary" onClick={editMarketSignalSettingsModalStore.saveAndClose}>
                    Сохранить и закрыть
                </Button>,
                <Button key="cancel" type="default" onClick={editMarketSignalSettingsModalStore.hideModal}>
                    Отмена
                </Button>,
            ]}>
            <div>
                <div className={styles.checkboxGroupTitle}>Divergence</div>
                <Checkbox.Group
                    options={editMarketSignalSettingsModalStore.selectedDivergenceTimeFrames.map(x => x.value)}
                    value={editMarketSignalSettingsModalStore.selectedDivergenceTimeFrames.filter(x => x.isSelected).map(x => x.value)}
                    onChange={onChangeDivergence}
                />
            </div>
            <div>
                <div className={styles.checkboxGroupTitle}>DonchianAndRsi</div>
                <Checkbox.Group
                    options={editMarketSignalSettingsModalStore.selectedDonchianAndRsiTimeFrames.map(x => x.value)}
                    value={editMarketSignalSettingsModalStore.selectedDonchianAndRsiTimeFrames.filter(x => x.isSelected).map(x => x.value)}
                    onChange={onChangeDonchianAndRsi}
                />
            </div>
        </Modal>
    );
});

export default EditMarketSignalSettingsModal;