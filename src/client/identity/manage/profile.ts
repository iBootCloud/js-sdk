import { AxiosBaseClient, PaginationOpt } from '../../axios';
import { IdentityModuleClientConfig } from '../index';
import { Identity } from '../../../types';
import { IBC, ObjectUtil } from '@ibootcloud/common-lib';

export class IdentityManageUserProfileClient {
  clientConfig: IdentityModuleClientConfig;
  axios: AxiosBaseClient;

  constructor(cfg: IdentityModuleClientConfig) {
    this.clientConfig = { ...cfg };
    this.axios = new AxiosBaseClient({
      ...cfg,
    });
  }

  /**
   * 创建用户 [V1]
   * POST /v1/manage/user/profile
   * 接口ID：21397340
   * 接口地址：https://www.apifox.cn/web/project/1031456/apis/api-21397340
   */
  async create(
    param: Identity.Profile.CreateUserBody
  ): Promise<Identity.Profile.UserProfile> {
    const response = await this.axios.request<
      Identity.Profile.CreateUserResponse,
      Identity.Profile.CreateUserBody
    >({
      url: `/v1/manage/user/profile`,
      method: 'POST',
      data: ObjectUtil.removeNil(param),
    });
    return response.data as Identity.Profile.UserProfile;
  }

  /**
   * 编辑用户资料 [V1]
   * PATCH /v1/manage/user/profile
   * 接口ID：21397345
   * 接口地址：https://www.apifox.cn/web/project/1031456/apis/api-21397345
   */
  async edit(
    uid: string,
    profile: Identity.Profile.UserProfileWithoutUID
  ): Promise<void> {
    await this.axios.request<void, Identity.Profile.EditUserProfileBody>({
      url: `/v1/manage/user/profile`,
      method: 'PATCH',
      data: { uid, profile: ObjectUtil.removeUndefined(profile) },
    });
  }

  /**
   * 移除用户 [V1]
   * DELETE /v1/manage/user/profile
   * 接口ID：21397341
   * 接口地址：https://www.apifox.cn/web/project/1031456/apis/api-21397341
   */
  async remove(uid: string[]): Promise<number> {
    const response = await this.axios.request<
      Identity.Profile.RemoveUserResponse,
      Identity.Profile.RemoveUserBody
    >({
      url: `/v1/manage/user/profile`,
      method: 'DELETE',
      data: { uid },
    });
    return response.data!.affected;
  }

  /**
   * 搜索用户资料 [V1]
   * GET /v1/manage/user/profile/search
   * 接口ID：29257729
   * 接口地址：https://www.apifox.cn/web/project/1031456/apis/api-29257729
   */
  async search(
    param: Identity.Profile.SearchUserProfileParam = {},
    opt?: PaginationOpt
  ): Promise<IBC.Page<Identity.Profile.UserProfile>> {
    const response = await this.axios.request<
      Identity.Profile.SearchUserProfileResponse
    >(
      {
        url: `/v1/manage/user/profile/search`,
        method: 'GET',
        params: ObjectUtil.removeNil(param),
      },
      opt
    );
    return response.data!.page;
  }

  /**
   * 通过识别符匹配用户 [V1]
   * GET /v1/manage/user/profile/match/identifier
   * 接口ID：21397344
   * 接口地址：https://www.apifox.cn/web/project/1031456/apis/api-21397344
   */
  async matchUserByIdentifier(
    identifier: string,
    identifierType?: Identity.Profile.UserIdentifierType
  ): Promise<Identity.Profile.UserProfile> {
    const response = await this.axios.request<
      Identity.Profile.GetUserByIdentifierResponse
    >({
      url: `/v1/manage/user/profile/match/identifier`,
      method: 'GET',
      params: ObjectUtil.removeNil({
        identifier,
        identifierType,
      }),
    });
    return response!.data as Identity.Profile.UserProfile;
  }

  /**
   * 获取单个用户资料 [V1]
   * GET /v1/manage/user/profile
   * 接口ID：21397346
   * 接口地址：https://www.apifox.cn/web/project/1031456/apis/api-21397346
   */
  async findOne(
    param: Identity.Profile.GetSingleUserProfileParam
  ): Promise<Identity.Profile.UserProfile> {
    const response = await this.axios.request<
      Identity.Profile.GetSingleUserProfileResponse
    >({
      url: `/v1/manage/user/profile`,
      method: 'GET',
      params: ObjectUtil.removeNil(param),
    });
    return response!.data as Identity.Profile.UserProfile;
  }
}

export const createManageUserProfileClient = (
  clientConfig: IdentityModuleClientConfig
): IdentityManageUserProfileClient =>
  new IdentityManageUserProfileClient(clientConfig);
