import { AxiosBaseClient, PaginationOpt } from '../../axios';
import { IdentityModuleClientConfig } from '../index';
import { Identity } from '../../../types';
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
    param: Identity.Open.GenOauthCodeParam
  ): Promise<string> {
    const response = await this.axios.request<
      Identity.Open.GenOauthCodeResponse
    >({
      url: `/v1/manage/open/oauth/authorize/code`,
      method: 'GET',
      params: ObjectUtil.removeUndefined(
        param
      ) as Identity.Open.GenOauthCodeParam,
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
    param: Identity.Open.CreateOpenClientBody
  ): Promise<Identity.Open.OpenThirdpartyClient> {
    const response = await this.axios.request<
      Identity.Open.OpenThirdpartyClient,
      Identity.Open.CreateOpenClientBody
    >({
      url: `/v1/manage/open/client`,
      method: 'POST',
      data: ObjectUtil.removeUndefined(param),
    });
    return response.data as Identity.Open.OpenThirdpartyClient;
  }

  /**
   * 更新开放账号客户端 [V1]
   * PUT /v1/manage/open/client
   * 接口ID：21397359
   * 接口地址：https://www.apifox.cn/web/project/1031456/apis/api-21397359
   */
  async updateClient(param: Identity.Open.UpdateOpenClientBody): Promise<void> {
    await this.axios.request<void, Identity.Open.UpdateOpenClientBody>({
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
      Identity.Open.RemoveOpenClientResponse,
      Identity.Open.RemoveOpenClientBody
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
    param: Identity.Open.ListOpenClientParam = {},
    opt?: PaginationOpt
  ): Promise<IBC.Page<Identity.Open.OpenThirdpartyClient>> {
    const response = await this.axios.request<
      Identity.Open.ListOpenClientsResponse
    >(
      {
        url: `/v1/manage/open/clients`,
        method: 'GET',
        params: ObjectUtil.removeNil(
          param
        ) as Identity.Open.ListOpenClientParam,
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
  async getClient(
    clientId: string
  ): Promise<Identity.Open.OpenThirdpartyClient> {
    const response = await this.axios.request<
      Identity.Open.OpenThirdpartyClient
    >({
      url: `/v1/manage/open/client`,
      method: 'GET',
      params: { clientId } as Identity.Open.GetOpenClientParam,
    });
    return response.data as Identity.Open.OpenThirdpartyClient;
  }
}

export const createManageOpenClient = (
  clientConfig: IdentityModuleClientConfig
): IdentityManageOpenClient => new IdentityManageOpenClient(clientConfig);
