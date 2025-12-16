import {MarketEventType} from "./marketEventType";

export interface MarketEventItem {
    id: number;
    eventType: MarketEventType;
    eventTypeDescription: string;
    symbol: string;
    time: Date;
    description: string;
}