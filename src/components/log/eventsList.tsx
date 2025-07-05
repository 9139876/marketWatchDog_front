import {observer} from "mobx-react";
import React, {ReactNode} from "react";
import {useStores} from "../../stores/hooks/useStores";
import {ApplicationLogEventItem} from "../../utils/applicationLog/ApplicationLogEventItem";
import {ApplicationLogEventType} from "../../utils/applicationLog/applicationLogEventType";
import {Button, Checkbox, CheckboxChangeEvent, CheckboxProps} from "antd";

const EventsList = observer(() => {

    const {applicationLogStore} = useStores();

    const mapToListItem = (item: ApplicationLogEventItem): ReactNode => {

        const text = `[${item.date.toLocaleDateString()} ${item.date.toLocaleTimeString()}]: ${item.text}`;

        switch (item.eventType) {
            case ApplicationLogEventType.Event:
                return <div style={{color: "darkgreen"}}>&#9679; {text}</div>
            case ApplicationLogEventType.ImportantEvent:
                return <div style={{color: "blue"}}>&#9679; {text}</div>
            case ApplicationLogEventType.Warning:
                return <div style={{color: "orange"}}>&#9679; {text}</div>
            case ApplicationLogEventType.Error:
                return <div style={{color: "red"}}>&#9679; {text}</div>
            case ApplicationLogEventType.Fatal:
                return <div style={{color: "darkred"}}>&#9679; {text}</div>
            default:
                return <div style={{color: "black"}}>&#9679; {text}</div>
        }
    }

    const onChange = (checkedValues: string[]) => {
        const selectedTypes = checkedValues.map(x => ApplicationLogEventType[x  as keyof typeof ApplicationLogEventType]);
        applicationLogStore.changeSelectedEventTypes(selectedTypes);
    };

    return (
        <div>
            <Checkbox.Group options={applicationLogStore.selectedEventTypes.map(x => x.value)} defaultValue={applicationLogStore.selectedEventTypes.filter(x => x.isSelected).map(x => x.value)} onChange={onChange}/>

            <div style={{minHeight: '12em', maxHeight: '12em', overflow: 'auto', border: 'black', borderStyle: 'double', padding: '0.5em'}}>
                {applicationLogStore.eventsListForShow.map(mapToListItem)}
            </div>

            <Button style={{margin: '1em'}} onClick={() => applicationLogStore.addEvent(ApplicationLogEventType.Event, 'fjlskadfjdf j fd;sjsadfj fds jsdf j;ljk')}>
                Event
            </Button>
            <Button onClick={() => applicationLogStore.addEvent(ApplicationLogEventType.ImportantEvent, 'fjlskadfjdf j fd;sjsadfj fds jsdf j;ljk')}>
                ImportantEvent
            </Button>
            <Button style={{margin: '1em'}} onClick={() => applicationLogStore.addEvent(ApplicationLogEventType.Warning, 'fjlskadfjdf j fd;sjsadfj fds jsdf j;ljk')}>
                Warning
            </Button>
            <Button onClick={() => applicationLogStore.addEvent(ApplicationLogEventType.Error, 'fjlskadfjdf j fd;sjsadfj fds jsdf j;ljk')}>
                Error
            </Button>
            <Button style={{margin: '1em'}} onClick={() => applicationLogStore.addEvent(ApplicationLogEventType.Fatal, 'fjlskadfjdf j fd;sjsadfj fds jsdf j;ljk')}>
                Fatal
            </Button>
        </div>

    );
});

export default EventsList;