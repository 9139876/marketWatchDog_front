import {MarketEventItem} from "../marketEvents/marketEventItem";

export default interface ClosedPositionModel {
    positionId: number;
    symbol: string;
// type: enum;
    typeDescription: string;
    openTime: Date;
    priceOpen: number;
    priceOpenStr: string;
// openReason: enum;
    openReasonDescription: string;
    closeTime: Date;
    priceClose: number;
    priceCloseStr: string;
// closeReason: enum;
    closeReasonDescription: string;
    volume: number;
    volumeStr: string;
    profit: number;
    profitStr: string;
    comment: string;
    events: MarketEventItem[]
}