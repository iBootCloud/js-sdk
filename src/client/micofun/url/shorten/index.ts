import { AxiosBaseClient, PaginationOpt } from '../../../axios';
import { IBC, ObjectUtil } from '@ibootcloud/common-lib';
import { MicofunModuleClientConfig } from '../../index';
import {
  MicofunUrlConvertShortenUrlResponse,
  MicofunUrlListShortenUrlResponse,
  MicofunUrlShortenUrlBody,
  MicofunUrlShortenUrlInfo,
  MicofunUrlShortenUrlResponse,
} from '../../../../types';

export interface MicofunUrlShortenClientConfig {
  instanceId: string;
}

export class MicofunUrlShortenClient {
  axios: AxiosBaseClient;
  constructor(
    moduleClientConfig: MicofunModuleClientConfig,
    cfg: MicofunUrlShortenClientConfig
  ) {
    this.axios = new AxiosBaseClient({
      ...moduleClientConfig,
      ...cfg,
    });
  }
  /**
   * 初始化短链接实例 【V1】
   * POST /v1/url/shorten/instance/init
   * 接口ID：25694292
   * 接口地址：https://www.apifox.cn/web/project/1031456/apis/api-25694292
   */
  async init(): Promise<void> {
    await this.axios.request<void>({
      url: `/v1/url/shorten/instance/init`,
      method: 'POST',
    });
  }

  /**
   * 销毁短链接实例 【V1】
   * DELETE /v1/url/shorten/instance
   * 接口ID：25694295
   * 接口地址：https://www.apifox.cn/web/project/1031456/apis/api-25694295
   */
  async destroy(): Promise<void> {
    await this.axios.request<void>({
      url: `/v1/url/shorten/instance`,
      method: 'DELETE',
    });
  }

  /**
   * 生成短链 【V1】
   * POST /v1/url/shorten
   * 接口ID：21397380
   * 接口地址：https://www.apifox.cn/web/project/1031456/apis/api-21397380
   */
  async generate(url: string): Promise<string> {
    const resp = await this.axios.request<
      MicofunUrlShortenUrlResponse,
      MicofunUrlShortenUrlBody
    >({
      url: `/v1/url/shorten`,
      method: 'POST',
      data: {
        url,
      },
    });
    return resp.data!.shortenId;
  }

  /**
   * 转换短链接 【V1】
   * GET /v1/url/shorten/convert/{shortenId}
   * 接口ID：21397379
   * 接口地址：https://www.apifox.cn/web/project/1031456/apis/api-21397379
   */
  async convert(shortenId: string): Promise<string> {
    const resp = await this.axios.request<MicofunUrlConvertShortenUrlResponse>({
      url: `/v1/url/shorten/convert/${shortenId}`,
      method: 'GET',
    });
    return resp.data!.destinationUrl;
  }

  /**
   * 列出短链接 【V1】
   * GET /v1/url/shorten/list
   * 接口ID：25696334
   * 接口地址：https://www.apifox.cn/web/project/1031456/apis/api-25696334
   */
  async list(
    query?: string,
    opt?: PaginationOpt
  ): Promise<IBC.Page<MicofunUrlShortenUrlInfo>> {
    const resp = await this.axios.request<MicofunUrlListShortenUrlResponse>(
      {
        url: `/v1/url/shorten/list`,
        method: 'GET',
        params: ObjectUtil.removeEmpty({
          query,
        }),
      },
      opt
    );
    return resp.data!.page;
  }
}

export const createUrlShortenClient = (
  moduleClientConfig: MicofunModuleClientConfig,
  cfg: MicofunUrlShortenClientConfig
): MicofunUrlShortenClient =>
  new MicofunUrlShortenClient(moduleClientConfig, cfg);
