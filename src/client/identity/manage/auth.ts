import { AxiosBaseClient } from '../../axios';
import { IdentityModuleClientConfig } from '../index';
import {
  IdentityApplyMagicTokenLoginResponse,
  IdentityApplyOTPLoginBody,
  IdentityApplyOTPLoginResponse,
  IdentityApplyPasswordlessLoginBody,
  IdentityGenerateUserTokenParam,
  IdentityGenerateUserTokenResponse,
  IdentityInvalidUserTokenBody,
  IdentityUpdateUserPasswordBody,
  IdentityUserTokenPack,
} from '../../../types';
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
    await this.axios.request<void, IdentityUpdateUserPasswordBody>({
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
    param: IdentityApplyPasswordlessLoginBody
  ): Promise<IdentityApplyMagicTokenLoginResponse> {
    const response = await this.axios.request<
      IdentityApplyMagicTokenLoginResponse,
      IdentityApplyPasswordlessLoginBody
    >({
      url: `/v1/manage/auth/login/passwordless/magicToken/apply`,
      method: 'POST',
      data: ObjectUtil.removeNil(param),
    });
    return response.data as IdentityApplyMagicTokenLoginResponse;
  }

  /**
   * 申请OTP登录 [V1]
   * POST /v1/manage/auth/login/passwordless/otp/apply
   * 接口ID：21596769
   * 接口地址：https://www.apifox.cn/web/project/1031456/apis/api-21596769
   */
  async applyOTPLogin(
    param: IdentityApplyOTPLoginBody
  ): Promise<IdentityApplyOTPLoginResponse> {
    const response = await this.axios.request<
      IdentityApplyOTPLoginResponse,
      IdentityApplyOTPLoginBody
    >({
      url: `/v1/manage/auth/login/passwordless/otp/apply`,
      method: 'POST',
      data: ObjectUtil.removeNil(param),
    });
    return response.data as IdentityApplyOTPLoginResponse;
  }

  /**
   * 下线用户令牌 [V1]
   * DELETE /v1/manage/auth/token
   * 接口ID：21397342
   * 接口地址：https://www.apifox.cn/web/project/1031456/apis/api-21397342
   */
  async invalidUserToken(param: IdentityInvalidUserTokenBody): Promise<void> {
    await this.axios.request<void, IdentityInvalidUserTokenBody>({
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
  async generateUserToken(uid: string): Promise<IdentityUserTokenPack> {
    const response = await this.axios.request<
      IdentityGenerateUserTokenResponse
    >({
      url: `/v1/manage/auth/token`,
      method: 'GET',
      params: { uid } as IdentityGenerateUserTokenParam,
    });
    return response.data!.token;
  }
}

export const createManageAuthClient = (
  clientConfig: IdentityModuleClientConfig
): IdentityManageAuthClient => new IdentityManageAuthClient(clientConfig);
