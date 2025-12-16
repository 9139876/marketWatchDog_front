import RootStore from "../rootStore";
import {makeAutoObservable} from "mobx";
import ServerHealthCheckApi from "../../api/serverHealthCheckApi";
import {DealerTypeEnum} from "../../models/enums/dealerTypeEnum";

export default class AppStateStore {
    private rootStore: RootStore;
    private serverHealthCheckApi: ServerHealthCheckApi;
    private connectedToServer: boolean = false;
    private backendOrigin: string = 'http://wd-back-dev.loc';
    private dealerTypeEnum: DealerTypeEnum = DealerTypeEnum.AlfaForex;
    updateInterval: number = 5;
    lastUpdatedTime: Date = new Date(1991, 0, 1);

    constructor(rootStore: RootStore) {
        makeAutoObservable(this);
        this.rootStore = rootStore;
        this.serverHealthCheckApi = new ServerHealthCheckApi(rootStore);
    }

    getConnectedToServerStatus = (): boolean => {
        return this.connectedToServer;
    }

    getDealerType = (): DealerTypeEnum => {
        return this.dealerTypeEnum;
    }

    setDealerType = (value: DealerTypeEnum) => {
        this.dealerTypeEnum = value;
    }

    getBackendOrigin = () => {
        return this.backendOrigin;
    }

    setBackendOrigin = (origin: string) => {
        this.backendOrigin = origin;
    }

    setUpdateInterval = (intervalStr: string | null) => {
        const interval = parseInt(intervalStr ?? '0');

        if (interval < 3) {
            this.updateInterval = 3;
        } else if (interval > 30) {
            this.updateInterval = 30;
        } else {
            this.updateInterval = interval;
        }
    }

    connectToServer = async () => {
        if (await this.connectToServerInternal()) {
            this.connectedToServer = true;
            await this.update();
        } else {
            alert(`Попытка соединения с ${this.backendOrigin} не удалась :(`)
        }
    }

    disconnectToServer = () => {
        this.rootStore.clearAndRefresh();
        this.connectedToServer = false;
    }

    private connectToServerInternal = async (): Promise<boolean> => {
        //Ping
        const pingResult = await this.serverHealthCheckApi.ping();

        if (!pingResult.isSuccess || pingResult.payload !== 'pong') {
            return false;
        }

        //INITIALIZE
        const successRefreshSymbolsInfo = await this.rootStore.sharedStore.tryRefreshSymbolsInfo();

        if (!successRefreshSymbolsInfo) {
            return false;
        }

        return await this.rootStore.marketSignalSettingsStore.trySetSymbolsInfo(this.rootStore.sharedStore.getMarketSymbols());
    }

    private update = async () => {
        try {
            if (!this.connectedToServer) {
                return;
            }

            await this.rootStore.marketSignalHistoryStore.refreshMarketSignals();
            await this.rootStore.eventStore.refreshMarketEvents();
            await this.rootStore.openedPositionsStore.refreshOpenedPositions();
            await this.rootStore.dealsHistoryStore.refreshClosedPositionModels();

            this.lastUpdatedTime = new Date();
        } catch {
        } finally {
            if (this.connectedToServer) {
                setTimeout(async () => await this.update(), this.updateInterval * 1000);
            }
        }
    }
}