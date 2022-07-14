import { AxiosBaseClient, PaginationOpt } from '../../axios';
import { IdentityModuleClientConfig } from '../index';
import {
  IdentityCreateUserBody,
  IdentityCreateUserResponse,
  IdentityEditUserProfileBody,
  IdentityGetSingleUserProfileParam,
  IdentityGetSingleUserProfileResponse,
  IdentityGetUserByIdentifierResponse,
  IdentityRemoveUserBody,
  IdentityRemoveUserResponse,
  IdentitySearchUserProfileParam,
  IdentitySearchUserProfileResponse,
  IdentityUserIdentifierType,
  IdentityUserProfile,
  IdentityUserProfileWithoutUID,
} from '../../../types';
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
  async create(param: IdentityCreateUserBody): Promise<IdentityUserProfile> {
    const response = await this.axios.request<
      IdentityCreateUserResponse,
      IdentityCreateUserBody
    >({
      url: `/v1/manage/user/profile`,
      method: 'POST',
      data: ObjectUtil.removeNil(param),
    });
    return response.data as IdentityUserProfile;
  }

  /**
   * 编辑用户资料 [V1]
   * PATCH /v1/manage/user/profile
   * 接口ID：21397345
   * 接口地址：https://www.apifox.cn/web/project/1031456/apis/api-21397345
   */
  async edit(
    uid: string,
    profile: IdentityUserProfileWithoutUID
  ): Promise<void> {
    await this.axios.request<void, IdentityEditUserProfileBody>({
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
      IdentityRemoveUserResponse,
      IdentityRemoveUserBody
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
    param: IdentitySearchUserProfileParam = {},
    opt?: PaginationOpt
  ): Promise<IBC.Page<IdentityUserProfile>> {
    const response = await this.axios.request<
      IdentitySearchUserProfileResponse
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
    identifierType?: IdentityUserIdentifierType
  ): Promise<IdentityUserProfile> {
    const response = await this.axios.request<
      IdentityGetUserByIdentifierResponse
    >({
      url: `/v1/manage/user/profile/match/identifier`,
      method: 'GET',
      params: ObjectUtil.removeNil({
        identifier,
        identifierType,
      }),
    });
    return response!.data as IdentityUserProfile;
  }

  /**
   * 获取单个用户资料 [V1]
   * GET /v1/manage/user/profile
   * 接口ID：21397346
   * 接口地址：https://www.apifox.cn/web/project/1031456/apis/api-21397346
   */
  async findOne(
    param: IdentityGetSingleUserProfileParam
  ): Promise<IdentityUserProfile> {
    const response = await this.axios.request<
      IdentityGetSingleUserProfileResponse
    >({
      url: `/v1/manage/user/profile`,
      method: 'GET',
      params: ObjectUtil.removeNil(param),
    });
    return response!.data as IdentityUserProfile;
  }
}

export const createManageUserProfileClient = (
  clientConfig: IdentityModuleClientConfig
): IdentityManageUserProfileClient =>
  new IdentityManageUserProfileClient(clientConfig);
