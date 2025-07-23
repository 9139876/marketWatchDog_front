import RootStore from "../../rootStore";
import {makeAutoObservable} from "mobx";
import {OpenedPositionInfo} from "../../../models/openedPositions/openedPositionInfo";
import {Nullable} from "../../../global/common/nullable";

export default class ClosePositionModalStore {
    private rootStore: RootStore;

    constructor(rootStore: RootStore) {
        makeAutoObservable(this);
        this.rootStore = rootStore;
    }

    isVisible: boolean = false;

    position: Nullable<OpenedPositionInfo>;

    closePosition = async () => {
        //ToDo call api !!!
        this.hideModal();
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