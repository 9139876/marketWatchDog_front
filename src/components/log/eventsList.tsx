import {observer} from "mobx-react";
import React, {ReactNode} from "react";
import {useStores} from "../../stores/hooks/useStores";
import {MarketEventItem} from "../../models/marketEvents/marketEventItem";
import {MarketEventType} from "../../models/marketEvents/marketEventType";
import {Button, Checkbox} from "antd";
import {formatDateTimeRusStr} from "../../utils/helpers/stringHelper";

const EventsList = observer(() => {

    const {eventStore} = useStores();

    const mapToListItem = (item: MarketEventItem): ReactNode => {

        const text = `[${formatDateTimeRusStr(item.time)}]: ${item.symbol} - ${item.description}`;

        switch (item.eventType) {
            case MarketEventType.ChangeStopLoss:
                return <div style={{color: "darkgreen"}}>&#9679; {text}</div>
            case MarketEventType.UpdatePosition:
                return <div style={{color: "blue"}}>&#9679; {text}</div>
            case MarketEventType.PositionWatchDogError:
                return <div style={{color: "red"}}>&#9679; {text}</div>
            default:
                return <div style={{color: "black"}}>&#9679; {text}</div>
        }
    }

    const onChange = (checkedValues: string[]) => {
        const selectedTypes = checkedValues.map(x => MarketEventType[x as keyof typeof MarketEventType]);
        eventStore.changeSelectedEventTypes(selectedTypes);
    };

    return (
        <div>
            <Checkbox.Group
                style={{margin: '0em 0em 1em 1em', fontFamily: 'monospace', fontWeight: 'bold'}}
                options={eventStore.selectedEventTypes.map(x => x.value)}
                value={eventStore.selectedEventTypes.filter(x => x.isSelected).map(x => x.value)}
                onChange={onChange}
            />

            <div style={{minHeight: '12em', maxHeight: '12em', overflow: 'auto', border: 'black', borderStyle: 'double', padding: '0.5em'}}>
                {eventStore.eventsListForShow.map(mapToListItem)}
            </div>

            <Button style={{margin: '1em'}} onClick={async () => await eventStore.getNewMarketEvents()}>
                Get from server
            </Button>
        </div>

    );
});

export default EventsList;