import { IdentityModuleClientConfig } from '../index';
import { AxiosBaseClient } from '../../axios';
import {
  IdentityOpenClientRequestTokenParam,
  IdentityOpenClientRequestTokenResponse,
  IdentityOpenClientRequestUserResponse,
  IdentityOpenRefreshTokenBody,
} from '../../../types';
import { ObjectUtil } from '@ibootcloud/common-lib';

export class IdentityOpenClient {
  clientConfig: IdentityModuleClientConfig;
  axios: AxiosBaseClient;

  constructor(cfg: IdentityModuleClientConfig) {
    this.clientConfig = { ...cfg };
    this.axios = new AxiosBaseClient({
      ...cfg,
    });
  }

  /**
   * 第三方应用请求oauth令牌 [V1]
   * GET /v1/open/oauth/token
   * 接口ID：21397364
   * 接口地址：https://www.apifox.cn/web/project/1031456/apis/api-21397364
   */
  async requestToken({
    grant_type = 'authorization_code',
    ...params
  }: {
    client_id: string;
    client_secret: string;
    grant_type?: string;
    code: string;
  }): Promise<IdentityOpenClientRequestTokenResponse> {
    const response = await this.axios.request<
      IdentityOpenClientRequestTokenResponse
    >({
      url: `/v1/open/oauth/token`,
      method: 'GET',
      params: ObjectUtil.removeNil({
        grant_type,
        ...params,
      }) as IdentityOpenClientRequestTokenParam,
    });
    return response!.data as IdentityOpenClientRequestTokenResponse;
  }

  /**
   * 第三方应用获取用户资料 [V1]
   * GET /v1/open/oauth/user
   * 接口ID：21397365
   * 接口地址：https://www.apifox.cn/web/project/1031456/apis/api-21397365
   */
  async requestUserProfile({
    accessToken,
  }: {
    accessToken: string;
  }): Promise<IdentityOpenClientRequestUserResponse> {
    const response = await new AxiosBaseClient({
      ...this.clientConfig,
      accessToken,
    }).request<IdentityOpenClientRequestUserResponse>({
      url: `/v1/open/oauth/user`,
      method: 'GET',
    });
    return response!.data as IdentityOpenClientRequestUserResponse;
  }

  /**
   * 第三方应用刷新令牌 [V1]
   * POST /v1/open/oauth/token/refresh
   * 接口ID：21397366
   * 接口地址：https://www.apifox.cn/web/project/1031456/apis/api-21397366
   */
  async refreshToken(
    param: IdentityOpenRefreshTokenBody
  ): Promise<IdentityOpenClientRequestTokenResponse> {
    const response = await this.axios.request<
      IdentityOpenClientRequestTokenResponse,
      IdentityOpenRefreshTokenBody
    >({
      url: `/v1/open/oauth/token/refresh`,
      method: 'POST',
      data: ObjectUtil.removeNil(param),
    });
    return response!.data as IdentityOpenClientRequestTokenResponse;
  }
}

export const createOpenClient = (
  clientConfig: IdentityModuleClientConfig
): IdentityOpenClient => new IdentityOpenClient(clientConfig);
