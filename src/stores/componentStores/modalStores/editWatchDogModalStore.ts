import RootStore from "../../rootStore";
import PositionWatchDogApi from "../../../api/positionWatchDogApi";
import {makeAutoObservable} from "mobx";
import {PositionWatchDogTypeEnum} from "../../../models/watchDog/positionWatchDogTypeEnum";
import {Nullable} from "../../../global/common/nullable";
import {OpenedPositionInfo} from "../../../models/openedPositions/openedPositionInfo";
import PositionWatchDogStoredModel from "../../../models/watchDog/positionWatchDogStoredModel";
import {firstOrDefault} from "../../../utils/extensions/arrayExtensions";
import React from "react";

export default class EditWatchDogModalStore {
    private rootStore: RootStore;
    private positionWatchDogApi: PositionWatchDogApi;

    constructor(rootStore: RootStore) {
        makeAutoObservable(this);
        this.rootStore = rootStore;
        this.positionWatchDogApi = new PositionWatchDogApi(rootStore);
    }

    isVisible: boolean = false;

    position: Nullable<OpenedPositionInfo>;
    watchDog: Nullable<PositionWatchDogStoredModel>;

    showModal = async (positionIdentifier: number, watchDogType: PositionWatchDogTypeEnum) => {
        const position = firstOrDefault(this.rootStore.openedPositionsStore.openedPositions, op => op.openedPositionInfo.identifier === positionIdentifier);

        if (!position) {
            this.hideModal();
            alert(`Позиция с идентификатором ${positionIdentifier} не найдена`);
            return;
        }

        this.position = position.openedPositionInfo;

        const watchDog = firstOrDefault(position.watchDogs, wd => wd.type === watchDogType);

        if (!watchDog) {
            this.hideModal();
            alert(`${watchDogType} для позиции с идентификатором ${positionIdentifier} не найден`);
            return;
        }

        this.watchDog = watchDog;
        this.isVisible = true;
    };

    updateWatchDog = async () => {
        if (!this.watchDog) {
            return;
        }

        const result = await this.positionWatchDogApi.updatePositionWatchDog(this.watchDog);

        const message = result.isSuccess
            ? `${this.watchDog.type} успешно изменен`
            : `Ошибка при редактировании ${this.watchDog.type} - ${result.errorMessage}`;

        alert(message);

        if (result.isSuccess) {
            this.hideModal();
        }
    }

    editCurrentPositionWatchDogSerializedParams = (value: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
        if (!!this.watchDog) {
            this.watchDog.serialized = value.target.value;
        }
    }

    hideModal = () => {
        this.position = null;
        this.watchDog = null;
        this.isVisible = false;
    }
}