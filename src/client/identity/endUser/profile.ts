import { AxiosBaseClient } from '../../axios';
import { IdentityModuleClientConfig } from '../index';
import {
  IdentityEndUserGetMyProfileParam,
  IdentityEndUserGetMyProfileResponse,
  IdentityEndUserRequestParam,
  IdentityUserProfile,
} from '../../../types';
import { ObjectUtil } from '@ibootcloud/common-lib';

export class IdentityEndUserProfileClient {
  clientConfig: IdentityModuleClientConfig;
  axios: AxiosBaseClient;

  constructor(cfg: IdentityModuleClientConfig) {
    this.clientConfig = { ...cfg };
    this.axios = new AxiosBaseClient({
      ...cfg,
    });
  }

  /**
   * 获取个人资料 [V1]
   * GET /v1/endUser/profile/me
   * 接口ID：21397332
   * 接口地址：https://www.apifox.cn/web/project/1031456/apis/api-21397332
   */
  async getMyProfile(
    param: IdentityEndUserRequestParam & {
      config?: IdentityEndUserGetMyProfileParam;
    } = {}
  ): Promise<IdentityUserProfile> {
    const response = await new AxiosBaseClient({
      ...this.clientConfig,
      accessToken: param?.accessToken,
    }).request<IdentityEndUserGetMyProfileResponse>({
      url: `/v1/endUser/profile/me`,
      method: 'GET',
      params: ObjectUtil.removeNil(param.config),
    });
    return response!.data as IdentityUserProfile;
  }
}

export const createEndUserProfileClient = (
  clientConfig: IdentityModuleClientConfig
): IdentityEndUserProfileClient =>
  new IdentityEndUserProfileClient(clientConfig);
