import RootStore from "../../rootStore";
import {makeAutoObservable} from "mobx";
import {PositionDirectionTypeEnum} from "../../../models/openedPositions/positionDirectionTypeEnum";
import OpenPositionApi from "../../../api/openPositionApi";
import {CheckOpenPositionRequest} from "../../../models/openPosition/checkOpenPositionRequest";

export default class OpenPositionModalStore {
    private rootStore: RootStore;
    private openPositionApi: OpenPositionApi;

    constructor(rootStore: RootStore) {
        makeAutoObservable(this);
        this.rootStore = rootStore;
        this.openPositionApi = new OpenPositionApi(rootStore);
    }

    isVisible: boolean = false;

    currentSymbol: string = '';
    positionType: PositionDirectionTypeEnum = PositionDirectionTypeEnum.Long;
    inLotsSize: number = 0.1;
    stopLossValue: number | null = null;
    notValidReasons: string[] = [];
    allCorrect: boolean = false;

    currentPriceStr: string = '';
    lossValueIfStopLossFiredAbsStr: string = '';
    lossPercentIfStopLossFiredAbsStr: string = '';
    lossPercentIfStopLossFiredIsValid: boolean = false;

    marginStr: string = '';
    marginFreeStr: string = '';
    lossDivMarginFreePercentStr: string = '';
    lossDivMarginFreeIsValid: boolean = false;

    showModal = () => {
        this.isVisible = true;
    };

    setCurrentSymbol = async (value: string | null) => {
        this.clearFields();
        this.currentSymbol = value ?? '';

        if (this.currentSymbol !== '') {
            const request: CheckOpenPositionRequest = {
                dealerType: this.rootStore.appStateStore.getDealerType(),
                symbol: this.currentSymbol,
                positionType: this.positionType,
                inLotsSize: this.inLotsSize,
                stopLossValue: 1
            };

            const result = await this.openPositionApi.checkOpenPosition(request);

            if (result.isSuccess) {
                this.currentPriceStr = result.payload!.currentPriceStr;
                this.marginStr = result.payload!.marginStr;
                this.marginFreeStr = result.payload!.marginFreeStr;
            }
        }
    }

    setPositionType = (value: string | null) => {
        this.positionType = !!value
            ? PositionDirectionTypeEnum[value as keyof typeof PositionDirectionTypeEnum]
            : PositionDirectionTypeEnum.Long;

        this.notValidReasons = [];
        this.allCorrect = false;
    }

    setInLotsSize = (value: string | null) => {
        this.inLotsSize = parseFloat(value ?? '0');

        this.notValidReasons = [];
        this.allCorrect = false;
    }

    setStopLossValue = (value: string | null) => {
        this.stopLossValue = parseFloat(value ?? '0');

        this.notValidReasons = [];
        this.allCorrect = false;
    }

    checkPosition = async () => {
        if (this.currentSymbol.length === 0 || this.inLotsSize === 0 || this.stopLossValue == null) {
            this.notValidReasons = ['Не все поля заполнены корректно!'];
            return;
        }

        const request: CheckOpenPositionRequest = {
            dealerType: this.rootStore.appStateStore.getDealerType(),
            symbol: this.currentSymbol,
            positionType: this.positionType,
            inLotsSize: this.inLotsSize,
            stopLossValue: this.stopLossValue
        };

        const result = await this.openPositionApi.checkOpenPosition(request);

        if (result.isSuccess) {

            this.allCorrect = result.payload!.isValid;
            this.notValidReasons = result.payload!.isValid ? ['ОК'] : (!!result.payload!.notValidReasons && result.payload!.notValidReasons!.length > 0 ? result.payload!.notValidReasons : ['Неизвестная ошибка']);

            this.currentPriceStr = result.payload!.currentPriceStr;
            this.lossValueIfStopLossFiredAbsStr = result.payload!.lossValueIfStopLossFiredAbsStr;
            this.lossPercentIfStopLossFiredAbsStr = result.payload!.lossPercentIfStopLossFiredAbsStr;
            this.lossPercentIfStopLossFiredIsValid = result.payload!.lossPercentIfStopLossFiredIsValid;
            this.marginStr = result.payload!.marginStr;
            this.marginFreeStr = result.payload!.marginFreeStr;
            this.lossDivMarginFreePercentStr = result.payload!.lossDivMarginFreePercentStr;
            this.lossDivMarginFreeIsValid = result.payload!.lossDivMarginFreeIsValid;
        }
    }

    openPosition = async () => {
        try {

        } finally {
            this.hideModal();
        }
    }

    hideModal = () => {
        this.isVisible = false;
        this.currentSymbol = '';
        this.positionType = PositionDirectionTypeEnum.Long;
        this.inLotsSize = 0.1;
        this.clearFields();
    };

    private clearFields = () => {
        this.stopLossValue = null;
        this.notValidReasons = [];
        this.allCorrect = false;

        this.currentPriceStr = '';
        this.lossValueIfStopLossFiredAbsStr = '';
        this.lossPercentIfStopLossFiredAbsStr = '';
        this.lossPercentIfStopLossFiredIsValid = false;
        this.marginStr = '';
        this.marginFreeStr = '';
        this.lossDivMarginFreePercentStr = '';
        this.lossDivMarginFreeIsValid = false
    }
}