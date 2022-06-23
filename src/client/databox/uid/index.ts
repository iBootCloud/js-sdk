import { AxiosBaseClient } from '../../axios';
import { DataboxModuleClientConfig } from '../index';
import { DataboxUIDType, DataboxUIDNextUIDResponse } from '../../../types';
import { ObjectUtil } from '@ibootcloud/common-lib';

export interface DataboxUIDClientConfig {
  type?: DataboxUIDType;
}

export class DataboxUIDClient {
  axios: AxiosBaseClient;
  idType: DataboxUIDType;
  constructor(
    moduleClientConfig: DataboxModuleClientConfig,
    { type: idType = DataboxUIDType.UUID }: DataboxUIDClientConfig = {}
  ) {
    this.idType = idType;
    this.axios = new AxiosBaseClient({
      ...moduleClientConfig,
    });
  }
  /**
   * 生成UID [V1]
   * POST /v1/uid/generate
   * 接口ID：23867249
   * 接口地址：https://www.apifox.cn/web/project/1031456/apis/api-23867249
   */
  async generate(
    type?: DataboxUIDType,
    opt?: { size?: number; alphabet?: string }
  ): Promise<string> {
    const response = await this.axios.request<DataboxUIDNextUIDResponse>({
      url: `/v1/uid/generate`,
      method: 'POST',
      params: ObjectUtil.removeEmpty({
        type: type ?? this.idType,
        ...opt,
      }),
    });
    return response.data!.uid;
  }
}

export const createUIDClient = (
  moduleClientConfig: DataboxModuleClientConfig,
  uidClientConfig: DataboxUIDClientConfig = {}
): DataboxUIDClient =>
  new DataboxUIDClient(moduleClientConfig, uidClientConfig);
