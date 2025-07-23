import RootStore from "../../rootStore";
import {makeAutoObservable} from "mobx";
import {Nullable} from "../../../global/common/nullable";
import {OpenedPositionInfo} from "../../../models/openedPositions/openedPositionInfo";

export default class AddTriggerModalStore{
    private rootStore: RootStore;

    constructor(rootStore: RootStore) {
        makeAutoObservable(this);
        this.rootStore = rootStore;
    }

    isVisible: boolean = false;

    position: Nullable<OpenedPositionInfo>;

    addTrigger = async () => {
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