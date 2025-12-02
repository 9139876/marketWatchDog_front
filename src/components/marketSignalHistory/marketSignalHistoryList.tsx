import {observer} from "mobx-react";
import React, {ReactNode, useState} from "react";
import {useStores} from "../../stores/hooks/useStores";
import {formatTimeRusStr} from "../../utils/helpers/stringHelper";
import {MarketSignalDirectionTypeEnum} from "../../models/marketSignal/marketSignalDirectionTypeEnum";
import {PositionDirectionTypeEnum} from "../../models/openedPositions/positionDirectionTypeEnum";
import {Button} from "antd";
import MarketSignalHistoryGroupItem from "../../models/marketSignal/marketSignalHistoryGroupItem";
import MarketSignalHistoryItem from "../../models/marketSignal/marketSignalHistoryItem";

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

    const mapToListItem = (item: MarketSignalHistoryGroupItem): ReactNode => {
        const title = formatTimeRusStr(item.time);

        return <div>
            <h2>{title}</h2>

            <div>
                {item.signals.map(mapSignalToListItem)}
            </div>

            <hr/>
        </div>;
    }

    const mapSignalToListItem = (item: MarketSignalHistoryItem): ReactNode => {
        const content: ReactNode =
            <div>
                <div>
                    <div>{`${item.symbol} - ${item.timeframe}`}</div>
                    <div>{item.message.signal}</div>
                </div>
                {item.message.lines.map(line => <div>{line}</div>)}
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
        <div style={{minHeight: '12em', maxHeight: '36em', overflow: 'auto', border: 'black', borderStyle: 'double', padding: '0.5em'}}>
            {marketSignalHistoryStore.marketSignalsGroupsForShow.map(mapToListItem)}
        </div>
    );
});

export default MarketSignalHistoryList;