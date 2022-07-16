import { AxiosBaseClient } from '../../axios';
import { IdentityModuleClientConfig } from '../index';
import { Identity } from '../../../types';
import { ObjectUtil } from '@ibootcloud/common-lib';

export class IdentityEndUserAuthClient {
  clientConfig: IdentityModuleClientConfig;
  axios: AxiosBaseClient;

  constructor(cfg: IdentityModuleClientConfig) {
    this.clientConfig = { ...cfg };
    this.axios = new AxiosBaseClient({
      ...this.clientConfig,
    });
  }

  /**
   * 刷新获取用户令牌 [V1]
   * GET /v1/endUser/auth/token
   * 接口ID：21397316
   * 接口地址：https://www.apifox.cn/web/project/1031456/apis/api-21397316
   */
  async refreshUserToken(
    refreshToken: string
  ): Promise<Identity.Auth.EndUserLoginResponse> {
    const response = await this.axios.request<
      Identity.Auth.EndUserLoginResponse
    >({
      url: `/v1/endUser/auth/token`,
      method: 'GET',
      params: ObjectUtil.removeNil({
        refreshToken,
      }) as Identity.Auth.EndUserRefreshUserTokenParam,
    });
    return response!.data as Identity.Auth.EndUserLoginResponse;
  }

  /**
   * 用户登出 [V1]
   * POST /v1/endUser/auth/logout
   * 接口ID：21397317
   * 接口地址：https://www.apifox.cn/web/project/1031456/apis/api-21397317
   */
  async logout(
    param: Identity.Auth.EndUserLogoutBody & Identity.EndUserRequestParam
  ): Promise<string> {
    const response = await new AxiosBaseClient({
      ...this.clientConfig,
      accessToken: param?.accessToken,
    }).request<
      Identity.Auth.EndUserLogoutResponse,
      Identity.Auth.EndUserLogoutBody
    >({
      url: `/v1/endUser/auth/logout`,
      method: 'POST',
      data: ObjectUtil.removeNil(param),
    });
    return response!.data!.uid;
  }

  /**
   * 密码登录 [V1]
   * POST /v1/endUser/auth/login/password
   * 接口ID：21397315
   * 接口地址：https://www.apifox.cn/web/project/1031456/apis/api-21397315
   */
  async loginByPassword(
    param: Identity.Auth.EndUserLoginByPasswordBody
  ): Promise<Identity.Auth.EndUserLoginResponse> {
    const response = await this.axios.request<
      Identity.Auth.EndUserLoginResponse,
      Identity.Auth.EndUserLoginByPasswordBody
    >({
      url: `/v1/endUser/auth/login/password`,
      method: 'POST',
      data: ObjectUtil.removeNil(param),
    });
    return response!.data as Identity.Auth.EndUserLoginResponse;
  }

  /**
   * OTP登录 [V1]
   * POST /v1/endUser/auth/login/passwordless/otp
   * 接口ID：21596700
   * 接口地址：https://www.apifox.cn/web/project/1031456/apis/api-21596700
   */
  async loginByOTP(
    param: Identity.Auth.EndUserOTPLoginBody
  ): Promise<Identity.Auth.EndUserPasswordlessLoginResponse> {
    const response = await this.axios.request<
      Identity.Auth.EndUserPasswordlessLoginResponse,
      Identity.Auth.EndUserOTPLoginBody
    >({
      url: `/v1/endUser/auth/login/passwordless/otp`,
      method: 'POST',
      data: ObjectUtil.removeNil(param),
    });
    return response!.data as Identity.Auth.EndUserPasswordlessLoginResponse;
  }

  /**
   * 魔术令牌登录 [V1]
   * POST /v1/endUser/auth/login/passwordless/magicToken
   * 接口ID：21443877
   * 接口地址：https://www.apifox.cn/web/project/1031456/apis/api-21443877
   */
  async loginByMagicToken(
    token: string
  ): Promise<Identity.Auth.EndUserPasswordlessLoginResponse> {
    const response = await this.axios.request<
      Identity.Auth.EndUserPasswordlessLoginResponse,
      Identity.Auth.EndUserMagicTokenLoginBody
    >({
      url: `/v1/endUser/auth/login/passwordless/magicToken`,
      method: 'POST',
      data: ObjectUtil.removeNil({ token }),
    });
    return response!.data as Identity.Auth.EndUserPasswordlessLoginResponse;
  }

  /**
   * 第三方登录 [V1]
   * POST /v1/endUser/auth/login/connect
   * 接口ID：21559438
   * 接口地址：https://www.apifox.cn/web/project/1031456/apis/api-21559438
   */
  async connectLogin(
    param: Identity.Auth.EndUserConnectLoginBody
  ): Promise<Identity.Auth.EndUserLoginResponse> {
    const response = await this.axios.request<
      Identity.Auth.EndUserLoginResponse,
      Identity.Auth.EndUserConnectLoginBody
    >({
      url: `/v1/endUser/auth/login/connect`,
      method: 'POST',
      data: ObjectUtil.removeNil(param),
    });
    return response!.data as Identity.Auth.EndUserLoginResponse;
  }

  /**
   * 关联第三方身份 [V1]
   * POST /v1/endUser/auth/connect/bind
   * 接口ID：29197303
   * 接口地址：https://www.apifox.cn/web/project/1031456/apis/api-29197303
   */
  async bindConnect(
    param: Identity.Auth.EndUserConnectLoginBody & Identity.EndUserRequestParam
  ): Promise<void> {
    await new AxiosBaseClient({
      ...this.clientConfig,
      accessToken: param?.accessToken,
    }).request<void, Identity.Auth.EndUserConnectLoginBody>({
      url: `/v1/endUser/auth/connect/bind`,
      method: 'POST',
      data: ObjectUtil.removeNil(param),
    });
  }
}

export const createEndUserAuthClient = (
  clientConfig: IdentityModuleClientConfig
): IdentityEndUserAuthClient => new IdentityEndUserAuthClient(clientConfig);
