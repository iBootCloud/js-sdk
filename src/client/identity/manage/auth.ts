import { AxiosBaseClient } from '../../axios';
import { IdentityModuleClientConfig } from '../index';
import { Identity } from '../../../types';
import { ObjectUtil } from '@ibootcloud/common-lib';

export class IdentityManageAuthClient {
  clientConfig: IdentityModuleClientConfig;
  axios: AxiosBaseClient;

  constructor(cfg: IdentityModuleClientConfig) {
    this.clientConfig = { ...cfg };
    this.axios = new AxiosBaseClient({
      ...cfg,
    });
  }

  /**
   * 修改用户密码 [V1]
   * PUT /v1/manage/auth/password
   * 接口ID：29177639
   * 接口地址：https://www.apifox.cn/web/project/1031456/apis/api-29177639
   */
  async updateUserPassword(uid: string, password: string): Promise<void> {
    await this.axios.request<void, Identity.Auth.UpdateUserPasswordBody>({
      url: `/v1/manage/auth/password`,
      method: 'PUT',
      data: ObjectUtil.removeNil({ uid, password }),
    });
  }

  /**
   * 申请魔术令牌登录 [V1]
   * POST /v1/manage/auth/login/passwordless/magicToken/apply
   * 接口ID：21515262
   * 接口地址：https://www.apifox.cn/web/project/1031456/apis/api-21515262
   */
  async applyMagicTokenLogin(
    param: Identity.Auth.ApplyPasswordlessLoginBody
  ): Promise<Identity.Auth.ApplyMagicTokenLoginResponse> {
    const response = await this.axios.request<
      Identity.Auth.ApplyMagicTokenLoginResponse,
      Identity.Auth.ApplyPasswordlessLoginBody
    >({
      url: `/v1/manage/auth/login/passwordless/magicToken/apply`,
      method: 'POST',
      data: ObjectUtil.removeNil(param),
    });
    return response.data as Identity.Auth.ApplyMagicTokenLoginResponse;
  }

  /**
   * 申请OTP登录 [V1]
   * POST /v1/manage/auth/login/passwordless/otp/apply
   * 接口ID：21596769
   * 接口地址：https://www.apifox.cn/web/project/1031456/apis/api-21596769
   */
  async applyOTPLogin(
    param: Identity.Auth.ApplyOTPLoginBody
  ): Promise<Identity.Auth.ApplyOTPLoginResponse> {
    const response = await this.axios.request<
      Identity.Auth.ApplyOTPLoginResponse,
      Identity.Auth.ApplyOTPLoginBody
    >({
      url: `/v1/manage/auth/login/passwordless/otp/apply`,
      method: 'POST',
      data: ObjectUtil.removeNil(param),
    });
    return response.data as Identity.Auth.ApplyOTPLoginResponse;
  }

  /**
   * 下线用户令牌 [V1]
   * DELETE /v1/manage/auth/token
   * 接口ID：21397342
   * 接口地址：https://www.apifox.cn/web/project/1031456/apis/api-21397342
   */
  async invalidUserToken(
    param: Identity.Auth.InvalidUserTokenBody
  ): Promise<void> {
    await this.axios.request<void, Identity.Auth.InvalidUserTokenBody>({
      url: `/v1/manage/auth/token`,
      method: 'DELETE',
      data: ObjectUtil.removeNil(param),
    });
  }

  /**
   * 生成用户令牌 [V1]
   * GET /v1/manage/auth/token
   * 接口ID：21599708
   * 接口地址：https://www.apifox.cn/web/project/1031456/apis/api-21599708
   */
  async generateUserToken(uid: string): Promise<Identity.Auth.UserTokenPack> {
    const response = await this.axios.request<
      Identity.Auth.GenerateUserTokenResponse
    >({
      url: `/v1/manage/auth/token`,
      method: 'GET',
      params: { uid } as Identity.Auth.GenerateUserTokenParam,
    });
    return response.data!.token;
  }
}

export const createManageAuthClient = (
  clientConfig: IdentityModuleClientConfig
): IdentityManageAuthClient => new IdentityManageAuthClient(clientConfig);
