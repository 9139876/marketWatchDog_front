import RootStore from "../rootStore";
import {makeAutoObservable} from "mobx";
import DealsHistoryApi from "../../api/dealsHistoryApi";
import ClosedPositionModel from "../../models/dealsHistory/closedPositionModel";
import GetNewItemsRequest from "../../models/common/getNewItemsRequest";
import {firstOrDefault} from "../../utils/extensions/arrayExtensions";
import {getStartOfDayBeforeToday} from "../../utils/helpers/dateHelpers";
import GroupItem from "../../models/marketSignal/groupItem";
import {formatDateRusStr} from "../../utils/helpers/stringHelper";

export default class DealsHistoryStore {
    private rootStore: RootStore;
    private dealsHistoryApi: DealsHistoryApi;

    constructor(rootStore: RootStore) {
        makeAutoObservable(this);
        this.rootStore = rootStore;
        this.dealsHistoryApi = new DealsHistoryApi(rootStore);
    }

    private closedPositionModels: ClosedPositionModel[] = [];

    closedPositionModelGroupsForShow: GroupItem<ClosedPositionModel>[] = [];

    refreshClosedPositionModels = async () => {
        const request: GetNewItemsRequest = {
            dealerType: this.rootStore.appStateStore.getDealerType(),
            after: firstOrDefault(this.closedPositionModels)?.closeTime ?? getStartOfDayBeforeToday(100),
            lastId: -1
        };

        const result = await this.dealsHistoryApi.getDealsHistoryAfter(request);

        if (result.isSuccess) {
            const newClosedPositionModels = result.payload ?? [];

            if (newClosedPositionModels.length > 0) {
                const buffer: ClosedPositionModel[] = [];
                buffer.push(...this.closedPositionModels)
                buffer.push(...newClosedPositionModels)

                this.closedPositionModels = buffer.sort((a, b) => b.closeTime.getTime() - a.closeTime.getTime());
                this.updateClosedPositionModelGroupsForShow();
            }
        }
    }

    fullRefreshClosedPositionModels = async () => {
        const request: GetNewItemsRequest = {
            dealerType: this.rootStore.appStateStore.getDealerType(),
            after: getStartOfDayBeforeToday(3660),
            lastId: -1
        };

        const result = await this.dealsHistoryApi.getDealsHistoryAfter(request);

        if (result.isSuccess) {
            const newClosedPositionModels = result.payload ?? [];

            if (newClosedPositionModels.length > 0) {
                this.closedPositionModels = newClosedPositionModels.sort((a, b) => b.closeTime.getTime() - a.closeTime.getTime());
                this.updateClosedPositionModelGroupsForShow();
            }
        }
    }

    private updateClosedPositionModelGroupsForShow(): void {
        const buffer: GroupItem<ClosedPositionModel>[] = [];

        this.closedPositionModels
            .forEach(item => {
                const dateKey = formatDateRusStr(item.closeTime)
                let group = firstOrDefault(buffer, x => x.key === dateKey);

                if (!group) {
                    group = {key: dateKey, items: []};
                    buffer.push(group);
                }

                group!.items.push(item);
            });

        this.closedPositionModelGroupsForShow = buffer
            .sort((a, b) => b.items[0].closeTime.getTime() - a.items[0].closeTime.getTime());
    }
}