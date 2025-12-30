import {observer} from "mobx-react";
import {useStores} from "../../stores/hooks/useStores";
import {Collapse, CollapseProps, Timeline} from "antd";
import React, {ReactNode} from "react";
import ClosedPositionModel from "../../models/dealsHistory/closedPositionModel";
import {TimelineItemProps} from "antd/es/timeline/TimelineItem";
import {formatTimeRusStr} from "../../utils/helpers/stringHelper";

const ClosedPositions = observer(() => {

    const {dealsHistoryStore} = useStores();

    const createEventItem = (date: string, text: string): ReactNode => {
        return <div style={{display: 'flex'}}>
            <div style={{marginRight: '0.5em'}}>[{date}]</div>
            <div style={{fontWeight: 'normal'}}>{text}</div>
        </div>
    }

    const mapEvents = (model: ClosedPositionModel): ReactNode => {

        const items: TimelineItemProps[] = [];

        items.push({
            children: createEventItem(formatTimeRusStr(model.openTime), `Открытие позиции по цене ${model.priceOpenStr} (${model.openReasonDescription})`)
        });

        items.push(...model.events.map(event => {
            return {
                children: createEventItem(formatTimeRusStr(event.time), `${event.eventTypeDescription} - ${event.description}`)
            }
        }));

        items.push({
            children: createEventItem(formatTimeRusStr(model.closeTime), `Закрытие позиции по цене ${model.priceCloseStr} (${model.closeReasonDescription})`)
        });

        return <Timeline style={{marginLeft: '1em'}} items={items}/>
    }

    const getItems = (items: ClosedPositionModel[]): CollapseProps['items'] => {
        return items.map(
            (item, index) => ({
                key: index,
                label: `${item.symbol} - ${item.typeDescription} ${item.volumeStr} лот, [${item.priceOpenStr} -> ${item.priceCloseStr}] профит ${item.profitStr} рублей` + (item.comment?.length > 0 ? ` (${item.comment})` : ''),
                children: mapEvents(item)
            }));
    }

    return (
        <div style={{minHeight: '12em', maxHeight: '24em', overflow: 'auto', padding: '0.5em'}}>
            {dealsHistoryStore.closedPositionModelGroupsForShow.map(group =>
                <div>
                    <h2>{group.key}</h2>

                    <Collapse
                        style={{fontWeight: 'bold'}}
                        items={getItems(group.items)}
                    />

                    <hr/>
                </div>
            )}
        </div>
    );
});

export default ClosedPositions;