import RootStore from "../rootStore";
import {makeAutoObservable} from "mobx";
import {ApplicationLogEventItem} from "../../utils/applicationLog/ApplicationLogEventItem";
import {ApplicationLogEventType} from "../../utils/applicationLog/applicationLogEventType";
import {Nullable} from "../../global/common/nullable";
import {SelectedEnumItem} from "../../global/selectedEnumItem";

export default class ApplicationLogStore {
    private rootStore: RootStore;

    constructor(rootStore: RootStore) {
        makeAutoObservable(this);
        this.rootStore = rootStore;
    }

    eventsList: ApplicationLogEventItem[] = [
        {eventType: ApplicationLogEventType.Event, date: new Date(), text: 'This is the Event'},
        {eventType: ApplicationLogEventType.ImportantEvent, date: new Date(), text: 'This is the ImportantEvent'},
        {eventType: ApplicationLogEventType.Warning, date: new Date(), text: 'This is the Warning'},
        {eventType: ApplicationLogEventType.Error, date: new Date(), text: 'This is the Error'},
        {eventType: ApplicationLogEventType.Fatal, date: new Date(), text: 'This is the Fatal'},
    ];

    selectedEventTypes: SelectedEnumItem<ApplicationLogEventType>[] = [
        {value: ApplicationLogEventType.Event, isSelected: true},
        {value: ApplicationLogEventType.ImportantEvent, isSelected: true},
        {value: ApplicationLogEventType.Warning, isSelected: true},
        {value: ApplicationLogEventType.Error, isSelected: true},
        {value: ApplicationLogEventType.Fatal, isSelected: true},
    ];

    eventsListForShow: ApplicationLogEventItem[] = [];

    addEvent(eventType: ApplicationLogEventType, text: string, date: Nullable<Date> = null) {
        date ??= new Date();
        this.eventsList.push({eventType: eventType, date: date, text: text});
        this.updateEventsListForShow();
    }

    changeSelectedEventTypes(selectedEvents: ApplicationLogEventType[]) {
        this.selectedEventTypes.forEach(x => x.isSelected = selectedEvents.includes(x.value));
        this.updateEventsListForShow();
    }

    updateEventsListForShow() {
        const selectedEventTypesInternal = this.selectedEventTypes
            .filter(x => x.isSelected)
            .map(x => x.value);

        this.eventsListForShow = this.eventsList
            .filter(x => selectedEventTypesInternal.includes(x.eventType))
            .sort((a, b) => b.date.getTime() - a.date.getTime());
    }
}