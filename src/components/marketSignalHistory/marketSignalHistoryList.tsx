import {observer} from "mobx-react";
import React, {ReactNode, useState} from "react";
import {useStores} from "../../stores/hooks/useStores";
import {formatDateTimeRusStr} from "../../utils/helpers/stringHelper";
import MarketSignalHistoryItem from "../../models/marketSignal/marketSignalHistoryItem";
import {MarketSignalDirectionTypeEnum} from "../../models/marketSignal/marketSignalDirectionTypeEnum";
import {PositionDirectionTypeEnum} from "../../models/openedPositions/positionDirectionTypeEnum";
import {Button} from "antd";

const MarketSignalHistoryList = observer(() => {

    const {marketSignalHistoryStore, openPositionModalStore} = useStores();
    const [disableControls, setDisableControls] = useState(false);

    const openPosition = async (symbol: string, marketSignalDirectionType: MarketSignalDirectionTypeEnum) => {
        try {
            setDisableControls(true);
            openPositionModalStore.setPositionType(marketSignalDirectionType === MarketSignalDirectionTypeEnum.Buy ? PositionDirectionTypeEnum.Long : PositionDirectionTypeEnum.Short);
            await openPositionModalStore.setCurrentSymbol(symbol);
            openPositionModalStore.showModal();
        } finally {
            setDisableControls(false);
        }
    }

    const mapToListItem = (item: MarketSignalHistoryItem): ReactNode => {

        const title = `[${formatDateTimeRusStr(item.time)}]: ${item.message.marketSignalDirectionType} ${item.symbol} ${item.timeframe}`;

        const content: ReactNode =
            <div>
                <div> &#9679; {title} </div>
                <div> {item.message.signal} </div>
                {item.message.lines.map(line => <div>{line}</div>)}
                {/*<hr/>*/}
            </div>;

        const inner = () => {
            switch (item.message.marketSignalDirectionType) {
                case MarketSignalDirectionTypeEnum.Buy:
                    return <div style={{color: "darkgreen"}}> {content} </div>
                case MarketSignalDirectionTypeEnum.Sell:
                    return <div style={{color: "red"}}> {content} </div>
                default:
                    return <div style={{color: "black"}}> {content} </div>
            }
        };

        return <Button
            variant={'link'}
            style={{fontWeight: 'bold', fontFamily: 'math', fontSize: '1.5em', width: '100%', height: 'auto', marginBottom: '0.5em'}}
            disabled={disableControls}
            onClick={async () => await openPosition(item.symbol, item.message.marketSignalDirectionType)}
        >
            {inner()}
        </Button>
    }

    return (
        <div style={{minHeight: '12em', maxHeight: '18em', overflow: 'auto', border: 'black', borderStyle: 'double', padding: '0.5em'}}>
            {marketSignalHistoryStore.marketSignalsListForShow.map(mapToListItem)}
        </div>
    );
});

export default MarketSignalHistoryList;