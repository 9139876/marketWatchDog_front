import RootStore from "../../rootStore";
import {makeAutoObservable} from "mobx";
import {OpenedPositionInfo} from "../../../models/openedPositions/openedPositionInfo";
import {Nullable} from "../../../global/common/nullable";
import OpenPositionApi from "../../../api/openPositionApi";

export default class ClosePositionModalStore {
    private rootStore: RootStore;
    private openPositionApi: OpenPositionApi;

    constructor(rootStore: RootStore) {
        makeAutoObservable(this);
        this.rootStore = rootStore;
        this.openPositionApi = new OpenPositionApi(rootStore);
    }

    isVisible: boolean = false;

    position: Nullable<OpenedPositionInfo>;

    closePosition = async () => {
        const currentSymbol = this.position?.symbol ?? '';
        const result = await this.openPositionApi.closePosition(this.rootStore.appStateStore.getDealerType(), currentSymbol);

        let message: string;

        if (result.isSuccess) {
            message = `Позиция по ${currentSymbol} успешно закрыта!`;
        } else {
            message = `Ошибка при закрытии позиции по ${currentSymbol} - ${result.errorMessage}`;
        }

        alert(message);

        if (result.isSuccess) {
            this.hideModal();
        }
    }

    showModal = (position: OpenedPositionInfo) => {
        this.position = position;
        this.isVisible = true;
    };

    hideModal = () => {
        this.isVisible = false;
        this.position = null;
    };
}