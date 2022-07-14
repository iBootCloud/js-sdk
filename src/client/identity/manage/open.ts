import { AxiosBaseClient, PaginationOpt } from '../../axios';
import { IdentityModuleClientConfig } from '../index';
import {
  IdentityCreateOpenClientBody,
  IdentityGenOauthCodeParam,
  IdentityGenOauthCodeResponse,
  IdentityGetOpenClientParam,
  IdentityListOpenClientParam,
  IdentityListOpenClientsResponse,
  IdentityOpenThirdpartyClient,
  IdentityRemoveOpenClientBody,
  IdentityRemoveOpenClientResponse,
  IdentityUpdateOpenClientBody,
} from '../../../types';
import { IBC, ObjectUtil } from '@ibootcloud/common-lib';

export class IdentityManageOpenClient {
  clientConfig: IdentityModuleClientConfig;
  axios: AxiosBaseClient;

  constructor(cfg: IdentityModuleClientConfig) {
    this.clientConfig = { ...cfg };
    this.axios = new AxiosBaseClient({
      ...cfg,
    });
  }

  /**
   * 生成第三方开放应用的临时授权码 [V1]
   * GET /v1/manage/open/oauth/authorize/code
   * 接口ID：21397343
   * 接口地址：https://www.apifox.cn/web/project/1031456/apis/api-21397343
   */
  async generateAuthorizationCode(
    param: IdentityGenOauthCodeParam
  ): Promise<string> {
    const response = await this.axios.request<IdentityGenOauthCodeResponse>({
      url: `/v1/manage/open/oauth/authorize/code`,
      method: 'GET',
      params: ObjectUtil.removeUndefined(param) as IdentityGenOauthCodeParam,
    });
    return response.data!.code;
  }

  /**
   * 创建开放账号客户端 [V1]
   * POST /v1/manage/open/client
   * 接口ID：28622756
   * 接口地址：https://www.apifox.cn/web/project/1031456/apis/api-28622756
   */
  async createClient(
    param: IdentityCreateOpenClientBody
  ): Promise<IdentityOpenThirdpartyClient> {
    const response = await this.axios.request<
      IdentityOpenThirdpartyClient,
      IdentityCreateOpenClientBody
    >({
      url: `/v1/manage/open/client`,
      method: 'POST',
      data: ObjectUtil.removeUndefined(param),
    });
    return response.data as IdentityOpenThirdpartyClient;
  }

  /**
   * 更新开放账号客户端 [V1]
   * PUT /v1/manage/open/client
   * 接口ID：21397359
   * 接口地址：https://www.apifox.cn/web/project/1031456/apis/api-21397359
   */
  async updateClient(param: IdentityUpdateOpenClientBody): Promise<void> {
    await this.axios.request<void, IdentityUpdateOpenClientBody>({
      url: `/v1/manage/open/client`,
      method: 'PUT',
      data: ObjectUtil.removeUndefined(param),
    });
  }

  /**
   * 移除开放账号客户端 [V1]
   * DELETE /v1/manage/open/client
   * 接口ID：21397358
   * 接口地址：https://www.apifox.cn/web/project/1031456/apis/api-21397358
   */
  async removeClients(clientId?: string[]): Promise<number> {
    const response = await this.axios.request<
      IdentityRemoveOpenClientResponse,
      IdentityRemoveOpenClientBody
    >({
      url: `/v1/manage/open/client`,
      method: 'DELETE',
      data: ObjectUtil.removeUndefined({ clientId }),
    });
    return response.data!.affected;
  }

  /**
   * 获取开放账号客户端列表 [V1]
   * GET /v1/manage/open/clients
   * 接口ID：21397360
   * 接口地址：https://www.apifox.cn/web/project/1031456/apis/api-21397360
   */
  async listClients(
    param: IdentityListOpenClientParam = {},
    opt?: PaginationOpt
  ): Promise<IBC.Page<IdentityOpenThirdpartyClient>> {
    const response = await this.axios.request<IdentityListOpenClientsResponse>(
      {
        url: `/v1/manage/open/clients`,
        method: 'GET',
        params: ObjectUtil.removeNil(param) as IdentityListOpenClientParam,
      },
      opt
    );
    return response.data!.page;
  }

  /**
   * 获取开放账号客户端信息 [V1]
   * GET /v1/manage/open/client
   * 接口ID：28631710
   * 接口地址：https://www.apifox.cn/web/project/1031456/apis/api-28631710
   */
  async getClient(clientId: string): Promise<IdentityOpenThirdpartyClient> {
    const response = await this.axios.request<IdentityOpenThirdpartyClient>({
      url: `/v1/manage/open/client`,
      method: 'GET',
      params: { clientId } as IdentityGetOpenClientParam,
    });
    return response.data as IdentityOpenThirdpartyClient;
  }
}

export const createManageOpenClient = (
  clientConfig: IdentityModuleClientConfig
): IdentityManageOpenClient => new IdentityManageOpenClient(clientConfig);
