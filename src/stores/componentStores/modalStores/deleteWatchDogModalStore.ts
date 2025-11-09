import RootStore from "../../rootStore";
import PositionWatchDogApi from "../../../api/positionWatchDogApi";
import {makeAutoObservable} from "mobx";
import {PositionWatchDogTypeEnum} from "../../../models/watchDog/positionWatchDogTypeEnum";
import {Nullable} from "../../../global/common/nullable";
import {OpenedPositionInfo} from "../../../models/openedPositions/openedPositionInfo";

export default class DeleteWatchDogModalStore {
    private rootStore: RootStore;
    private positionWatchDogApi: PositionWatchDogApi;

    constructor(rootStore: RootStore) {
        makeAutoObservable(this);
        this.rootStore = rootStore;
        this.positionWatchDogApi = new PositionWatchDogApi(rootStore);
    }

    isVisible: boolean = false;
    position: Nullable<OpenedPositionInfo>;
    watchDogType: Nullable<PositionWatchDogTypeEnum>;

    showModal = (position: OpenedPositionInfo, watchDogType: PositionWatchDogTypeEnum) => {
        this.position = position;
        this.watchDogType = watchDogType;
        this.isVisible = true;
    };

    deleteWatchDog = async () => {
        if (!this.position || !this.watchDogType)
            return;

        const result = await this.positionWatchDogApi.deletePositionWatchDog(this.rootStore.appStateStore.getDealerType(), this.position.identifier, this.watchDogType);

        const message = result.isSuccess
            ? `${this.watchDogType} успешно удален`
            : `Ошибка при удалении ${this.watchDogType} - ${result.errorMessage}`;

        alert(message);

        if (result.isSuccess) {
            this.rootStore.openedPositionsStore.updatePositionWatchDogs(this.position.identifier, result.payload ?? []);
            this.hideModal();
        }
    }

    hideModal = () => {
        this.position = null;
        this.watchDogType = null;
        this.isVisible = false;
    }
}