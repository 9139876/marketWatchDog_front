import RootStore from "../../rootStore";
import {makeAutoObservable} from "mobx";
import {MarketSignalSettingsItem} from "../../../models/marketSignalSettings/marketSignalSettingsItem";
import {SelectedEnumItem} from "../../../global/selectedEnumItem";
import {TimeFrameEnum} from "../../../models/marketSignalSettings/timeFrameEnum";
import MarketSignalSettingsApi from "../../../api/marketSignalSettingsApi";

export default class EditMarketSignalSettingsModalStore {
    private rootStore: RootStore;
    private marketSignalSettingsApi: MarketSignalSettingsApi;

    constructor(rootStore: RootStore) {
        makeAutoObservable(this);
        this.rootStore = rootStore;
        this.marketSignalSettingsApi = new MarketSignalSettingsApi(rootStore);
    }

    dealer: string = '';
    symbol: string = '';
    isVisible: boolean = false;

    selectedDivergenceTimeFrames: SelectedEnumItem<TimeFrameEnum>[] = [];
    selectedDonchianAndRsiTimeFrames: SelectedEnumItem<TimeFrameEnum>[] = [];

    changeSelectedDivergenceTimeFrames = (selectedEvents: TimeFrameEnum[]) => {
        this.selectedDivergenceTimeFrames.forEach(x => x.isSelected = selectedEvents.includes(x.value));
    }

    changeSelectedDonchianAndRsiTimeFrames = (selectedEvents: TimeFrameEnum[]) => {
        this.selectedDonchianAndRsiTimeFrames.forEach(x => x.isSelected = selectedEvents.includes(x.value));
    }

    saveAndClose = async () => {
        try {
            const item: MarketSignalSettingsItem =
                {
                    dealer: this.dealer,
                    symbol: this.symbol,
                    divergence: this.selectedDivergenceTimeFrames,
                    donchianAndRsi: this.selectedDonchianAndRsiTimeFrames,
                    //-----
                    divergenceStr: "",
                    donchianAndRsiStr: "",
                    havingSignal: false,
                    key: null
                };

            const result = await this.marketSignalSettingsApi.update(item);

            if (result.isSuccess) {
                this.rootStore.marketSignalSettingsStore.setMarketSignalSettingsItems(result.payload);
            }
        } finally {
            this.hideModal();
        }
    };

    showModal = (currentItem: MarketSignalSettingsItem) => {
        this.dealer = currentItem.dealer;
        this.symbol = currentItem.symbol;
        this.selectedDivergenceTimeFrames = JSON.parse(JSON.stringify(currentItem.divergence)); //иначе значения сохраняются, т.к. элементы массива объекты - ссылочные типы
        this.selectedDonchianAndRsiTimeFrames = JSON.parse(JSON.stringify(currentItem.donchianAndRsi));
        this.isVisible = true;
    };

    hideModal = () => {
        this.isVisible = false;
        this.dealer = '';
        this.symbol = '';
        this.selectedDivergenceTimeFrames = [];
        this.selectedDonchianAndRsiTimeFrames = [];
    };
}