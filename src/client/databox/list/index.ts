import { AxiosBaseClient } from '../../axios';
import { DataboxModuleClientConfig } from '../index';
import { ObjectUtil, TimeUtil } from '@ibootcloud/common-lib';
import { Databox } from '../../../types';

export interface DataboxListClientConfig {
  instanceId: string;
  namespace?: string;
}

export const LIST_DEFAULT_NS = 'DEFAULT';

export class DataboxListClient {
  axios: AxiosBaseClient;
  instanceId: string;
  namespace: string;

  constructor(
    moduleClientConfig: DataboxModuleClientConfig,
    { instanceId, namespace = LIST_DEFAULT_NS }: DataboxListClientConfig
  ) {
    this.instanceId = instanceId;
    this.namespace = namespace;
    this.axios = new AxiosBaseClient({
      ...moduleClientConfig,
      instanceId,
    });
  }

  /**
   * 移除命名空间
   * 将移除命名空间下所有List
   * @param ns 要移除的命名空间
   * @return 移除的List数目
   */
  async removeNamespace(ns: string = this.namespace): Promise<number> {
    const response = await this.axios.request<
      Databox.List.RemoveNamespaceResponse
    >({
      url: `/v1/list/namespace/${ns}`,
      method: 'DELETE',
    });
    return response.data!.affected;
  }

  /**
   * 获取命名空间下所有ListId
   * @return ListId数组
   */
  async listIds(): Promise<string[]> {
    const response = await this.axios.request<
      Databox.List.GetListIdInNamespaceResponse
    >({
      url: `/v1/list/namespace/${this.namespace}/listId`,
      method: 'GET',
    });
    return response.data as Databox.List.GetListIdInNamespaceResponse;
  }

  /**
   * 获取List元素 [V1]
   * @return 列表元素
   */
  async getItems(
    listId: string,
    opt?: Databox.List.GetListItemParam
  ): Promise<Databox.List.ListItem[]> {
    const response = await this.axios.request<Databox.List.GetListItemResponse>(
      {
        url: `/v1/list/namespace/${this.namespace}/list/${listId}/items`,
        method: 'GET',
        params: ObjectUtil.removeUndefined(
          opt
        ) as Databox.List.GetListItemParam,
      }
    );
    return response.data as Databox.List.GetListItemResponse;
  }

  /**
   * 获取List元素 [V1]
   * @return 列表元素
   * @param listId
   * @param index
   */
  async getItemByIndex(
    listId: string,
    index: number
  ): Promise<Databox.List.ListItem> {
    const response = await this.axios.request<Databox.List.ListItem>({
      url: `/v1/list/namespace/${this.namespace}/list/${listId}/item/${index}`,
      method: 'GET',
    });
    return response.data as Databox.List.ListItem;
  }

  /**
   * 保存List [V1]
   * @param listId 列表ID
   * @param list 列表
   * @param expire list过期时间配置优先级 expiredTime > ttl
   */
  async save(
    listId: string,
    list: Databox.List.ListItem[],
    expire?: { ttl?: number; expiredTime?: Date }
  ): Promise<void> {
    await this.axios.request<void, Databox.List.SetListBody>({
      url: `/v1/list/namespace/${this.namespace}/list/${listId}`,
      method: 'PUT',
      data: ObjectUtil.removeUndefined({
        list,
        ttl: expire?.ttl,
        expiredTime: expire?.expiredTime
          ? TimeUtil.toTimestamp(expire.expiredTime)
          : undefined,
      }),
    });
  }

  /**
   * 移除List [V1]
   * @return 移除的list数目
   */
  async removeLists(listId: string[]): Promise<number> {
    const response = await this.axios.request<
      Databox.List.RemoveListResponse,
      Databox.List.RemoveListsBody
    >({
      url: `/v1/list/namespace/${this.namespace}/list`,
      method: 'DELETE',
      data: {
        listId,
      },
    });
    return response.data!.affected;
  }

  /**
   * 设置List的过期时间 [V1]
   */
  async expire(
    listId: string[],
    expire?: { ttl?: number; expiredTime?: Date }
  ): Promise<void> {
    await this.axios.request<void, Databox.List.ExpireListsBody>({
      url: `/v1/list/namespace/${this.namespace}/expire`,
      method: 'POST',
      data: ObjectUtil.removeUndefined({
        listId,
        ttl: expire?.ttl,
        expiredTime: expire?.expiredTime
          ? TimeUtil.toTimestamp(expire.expiredTime)
          : undefined,
      }),
    });
  }

  /**
   * 添加列表元素 [V1]
   * @return 更新后的列表长度
   * POST /v1/list/namespace/{namespace}/list/{listId}/item
   * 接口ID：22681841
   * 接口地址：https://www.apifox.cn/web/project/1031456/apis/api-22681841
   */
  async addItems(
    listId: string,
    items: Databox.List.ListItem[],
    type: Databox.List.AddItemsType
  ): Promise<number> {
    const response = await this.axios.request<
      Databox.List.AddItemsResponse,
      Databox.List.AddItemsBody
    >({
      url: `/v1/list/namespace/${this.namespace}/list/${listId}/item`,
      method: 'POST',
      data: {
        items,
        type,
      },
    });
    return response.data!.total;
  }

  /**
   * 移除列表元素 [V1]
   * DELETE /v1/list/namespace/{namespace}/list/{listId}/item
   * 接口ID：22681913
   * 接口地址：https://www.apifox.cn/web/project/1031456/apis/api-22681913
   *
   * @return 匹配模式下返回,移除的元素数目; 非匹配模式下,返回非匹配模式移除的元素
   *
   */
  async removeItem(
    listId: string,
    item: Databox.List.ListItem,
    type: Databox.List.RemoveItemsType,
    count: number = 1
  ): Promise<number | Databox.List.ListItem[]> {
    const response = await this.axios.request<
      Databox.List.RemoveItemsResponse,
      Databox.List.RemoveItemsBody
    >({
      url: `/v1/list/namespace/${this.namespace}/list/${listId}/item`,
      method: 'DELETE',
      data: {
        item,
        type,
        count,
      },
    });
    if (type === Databox.List.RemoveItemsType.EQUAL) {
      return response.data!.affected as number;
    } else {
      return response.data!.items as Databox.List.ListItem[];
    }
  }

  /**
   * 通过索引更新列表单个元素 [V1]
   * PATCH /v1/list/namespace/{namespace}/list/{listId}/item/{index}
   * 接口ID：22681979
   * 接口地址：https://www.apifox.cn/web/project/1031456/apis/api-22681979
   * @param listId
   * @param index 目标索引
   * @param item 更新后的元素
   */
  async updateItemByIndex(
    listId: string,
    index: number,
    item: Databox.List.ListItem
  ): Promise<void> {
    await this.axios.request<void, Databox.List.UpdateItemByIndexBody>({
      url: `/v1/list/namespace/${this.namespace}/list/${listId}/item/${index}`,
      method: 'PATCH',
      data: {
        item,
      },
    });
  }

  /**
   * 通过索引更新列表单个元素 [V1]
   * PATCH /v1/list/namespace/{namespace}/list/{listId}/item/{index}
   * 接口ID：22681979
   * 接口地址：https://www.apifox.cn/web/project/1031456/apis/api-22681979
   * @param listId
   * @param item 要查询的元素
   * @return 查询到的元素索引; -1代表未查询到元素
   */
  async index(listId: string, item: Databox.List.ListItem): Promise<number> {
    const response = await this.axios.request<
      Databox.List.FindItemIndexResponse
    >({
      url: `/v1/list/namespace/${this.namespace}/list/${listId}/index`,
      method: 'GET',
      params: {
        item,
      } as Databox.List.FindItemIndexParam,
    });
    return response.data!.index;
  }
}

export const createListClient = (
  moduleClientConfig: DataboxModuleClientConfig,
  listClientConfig: DataboxListClientConfig
): DataboxListClient =>
  new DataboxListClient(moduleClientConfig, listClientConfig);
