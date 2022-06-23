import { AxiosBaseClient } from '../../axios';
import { ModuleClientConfig } from '../index';
import { IDType, NextUIDResponse } from '../../../types/databox/uid.dto';
import { ObjectUtil } from '@ibootcloud/common-lib';

export interface UIDClientConfig {
  type?: IDType;
}

export class UIDClient {
  axios: AxiosBaseClient;
  idType: IDType;
  constructor(
    moduleClientConfig: ModuleClientConfig,
    { type: idType = IDType.UUID }: UIDClientConfig = {}
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
    type?: IDType,
    opt?: { size?: number; alphabet?: string }
  ): Promise<string> {
    const response = await this.axios.request<NextUIDResponse>({
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
  moduleClientConfig: ModuleClientConfig,
  uidClientConfig: UIDClientConfig = {}
): UIDClient => new UIDClient(moduleClientConfig, uidClientConfig);
