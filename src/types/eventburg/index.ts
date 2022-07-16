export namespace Eventburg {
  export interface EventBody {
    eventId: string;
  }

  export interface EventInfo {
    reportTime: string;
    eventId: string;
  }

  export interface EventEntity {
    instanceId: string;
    reportTime: string;
    eventId: string;
  }

  export interface EventHistogram {
    count: number;
    time: string;
  }

  export interface EventHistogramInfo {
    total: number;
    interval: number;
    histogram: EventHistogram[];
  }

  export interface EmitEventEBPayload {
    events: EventEntity[];
  }

  export interface EventFilter {
    eventId?: string[];
    reportTimeStart?: Date;
    reportTimeEnd?: Date;
  }

  export interface ReportEventBody {
    events: EventBody[];
  }

  export interface CountEventParam {
    filter?: EventFilter;
  }

  export interface CountEventResponse {
    count: number;
  }

  export interface ListEventHitsParam {
    filter?: EventFilter;
    limit?: number;
  }

  export type ListEventHitsResponse = EventInfo[];

  export interface GetEventHistogramParam {
    filter?: EventFilter;
    interval?: number;
  }

  export type GetEventHistogramResponse = EventHistogramInfo;
}
