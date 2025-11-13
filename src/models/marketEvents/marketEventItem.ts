import {MarketEventType} from "./marketEventType";

export interface MarketEventItem {
    id: number;
    eventType: MarketEventType;
    symbol: string;
    time: Date;
    description: string;
}