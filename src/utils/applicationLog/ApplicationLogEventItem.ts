import {ApplicationLogEventType} from "./applicationLogEventType";

export interface ApplicationLogEventItem {
    eventType: ApplicationLogEventType;
    date: Date;
    text: string;
}