import RootStore from "../rootStore";
import {makeAutoObservable} from "mobx";
import DealsHistoryApi from "../../api/dealsHistoryApi";
import ClosedPositionModel from "../../models/dealsHistory/closedPositionModel";
import GetNewItemsRequest from "../../models/common/getNewItemsRequest";
import {lastOrDefault} from "../../utils/extensions/arrayExtensions";
import {getStartOfDayToday} from "../../utils/helpers/dateHelpers";

export default class DealsHistoryStore {
    private rootStore: RootStore;
    private dealsHistoryApi: DealsHistoryApi;

    constructor(rootStore: RootStore) {
        makeAutoObservable(this);
        this.rootStore = rootStore;
        this.dealsHistoryApi = new DealsHistoryApi(rootStore);
    }

    private closedPositionModels: ClosedPositionModel[] = [];

    getClosedPositionModels = (): ClosedPositionModel[] => {
        return this.closedPositionModels;
    };

    refreshClosedPositionModels = async () => {
        const request: GetNewItemsRequest = {
            dealerType: this.rootStore.appStateStore.getDealerType(),
            after: lastOrDefault(this.closedPositionModels)?.closeTime ?? getStartOfDayToday(),
            lastId: -1
        };

        const result = await this.dealsHistoryApi.getDealsHistoryAfter(request);

        if (result.isSuccess) {
            const newClosedPositionModels = result.payload ?? [];

            if (newClosedPositionModels.length > 0) {
                const buffer: ClosedPositionModel[] = [];
                buffer.push(...this.closedPositionModels)
                buffer.push(...newClosedPositionModels)
                this.closedPositionModels = buffer.sort((a, b) => b.closeTime.getTime() - a.closeTime.getTime())
            }
        }
    }
}