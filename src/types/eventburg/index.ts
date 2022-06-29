export interface EventburgEventBody {
  eventId: string;
}
export interface EventburgEventInfo {
  reportTime: string;
  eventId: string;
}
export interface EventburgEventEntity {
  instanceId: string;
  reportTime: string;
  eventId: string;
}
export interface EventburgEventHistogram {
  count: number;
  time: string;
}
export interface EventburgEventHistogramInfo {
  total: number;
  interval: number;
  histogram: EventburgEventHistogram[];
}
export interface EventburgEmitEventEBPayload {
  events: EventburgEventEntity[];
}
export interface EventburgEventFilter {
  eventId?: string[];
  reportTimeStart?: Date;
  reportTimeEnd?: Date;
}
export interface EventburgReportEventBody {
  events: EventburgEventBody[];
}
export interface EventburgCountEventParam {
  filter?: EventburgEventFilter;
}
export interface EventburgCountEventResponse {
  count: number;
}
export interface EventburgListEventHitsParam {
  filter?: EventburgEventFilter;
  limit?: number;
}
export type EventburgListEventHitsResponse = EventburgEventInfo[];
export interface EventburgGetEventHistogramParam {
  filter?: EventburgEventFilter;
  interval?: number;
}
export type EventburgGetEventHistogramResponse = EventburgEventHistogramInfo;
