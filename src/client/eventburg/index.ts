import { AxiosBaseClient, IBCServiceClientConfig } from '../index';
import { IBCService } from '../../constants';
import { ObjectUtil } from '@ibootcloud/common-lib';
import {
  EventburgCountEventResponse,
  EventburgEventBody,
  EventburgEventFilter,
  EventburgEventHistogramInfo,
  EventburgEventInfo,
  EventburgGetEventHistogramParam,
  EventburgGetEventHistogramResponse,
  EventburgListEventHitsParam,
  EventburgListEventHitsResponse,
  EventburgReportEventBody,
} from '../../types';

export type EventburgClientConfig = {
  instanceId: string;
};
export type CreateEventburgClientConfig = EventburgClientConfig &
  IBCServiceClientConfig;

export class EventburgClient {
  axios: AxiosBaseClient;
  constructor(serviceClientConfig: CreateEventburgClientConfig) {
    this.axios = new AxiosBaseClient({
      ...serviceClientConfig,
      service: IBCService.EVENTBURG,
    });
  }
  /**
   * 事件上报 【V1】
   * POST /v1/event/report
   * 接口ID：21397371
   * 接口地址：https://www.apifox.cn/web/project/1031456/apis/api-21397371
   */
  async report(...events: EventburgEventBody[]): Promise<void> {
    await this.axios.request<void, EventburgReportEventBody>({
      url: `/v1/event/report`,
      method: 'POST',
      data: { events },
    });
  }

  /**
   * 获取事件计数 【V1】
   * GET /v1/event/count
   * 接口ID：26571114
   * 接口地址：https://www.apifox.cn/web/project/1031456/apis/api-26571114
   */
  async countEvent(filter?: EventburgEventFilter): Promise<number> {
    const response = await this.axios.request<EventburgCountEventResponse>({
      url: `/v1/event/count`,
      method: 'GET',
      params: { filter },
    });
    return response.data!.count;
  }

  /**
   * 获取命中事件 【V1】
   * GET /v1/event/hits
   * 接口ID：26572465
   * 接口地址：https://www.apifox.cn/web/project/1031456/apis/api-26572465
   */
  async getEventHits(
    param?: EventburgListEventHitsParam
  ): Promise<EventburgEventInfo[]> {
    const response = await this.axios.request<EventburgListEventHitsResponse>({
      url: `/v1/event/hits`,
      method: 'GET',
      params: ObjectUtil.removeUndefined(param),
    });
    return response.data as EventburgListEventHitsResponse;
  }

  /**
   * 获取事件统计直方图 【V1】
   * GET /v1/event/histogram
   * 接口ID：26573116
   * 接口地址：https://www.apifox.cn/web/project/1031456/apis/api-26573116
   */
  async getEventHistogram(
    param?: EventburgGetEventHistogramParam
  ): Promise<EventburgEventHistogramInfo> {
    const response = await this.axios.request<
      EventburgGetEventHistogramResponse
    >({
      url: `/v1/event/histogram`,
      method: 'GET',
      params: ObjectUtil.removeUndefined(param),
    });
    return response.data as EventburgGetEventHistogramResponse;
  }
}

export const createEventburgClient = (
  serviceClientConfig: CreateEventburgClientConfig
): EventburgClient => new EventburgClient(serviceClientConfig);
