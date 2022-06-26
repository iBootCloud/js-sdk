import { AxiosBaseClient, IBCServiceClientConfig } from '../index';
import { IBCService } from '../../constants';
import {
  SearchableInitInstanceBody,
  SearchableInstanceInfo,
  SearchableInstanceSettings,
  SearchableInstanceStatus,
  SearchableListDocumentsResponse,
  SearchablePartialUpdateDocumentsBody,
  SearchableRemoveDocumentsBody,
  SearchableSaveDocumentsBody,
  SearchableSearchDocumentsBody,
  SearchableSearchResult,
} from '../../types';
import { IBC, ObjectUtil } from '@ibootcloud/common-lib';

export type SearchableClientConfig = {
  instanceId: string;
};
export type CreateSearchableClientConfig = SearchableClientConfig &
  IBCServiceClientConfig;

export class SearchableClient {
  axios: AxiosBaseClient;
  constructor(serviceClientConfig: CreateSearchableClientConfig) {
    this.axios = new AxiosBaseClient({
      ...serviceClientConfig,
      service: IBCService.SEARCHABLE,
    });
  }
  /**
   * 搜索文档【V1】
   * POST /v1/search
   * 接口ID：26226103
   * 接口地址：https://www.apifox.cn/web/project/1031456/apis/api-26226103
   */
  async search(
    param: SearchableSearchDocumentsBody,
    opt?: { page?: IBC.Page }
  ): Promise<SearchableSearchResult> {
    const response = await this.axios.request<
      SearchableSearchResult,
      SearchableSearchDocumentsBody
    >(
      {
        url: `/v1/search`,
        method: 'POST',
        data: ObjectUtil.removeUndefined(param),
      },
      opt
    );
    return response.data as SearchableSearchResult;
  }

  /**
   * 初始化搜索实例 【V1】
   * POST /v1/instance/init
   * 接口ID：26225171
   * 接口地址：https://www.apifox.cn/web/project/1031456/apis/api-26225171
   */
  async initInstance(idField: string): Promise<void> {
    await this.axios.request<void, SearchableInitInstanceBody>({
      url: `/v1/instance/init`,
      method: 'POST',
      data: ObjectUtil.removeUndefined({
        idField,
      }),
    });
  }

  /**
   * 销毁搜索实例 【V1】
   * DELETE /v1/instance
   * 接口ID：26225172
   * 接口地址：https://www.apifox.cn/web/project/1031456/apis/api-26225172
   */
  async destroyInstance(): Promise<void> {
    await this.axios.request<void>({
      url: `/v1/instance`,
      method: 'DELETE',
    });
  }

  /**
   * 获取搜索实例状态 【V1】
   * GET /v1/instance/status
   * 接口ID：26225309
   * 接口地址：https://www.apifox.cn/web/project/1031456/apis/api-26225309
   */
  async getInstanceStatus(): Promise<SearchableInstanceStatus> {
    const resp = await this.axios.request<SearchableInstanceStatus>({
      url: `/v1/instance/status`,
      method: 'GET',
    });
    return resp.data as SearchableInstanceStatus;
  }

  /**
   * 获取搜索实例信息 【V1】
   * GET /v1/instance/info
   * 接口ID：26225357
   * 接口地址：https://www.apifox.cn/web/project/1031456/apis/api-26225357
   */
  async getInstanceInfo(): Promise<SearchableInstanceInfo> {
    const resp = await this.axios.request<SearchableInstanceInfo>({
      url: `/v1/instance/info`,
      method: 'GET',
    });
    return resp.data as SearchableInstanceInfo;
  }

  /**
   * 设置搜索实例参数 【V1】
   * PUT /v1/instance/settings
   * 接口ID：26225475
   * 接口地址：https://www.apifox.cn/web/project/1031456/apis/api-26225475
   */
  async saveInstanceSettings(
    settings: SearchableInstanceSettings
  ): Promise<void> {
    await this.axios.request<void, SearchableInstanceSettings>({
      url: `/v1/instance/settings`,
      method: 'PUT',
      data: ObjectUtil.removeUndefined(settings),
    });
  }

  /**
   * 清空实例内文档【V1】
   * POST /v1/document/empty
   * 接口ID：26225881
   * 接口地址：https://www.apifox.cn/web/project/1031456/apis/api-26225881
   */
  async removeAllDocuments(): Promise<void> {
    await this.axios.request<void>({
      url: `/v1/document/empty`,
      method: 'POST',
    });
  }

  /**
   * 通过ID获取文档【V1】
   * GET /v1/document/id/{id}
   * 接口ID：26225896
   * 接口地址：https://www.apifox.cn/web/project/1031456/apis/api-26225896
   */
  async getDocumentById(id: string): Promise<unknown> {
    const response = await this.axios.request<object>({
      url: `/v1/document/id/${id}`,
      method: 'GET',
    });
    return response.data;
  }

  /**
   * 列出索引内文档【V1】
   * GET /v1/document
   * 接口ID：26225972
   * 接口地址：https://www.apifox.cn/web/project/1031456/apis/api-26225972
   */
  async listDocuments(opt?: { page?: IBC.Page }): Promise<IBC.Page<unknown>> {
    const response = await this.axios.request<SearchableListDocumentsResponse>(
      {
        url: `/v1/document`,
        method: 'GET',
      },
      opt
    );
    return response.data!.page;
  }

  /**
   * 通过ID移除文档【V1】
   * DELETE /v1/document
   * 接口ID：26225924
   * 接口地址：https://www.apifox.cn/web/project/1031456/apis/api-26225924
   */
  async removeDocumentsById(...id: string[]): Promise<void> {
    await this.axios.request<void, SearchableRemoveDocumentsBody>({
      url: `/v1/document`,
      method: 'DELETE',
      data: ObjectUtil.removeUndefined({ id: [...id] }),
    });
  }

  /**
   * 保存文档【V1】
   * PUT /v1/document
   * 接口ID：26226037
   * 接口地址：https://www.apifox.cn/web/project/1031456/apis/api-26226037
   */
  async saveDocuments(...documents: object[]): Promise<void> {
    await this.axios.request<void, SearchableSaveDocumentsBody>({
      url: `/v1/document`,
      method: 'PUT',
      data: ObjectUtil.removeUndefined({ documents: [...documents] }),
    });
  }

  /**
   * 部分更新文档【V1】
   * PATCH /v1/document
   * 接口ID：26226083
   * 接口地址：https://www.apifox.cn/web/project/1031456/apis/api-26226083
   */
  async updateDocuments(...documents: object[]): Promise<void> {
    await this.axios.request<void, SearchablePartialUpdateDocumentsBody>({
      url: `/v1/document`,
      method: 'PATCH',
      data: ObjectUtil.removeUndefined({ documents: [...documents] }),
    });
  }
}

export const createSearchableClient = (
  serviceClientConfig: CreateSearchableClientConfig
): SearchableClient => new SearchableClient(serviceClientConfig);
