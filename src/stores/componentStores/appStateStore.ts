import RootStore from "../rootStore";
import {makeAutoObservable} from "mobx";
import ServerHealthCheckApi from "../../api/serverHealthCheckApi";
import {DealerTypeEnum} from "../../models/enums/dealerTypeEnum";

export default class AppStateStore {
    private rootStore: RootStore;
    private serverHealthCheckApi: ServerHealthCheckApi;
    private connectedToServer: boolean = false;
    private backendOrigin: string = 'http://localhost:6100';
    private dealerTypeEnum: DealerTypeEnum = DealerTypeEnum.AlfaForex;

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

    connectToServer = async () => {
        const result = await this.serverHealthCheckApi.ping();

        if (result.isSuccess && result.payload === 'pong') {

            //INITIALIZE
            await this.rootStore.sharedStore.refreshMarketSymbols();

            this.connectedToServer = true;
        } else {
            alert(`Попытка соединения с ${this.backendOrigin} не удалась :(`)
        }
    }

    disconnectToServer = () => {
        this.rootStore.clearAndRefresh();
        this.connectedToServer = false;
    }
}