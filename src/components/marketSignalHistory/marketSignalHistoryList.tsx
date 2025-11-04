import {observer} from "mobx-react";
import {Button} from "antd";
import React, {ReactNode} from "react";
import {useStores} from "../../stores/hooks/useStores";
import {formatDateTimeRusStr} from "../../utils/helpers/stringHelper";
import MarketSignalHistoryItem from "../../models/marketSignal/marketSignalHistoryItem";
import {MarketSignalDirectionTypeEnum} from "../../models/marketSignal/marketSignalDirectionTypeEnum";

const MarketSignalHistoryList = observer(() => {

    const {marketSignalHistoryStore} = useStores();

    const mapToListItem = (item: MarketSignalHistoryItem): ReactNode => {

        const title = `[${formatDateTimeRusStr(item.time)}]: ${item.message.marketSignalDirectionType} ${item.symbol} ${item.timeframe} ${item.message.marketSignalType}`;

        const content: ReactNode =
            <div>
                <div> &#9679; {title} </div>
                <div> {item.message.signal} </div>
                {item.message.lines.map(line => <div>{line}</div>)}
                <hr/>
            </div>;

        switch (item.message.marketSignalDirectionType) {
            case MarketSignalDirectionTypeEnum.Buy:
                return <div style={{color: "darkgreen"}}> {content} </div>
            case MarketSignalDirectionTypeEnum.Sell:
                return <div style={{color: "red"}}> {content} </div>
            default:
                return <div style={{color: "black"}}> {content} </div>
        }
    }

    return (
        <div>
            <div style={{minHeight: '12em', maxHeight: '12em', overflow: 'auto', border: 'black', borderStyle: 'double', padding: '0.5em'}}>
                {marketSignalHistoryStore.marketSignalsListForShow.map(mapToListItem)}
            </div>

            <Button style={{margin: '1em'}} onClick={async () => await marketSignalHistoryStore.getNewMarketSignals()}>
                Get from server
            </Button>
        </div>

    );
});

export default MarketSignalHistoryList;