import RootStore from "../../rootStore";
import {makeAutoObservable} from "mobx";
import {Nullable} from "../../../global/common/nullable";
import {OpenedPositionInfo} from "../../../models/openedPositions/openedPositionInfo";
import PositionWatchDogApi from "../../../api/positionWatchDogApi";
import PositionWatchDogStoredModel from "../../../models/watchDog/positionWatchDogStoredModel";
import React from "react";
import {firstOrDefault} from "../../../utils/extensions/arrayExtensions";

export default class AddWatchDogModalStore {
    private rootStore: RootStore;
    private positionWatchDogApi: PositionWatchDogApi;

    constructor(rootStore: RootStore) {
        makeAutoObservable(this);
        this.rootStore = rootStore;
        this.positionWatchDogApi = new PositionWatchDogApi(rootStore);
    }

    isVisible: boolean = false;

    position: Nullable<OpenedPositionInfo>;

    positionWatchDogs: PositionWatchDogStoredModel[] = [];

    currentPositionWatchDog: Nullable<PositionWatchDogStoredModel>;

    addWatchDog = async () => {
        if (!this.currentPositionWatchDog) {
            return;
        }

        const result = await this.positionWatchDogApi.addPositionWatchDog(this.currentPositionWatchDog);

        const message = result.isSuccess
            ? `${this.currentPositionWatchDog.typeDescription} успешно создан`
            : `Ошибка при создании ${this.currentPositionWatchDog.typeDescription} - ${result.errorMessage}`;

        alert(message);

        if (result.isSuccess) {
            this.rootStore.openedPositionsStore.updatePositionWatchDogs(this.position?.identifier ?? -1, result.payload ?? []);
            this.hideModal();
        }
    }

    showModal = async (position: OpenedPositionInfo) => {
        this.position = position;
        this.isVisible = true;

        const apiResponse = await this.positionWatchDogApi.getPositionWatchDogParamsExamples(this.rootStore.appStateStore.getDealerType(), position.identifier);

        if (apiResponse.isSuccess) {
            this.positionWatchDogs = apiResponse.payload ?? [];
        }
    };

    setCurrentPositionWatchDog = (value: string | null): void => {
        if (!value) {
            this.currentPositionWatchDog = null;
            return;
        }

        this.currentPositionWatchDog = firstOrDefault(this.positionWatchDogs, x => x.type === value);
    }

    editCurrentPositionWatchDogSerializedParams = (value: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
        if (!!this.currentPositionWatchDog) {
            this.currentPositionWatchDog.serialized = value.target.value;
        }
    }

    hideModal = () => {
        this.isVisible = false;
        this.position = null;
        this.positionWatchDogs = [];
        this.currentPositionWatchDog = null;
    };
}