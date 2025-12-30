import {observer} from "mobx-react";
import {Checkbox, Modal} from "antd";
import {FC} from "react";
import React from "react";
import {useStores} from "../../stores/hooks/useStores";
import styles from "../../app.module.css";
import {TimeFrameEnum} from "../../models/enums/timeFrameEnum";
import strongButtonStyles from "../../customControls/strongButton.module.css";
import StrongButton from "../../customControls/strongButton";

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
            style={{minWidth: "50em", border: '2px solid', borderRadius: '0'}}
            title={(<div style={{fontSize: 'xx-large'}}>{`Редактирование сигналов для ${editMarketSignalSettingsModalStore.symbol}`}</div>)}
            closable={false}
            open={editMarketSignalSettingsModalStore.isVisible}
            footer={[
                <StrongButton className={strongButtonStyles.greenButton} key="withSave" onClick={editMarketSignalSettingsModalStore.saveAndClose}>
                    Сохранить и закрыть
                </StrongButton>,
                <StrongButton className={strongButtonStyles.grayButton} key="cancel" onClick={editMarketSignalSettingsModalStore.hideModal}>
                    Отмена
                </StrongButton>,
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