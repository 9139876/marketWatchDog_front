import {observer} from "mobx-react";
import React, {ReactNode, useState} from "react";
import {useStores} from "../../stores/hooks/useStores";
import {MarketSignalDirectionTypeEnum} from "../../models/marketSignal/marketSignalDirectionTypeEnum";
import {PositionDirectionTypeEnum} from "../../models/openedPositions/positionDirectionTypeEnum";
import {Button} from "antd";
import GroupItem from "../../models/marketSignal/groupItem";
import MarketSignalHistoryItem from "../../models/marketSignal/marketSignalHistoryItem";
import commonStyles from "../../commonStyles/commonStyles.module.css";

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

    const mapToListItem = (group: GroupItem<MarketSignalHistoryItem>): ReactNode => {
        return <div>
            <h2>{group.key}</h2>

            <div>
                {group.items.map(mapSignalToListItem)}
            </div>

            <hr/>
        </div>;
    }

    const mapSignalToListItem = (item: MarketSignalHistoryItem): ReactNode => {
        const getStyle = (): string => {
            switch (item.message.marketSignalDirectionType) {
                case MarketSignalDirectionTypeEnum.Buy:
                    return commonStyles.greenText;
                case MarketSignalDirectionTypeEnum.Sell:
                    return commonStyles.redText;
                default:
                    return commonStyles.grayText;
            }
        };

        const getContent = (): ReactNode => {
            const styleName = getStyle();

            return <div className={styleName}>
                <div>
                    <div className={styleName}>{`${item.symbol} - ${item.timeframe}`}</div>
                    <div className={styleName}>{item.message.signal}</div>
                </div>
                {item.message.lines.map(line => <div>{line}</div>)}
            </div>;
        }

        return <Button
            variant={'link'}
            style={{fontSize: '1.5em', width: '100%', height: 'auto', marginBottom: '0.5em'}}
            disabled={disableControls}
            onClick={async () => await openPosition(item.symbol, item.message.marketSignalDirectionType)}
        >
            {getContent()}
        </Button>
    }

    return (
        <div style={{minHeight: '12em', maxHeight: '36em', overflow: 'auto', border: 'black', borderStyle: 'double', padding: '0.5em'}}>
            {marketSignalHistoryStore.marketSignalsGroupsForShow.map(mapToListItem)}
        </div>
    );
});

export default MarketSignalHistoryList;