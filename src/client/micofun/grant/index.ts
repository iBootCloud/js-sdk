import { AxiosBaseClient } from '../../axios';
import { MicofunModuleClientConfig } from '../index';
import { IBC, ObjectUtil } from '@ibootcloud/common-lib';
import { Micofun } from '../../../types';

export interface MicofunGrantClientConfig {
  instanceId: string;
}

export class MicofunGrantClient {
  grantClientConfig: MicofunGrantClientConfig;
  axios: AxiosBaseClient;
  policy = {
    /**
     * 保存策略 [V1]
     * PUT /v1/grant/policy
     * 接口ID：29670964
     * 接口地址：https://www.apifox.cn/web/project/1031456/apis/api-29670964
     */
    save: async (
      params: Micofun.Grant.GrantPolicy
    ): Promise<Micofun.Grant.GrantPolicy> => {
      const response = await this.axios.request<
        Micofun.Grant.GrantPolicy,
        Micofun.Grant.GrantPolicy
      >({
        url: `/v1/grant/policy`,
        method: 'PUT',
        data: ObjectUtil.removeUndefined(params),
      });
      return response!.data as Micofun.Grant.GrantPolicy;
    },

    /**
     * 移除策略 [V1]
     * DELETE /v1/grant/policy
     * 接口ID：29670965
     * 接口地址：https://www.apifox.cn/web/project/1031456/apis/api-29670965
     */
    remove: async (
      params: Micofun.Grant.RemovePolicyBody
    ): Promise<Micofun.Grant.GrantEntityUpdateAffected> => {
      const response = await this.axios.request<
        Micofun.Grant.RemoveGrantEntityResponse,
        Micofun.Grant.RemovePolicyBody
      >({
        url: `/v1/grant/policy`,
        method: 'DELETE',
        data: ObjectUtil.removeUndefined(params),
      });
      return response.data!.affected;
    },

    /**
     * 获取策略列表 [V1]
     * GET /v1/grant/policy/list
     * 接口ID：29670966
     * 接口地址：https://www.apifox.cn/web/project/1031456/apis/api-29670966
     */
    list: async (
      params: Micofun.Grant.ListPolicyParam
    ): Promise<
      IBC.Page<Micofun.Grant.GrantPolicy & Micofun.Grant.GrantEntityBindingAttr>
    > => {
      const response = await this.axios.request<
        Micofun.Grant.ListPolicyResponse
      >({
        url: `/v1/grant/policy/list`,
        method: 'GET',
        params: ObjectUtil.removeUndefined(params),
      });
      return response.data!.page;
    },
  };
  subject = {
    /**
     * 保存主体 [V1]
     * PUT /v1/grant/subject
     * 接口ID：29685822
     * 接口地址：https://www.apifox.cn/web/project/1031456/apis/api-29685822
     */
    save: async (
      params: Micofun.Grant.GrantSubject
    ): Promise<Micofun.Grant.GrantSubject> => {
      const response = await this.axios.request<
        Micofun.Grant.GrantSubject,
        Micofun.Grant.GrantSubject
      >({
        url: `/v1/grant/subject`,
        method: 'PUT',
        data: ObjectUtil.removeUndefined(params),
      });
      return response!.data as Micofun.Grant.GrantSubject;
    },

    /**
     * 移除主体 [V1]
     * DELETE /v1/grant/subject
     * 接口ID：29685823
     * 接口地址：https://www.apifox.cn/web/project/1031456/apis/api-29685823
     */
    remove: async (
      params: Micofun.Grant.RemoveSubjectBody
    ): Promise<Micofun.Grant.GrantEntityUpdateAffected> => {
      const response = await this.axios.request<
        Micofun.Grant.RemoveGrantEntityResponse,
        Micofun.Grant.RemoveSubjectBody
      >({
        url: `/v1/grant/subject`,
        method: 'DELETE',
        data: ObjectUtil.removeUndefined(params),
      });
      return response.data!.affected;
    },

    /**
     * 获取主体列表 [V1]
     * GET /v1/grant/subject/list
     * 接口ID：29685824
     * 接口地址：https://www.apifox.cn/web/project/1031456/apis/api-29685824
     */
    list: async (
      params: Micofun.Grant.ListSubjectParam
    ): Promise<
      IBC.Page<
        Micofun.Grant.GrantSubject & Micofun.Grant.GrantEntityBindingAttr
      >
    > => {
      const response = await this.axios.request<
        Micofun.Grant.ListSubjectResponse
      >({
        url: `/v1/grant/subject/list`,
        method: 'GET',
        params: ObjectUtil.removeUndefined(params),
      });
      return response.data!.page;
    },
  };
  group = {
    /**
     * 保存分组 [V1]
     * PUT /v1/grant/group
     * 接口ID：29685607
     * 接口地址：https://www.apifox.cn/web/project/1031456/apis/api-29685607
     */
    save: async (
      params: Micofun.Grant.GrantGroup
    ): Promise<Micofun.Grant.GrantGroup> => {
      const response = await this.axios.request<
        Micofun.Grant.GrantGroup,
        Micofun.Grant.GrantGroup
      >({
        url: `/v1/grant/group`,
        method: 'PUT',
        data: ObjectUtil.removeUndefined(params),
      });
      return response!.data as Micofun.Grant.GrantGroup;
    },

    /**
     * 移除分组 [V1]
     * DELETE /v1/grant/group
     * 接口ID：29685608
     * 接口地址：https://www.apifox.cn/web/project/1031456/apis/api-29685608
     */
    remove: async (
      params: Micofun.Grant.RemoveGroupBody
    ): Promise<Micofun.Grant.GrantEntityUpdateAffected> => {
      const response = await this.axios.request<
        Micofun.Grant.RemoveGrantEntityResponse,
        Micofun.Grant.RemoveGroupBody
      >({
        url: `/v1/grant/group`,
        method: 'DELETE',
        data: ObjectUtil.removeUndefined(params),
      });
      return response.data!.affected;
    },
    /**
     * 获取分组列表 [V1]
     * GET /v1/grant/group/list
     * 接口ID：29685609
     * 接口地址：https://www.apifox.cn/web/project/1031456/apis/api-29685609
     */
    list: async (
      params: Micofun.Grant.ListGroupParam
    ): Promise<
      IBC.Page<Micofun.Grant.GrantGroup & Micofun.Grant.GrantEntityBindingAttr>
    > => {
      const response = await this.axios.request<
        Micofun.Grant.ListGroupResponse
      >({
        url: `/v1/grant/group/list`,
        method: 'GET',
        params: ObjectUtil.removeUndefined(params),
      });
      return response.data!.page;
    },
  };
  role = {
    /**
     * 保存角色 [V1]
     * PUT /v1/grant/role
     * 接口ID：21602858
     * 接口地址：https://www.apifox.cn/web/project/1031456/apis/api-21602858
     */
    save: async (
      params: Micofun.Grant.GrantRole
    ): Promise<Micofun.Grant.GrantRole> => {
      const response = await this.axios.request<
        Micofun.Grant.GrantRole,
        Micofun.Grant.GrantRole
      >({
        url: `/v1/grant/role`,
        method: 'PUT',
        data: ObjectUtil.removeUndefined(params),
      });
      return response!.data as Micofun.Grant.GrantRole;
    },

    /**
     * 移除角色 [V1]
     * DELETE /v1/grant/role
     * 接口ID：21602859
     * 接口地址：https://www.apifox.cn/web/project/1031456/apis/api-21602859
     */
    remove: async (
      params: Micofun.Grant.RemoveRoleBody
    ): Promise<Micofun.Grant.GrantEntityUpdateAffected> => {
      const response = await this.axios.request<
        Micofun.Grant.RemoveGrantEntityResponse,
        Micofun.Grant.RemoveRoleBody
      >({
        url: `/v1/grant/role`,
        method: 'DELETE',
        data: ObjectUtil.removeUndefined(params),
      });
      return response.data!.affected;
    },
    /**
     * 获取角色列表 [V1]
     * GET /v1/grant/role/list
     * 接口ID：21602905
     * 接口地址：https://www.apifox.cn/web/project/1031456/apis/api-21602905
     */
    list: async (
      params: Micofun.Grant.ListRoleParam
    ): Promise<
      IBC.Page<Micofun.Grant.GrantRole & Micofun.Grant.GrantEntityBindingAttr>
    > => {
      const response = await this.axios.request<Micofun.Grant.ListRoleResponse>(
        {
          url: `/v1/grant/role/list`,
          method: 'GET',
          params: ObjectUtil.removeUndefined(params),
        }
      );
      return response.data!.page;
    },
  };

  constructor(
    grantClientConfig: MicofunGrantClientConfig,
    moduleClientConfig: MicofunModuleClientConfig
  ) {
    this.grantClientConfig = grantClientConfig;
    this.axios = new AxiosBaseClient({
      ...moduleClientConfig,
      ...grantClientConfig,
    });
  }

  /**
   * 主体尝试资源 [V1]
   * GET /v1/grant/challenge
   * 接口ID：21604059
   * 接口地址：https://www.apifox.cn/web/project/1031456/apis/api-21604059
   */
  async challenge(
    params: Micofun.Grant.ChallengeParam
  ): Promise<Micofun.Grant.GrantPolicyEffect[]> {
    const response = await this.axios.request<Micofun.Grant.ChallengeResponse>({
      url: `/v1/grant/challenge`,
      method: 'GET',
      params: ObjectUtil.removeUndefined(params),
    });
    return response.data!.effect;
  }

  /**
   * 提交绑定关系 [V1]
   * POST /v1/grant/relation
   * 接口ID：29685186
   * 接口地址：https://www.apifox.cn/web/project/1031456/apis/api-29685186
   */
  async bind(params: Micofun.Grant.BindRelBody): Promise<void> {
    await this.axios.request<void, Micofun.Grant.BindRelBody>({
      url: `/v1/grant/relation`,
      method: 'POST',
      data: ObjectUtil.removeUndefined(params),
    });
  }

  /**
   * 移除绑定关系 [V1]
   * DELETE /v1/grant/relation
   * 接口ID：29685187
   * 接口地址：https://www.apifox.cn/web/project/1031456/apis/api-29685187
   */
  async unbind(
    params: Micofun.Grant.UnBindRelBody
  ): Promise<Micofun.Grant.GrantEntityUpdateAffected | number> {
    const response = await this.axios.request<
      Micofun.Grant.UnBindRelResponse,
      Micofun.Grant.UnBindRelBody
    >({
      url: `/v1/grant/relation`,
      method: 'DELETE',
      data: ObjectUtil.removeUndefined(params),
    });
    return response.data!.affected;
  }

  /**
   * 获取绑定关系 [V1]
   * GET /v1/grant/relation
   * 接口ID：29685188
   * 接口地址：https://www.apifox.cn/web/project/1031456/apis/api-29685188
   */
  async getBindRelations(
    params: Micofun.Grant.GetBindingRelParam
  ): Promise<Micofun.Grant.GrantEntityBinding> {
    const response = await this.axios.request<Micofun.Grant.GrantEntityBinding>(
      {
        url: `/v1/grant/relation`,
        method: 'GET',
        params: ObjectUtil.removeUndefined(params),
      }
    );
    return response!.data as Micofun.Grant.GrantEntityBinding;
  }
}

export const createGrantClient = (
  moduleClientConfig: MicofunModuleClientConfig,
  cfg: MicofunGrantClientConfig
): MicofunGrantClient => new MicofunGrantClient(cfg, moduleClientConfig);
