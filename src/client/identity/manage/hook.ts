import { AxiosBaseClient, PaginationOpt } from '../../axios';
import { IdentityModuleClientConfig } from '../index';
import { Identity } from '../../../types';
import { IBC, ObjectUtil } from '@ibootcloud/common-lib';

export class IdentityManageHookClient {
  clientConfig: IdentityModuleClientConfig;
  axios: AxiosBaseClient;

  constructor(cfg: IdentityModuleClientConfig) {
    this.clientConfig = { ...cfg };
    this.axios = new AxiosBaseClient({
      ...cfg,
    });
  }

  /**
   * 添加Hook [V1]
   * POST /v1/manage/hook
   * 接口ID：21547686
   * 接口地址：https://www.apifox.cn/web/project/1031456/apis/api-21547686
   */
  async create(
    param: Identity.Hook.CreateHookBody
  ): Promise<Identity.Hook.Hook> {
    const response = await this.axios.request<
      Identity.Hook.Hook,
      Identity.Hook.CreateHookBody
    >({
      url: `/v1/manage/hook`,
      method: 'POST',
      data: ObjectUtil.removeUndefined(param),
    });
    return response.data as Identity.Hook.Hook;
  }

  /**
   * 更新Hook [V1]
   * PUT /v1/manage/hook
   * 接口ID：21587179
   * 接口地址：https://www.apifox.cn/web/project/1031456/apis/api-21587179
   */
  async update(param: Identity.Hook.UpdateHookBody): Promise<void> {
    await this.axios.request<void, Identity.Hook.UpdateHookBody>({
      url: `/v1/manage/hook`,
      method: 'PUT',
      data: ObjectUtil.removeUndefined(param),
    });
  }

  /**
   * 移除Hook [V1]
   * DELETE /v1/manage/hook
   * 接口ID：21574199
   * 接口地址：https://www.apifox.cn/web/project/1031456/apis/api-21574199
   */
  async remove(hookId: string[]): Promise<void> {
    await this.axios.request<void, Identity.Hook.RemoveHookBody>({
      url: `/v1/manage/hook`,
      method: 'DELETE',
      data: ObjectUtil.removeUndefined({ hookId }),
    });
  }

  /**
   * 获取Hook [V1]
   * GET /v1/manage/hook
   * 接口ID：21575122
   * 接口地址：https://www.apifox.cn/web/project/1031456/apis/api-21575122
   */
  async list(
    param: Identity.Hook.ListHookParam = {},
    opt?: PaginationOpt
  ): Promise<IBC.Page<Identity.Hook.Hook>> {
    const response = await this.axios.request<Identity.Hook.ListHookResponse>(
      {
        url: `/v1/manage/hook`,
        method: 'GET',
        params: ObjectUtil.removeNil(param),
      },
      opt
    );
    return response.data!.page;
  }
}

export const createManageHookClient = (
  clientConfig: IdentityModuleClientConfig
): IdentityManageHookClient => new IdentityManageHookClient(clientConfig);
