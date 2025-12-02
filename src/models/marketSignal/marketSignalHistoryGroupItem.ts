import MarketSignalHistoryItem from "./marketSignalHistoryItem";

export default interface MarketSignalHistoryGroupItem {
    time: Date;
    signals: MarketSignalHistoryItem[];
}