import { AxiosBaseClient } from '../../axios';
import { IdentityModuleClientConfig } from '../index';
import { IdentityConfigSet, IdentityGetConfigParam } from '../../../types';
import { ObjectUtil } from '@ibootcloud/common-lib';

export class IdentityManageConfigClient {
  clientConfig: IdentityModuleClientConfig;
  axios: AxiosBaseClient;

  constructor(cfg: IdentityModuleClientConfig) {
    this.clientConfig = { ...cfg };
    this.axios = new AxiosBaseClient({
      ...cfg,
    });
  }

  /**
   * 保存配置信息 [V1]
   * PATCH /v1/manage/config
   * 接口ID：21397362
   * 接口地址：https://www.apifox.cn/web/project/1031456/apis/api-21397362
   */
  async save(param: IdentityConfigSet): Promise<void> {
    await this.axios.request<void, IdentityConfigSet>({
      url: `/v1/manage/config`,
      method: 'PATCH',
      data: ObjectUtil.removeUndefined(param),
    });
  }

  /**
   * 获取配置信息 [V1]
   * GET /v1/manage/config
   * 接口ID：21795167
   * 接口地址：https://www.apifox.cn/web/project/1031456/apis/api-21795167
   */
  async get(param: IdentityGetConfigParam = {}): Promise<IdentityConfigSet> {
    const response = await this.axios.request<IdentityConfigSet>({
      url: `/v1/manage/config`,
      method: 'GET',
      params: ObjectUtil.removeNil(param),
    });
    return response!.data as IdentityConfigSet;
  }
}

export const createManageConfigClient = (
  clientConfig: IdentityModuleClientConfig
): IdentityManageConfigClient => new IdentityManageConfigClient(clientConfig);
