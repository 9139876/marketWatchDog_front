import {MarketEventType} from "./marketEventType";

export interface MarketEventItem {
    eventType: MarketEventType;
    symbol: string;
    time: Date;
    description: string;
}