import {observer} from "mobx-react";
import {useStores} from "../../stores/hooks/useStores";
import {Collapse, CollapseProps, Timeline} from "antd";
import {ReactNode} from "react";
import ClosedPositionModel from "../../models/dealsHistory/closedPositionModel";
import {TimelineItemProps} from "antd/es/timeline/TimelineItem";
import {formatTimeRusStr} from "../../utils/helpers/stringHelper";

const ClosedPositions = observer(() => {

    const {dealsHistoryStore} = useStores();

    const mapEvents = (model: ClosedPositionModel): ReactNode => {

        const items: TimelineItemProps[] = [];

        items.push({
            children: `[${formatTimeRusStr(model.openTime)}] Открытие позиции по цене ${model.priceOpenStr} (${model.openReasonDescription})`
        });

        items.push(...model.events.map(event => {
            return {
                children: `[${formatTimeRusStr(event.time)}] ${event.eventTypeDescription} - ${event.description}`
            }
        }));

        items.push({
            children: `[${formatTimeRusStr(model.closeTime)}] Закрытие позиции по цене ${model.priceCloseStr} (${model.closeReasonDescription})`
        });

        return <Timeline items={items}/>
    }

    const getItems = (): CollapseProps['items'] => {
        return dealsHistoryStore.getClosedPositionModels().map(
            (item, index) => ({
                key: index,
                label: `${item.symbol} - ${item.typeDescription} ${item.volumeStr} лот, профит ${item.profitStr} рублей (${item.comment})`,
                children: mapEvents(item),
            }));
    }

    return (
        <Collapse
            bordered={false}
            // style={{ background: token.colorBgContainer }}
            ghost
            items={getItems()}
        />
    );
});

export default ClosedPositions;