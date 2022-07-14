import { AxiosBaseClient } from '../../axios';
import { IdentityModuleClientConfig } from '../index';
import {
  IdentityEndUserConnectLoginBody,
  IdentityEndUserLoginByPasswordBody,
  IdentityEndUserLoginResponse,
  IdentityEndUserLogoutBody,
  IdentityEndUserLogoutResponse,
  IdentityEndUserMagicTokenLoginBody,
  IdentityEndUserOTPLoginBody,
  IdentityEndUserPasswordlessLoginResponse,
  IdentityEndUserRefreshUserTokenParam,
  IdentityEndUserRequestParam,
} from '../../../types';
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
  ): Promise<IdentityEndUserLoginResponse> {
    const response = await this.axios.request<IdentityEndUserLoginResponse>({
      url: `/v1/endUser/auth/token`,
      method: 'GET',
      params: ObjectUtil.removeNil({
        refreshToken,
      }) as IdentityEndUserRefreshUserTokenParam,
    });
    return response!.data as IdentityEndUserLoginResponse;
  }

  /**
   * 用户登出 [V1]
   * POST /v1/endUser/auth/logout
   * 接口ID：21397317
   * 接口地址：https://www.apifox.cn/web/project/1031456/apis/api-21397317
   */
  async logout(
    param: IdentityEndUserLogoutBody & IdentityEndUserRequestParam
  ): Promise<string> {
    const response = await new AxiosBaseClient({
      ...this.clientConfig,
      accessToken: param?.accessToken,
    }).request<IdentityEndUserLogoutResponse, IdentityEndUserLogoutBody>({
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
    param: IdentityEndUserLoginByPasswordBody
  ): Promise<IdentityEndUserLoginResponse> {
    const response = await this.axios.request<
      IdentityEndUserLoginResponse,
      IdentityEndUserLoginByPasswordBody
    >({
      url: `/v1/endUser/auth/login/password`,
      method: 'POST',
      data: ObjectUtil.removeNil(param),
    });
    return response!.data as IdentityEndUserLoginResponse;
  }

  /**
   * OTP登录 [V1]
   * POST /v1/endUser/auth/login/passwordless/otp
   * 接口ID：21596700
   * 接口地址：https://www.apifox.cn/web/project/1031456/apis/api-21596700
   */
  async loginByOTP(
    param: IdentityEndUserOTPLoginBody
  ): Promise<IdentityEndUserPasswordlessLoginResponse> {
    const response = await this.axios.request<
      IdentityEndUserPasswordlessLoginResponse,
      IdentityEndUserOTPLoginBody
    >({
      url: `/v1/endUser/auth/login/passwordless/otp`,
      method: 'POST',
      data: ObjectUtil.removeNil(param),
    });
    return response!.data as IdentityEndUserPasswordlessLoginResponse;
  }

  /**
   * 魔术令牌登录 [V1]
   * POST /v1/endUser/auth/login/passwordless/magicToken
   * 接口ID：21443877
   * 接口地址：https://www.apifox.cn/web/project/1031456/apis/api-21443877
   */
  async loginByMagicToken(
    token: string
  ): Promise<IdentityEndUserPasswordlessLoginResponse> {
    const response = await this.axios.request<
      IdentityEndUserPasswordlessLoginResponse,
      IdentityEndUserMagicTokenLoginBody
    >({
      url: `/v1/endUser/auth/login/passwordless/magicToken`,
      method: 'POST',
      data: ObjectUtil.removeNil({ token }),
    });
    return response!.data as IdentityEndUserPasswordlessLoginResponse;
  }

  /**
   * 第三方登录 [V1]
   * POST /v1/endUser/auth/login/connect
   * 接口ID：21559438
   * 接口地址：https://www.apifox.cn/web/project/1031456/apis/api-21559438
   */
  async connectLogin(
    param: IdentityEndUserConnectLoginBody
  ): Promise<IdentityEndUserLoginResponse> {
    const response = await this.axios.request<
      IdentityEndUserLoginResponse,
      IdentityEndUserConnectLoginBody
    >({
      url: `/v1/endUser/auth/login/connect`,
      method: 'POST',
      data: ObjectUtil.removeNil(param),
    });
    return response!.data as IdentityEndUserLoginResponse;
  }

  /**
   * 关联第三方身份 [V1]
   * POST /v1/endUser/auth/connect/bind
   * 接口ID：29197303
   * 接口地址：https://www.apifox.cn/web/project/1031456/apis/api-29197303
   */
  async bindConnect(
    param: IdentityEndUserConnectLoginBody & IdentityEndUserRequestParam
  ): Promise<void> {
    await new AxiosBaseClient({
      ...this.clientConfig,
      accessToken: param?.accessToken,
    }).request<void, IdentityEndUserConnectLoginBody>({
      url: `/v1/endUser/auth/connect/bind`,
      method: 'POST',
      data: ObjectUtil.removeNil(param),
    });
  }
}

export const createEndUserAuthClient = (
  clientConfig: IdentityModuleClientConfig
): IdentityEndUserAuthClient => new IdentityEndUserAuthClient(clientConfig);
