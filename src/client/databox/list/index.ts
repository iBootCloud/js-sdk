import { AxiosBaseClient } from '../../axios';
import { CreateModuleClientConfig } from '../index';
import { ObjectUtil, TimeUtil } from '@ibootcloud/common-lib';
import {
  AddItemsBody,
  AddItemsResponse,
  AddItemsType,
  ExpireListsBody,
  FindItemIndexParam,
  FindItemIndexResponse,
  GetListIdInNamespaceResponse,
  GetListItemParam,
  GetListItemResponse,
  ListItem,
  RemoveItemsBody,
  RemoveItemsResponse,
  RemoveItemsType,
  RemoveListResponse,
  RemoveListsBody,
  RemoveNamespaceResponse,
  SetListBody,
  UpdateItemByIndexBody,
} from '../../../types/databox/list.dto';

export interface ListClientConfig {
  instanceId: string;
  namespace?: string;
}
export const DEFAULT_NS = 'DEFAULT';

export const createListClient = (
  moduleClientConfig: CreateModuleClientConfig,
  { instanceId, namespace = DEFAULT_NS }: ListClientConfig
) => {
  const axios = new AxiosBaseClient({
    ...moduleClientConfig,
    instanceId,
  });
  return {
    /**
     * 移除命名空间
     * 将移除命名空间下所有List
     * @param ns 要移除的命名空间
     * @return 移除的List数目
     */
    removeNamespace: async (ns: string = namespace): Promise<number> => {
      const response = await axios.request<RemoveNamespaceResponse>({
        url: `/v1/list/namespace/${ns}`,
        method: 'DELETE',
      });
      return response.data!.affected;
    },
    /**
     * 获取命名空间下所有ListId
     * @return ListId数组
     */
    listIds: async (): Promise<string[]> => {
      const response = await axios.request<GetListIdInNamespaceResponse>({
        url: `/v1/list/namespace/${namespace}/listId`,
        method: 'GET',
      });
      return response.data as GetListIdInNamespaceResponse;
    },
    /**
     * 获取List元素 [V1]
     * @return 列表元素
     */
    getItems: async (
      listId: string,
      opt?: GetListItemParam
    ): Promise<ListItem[]> => {
      const response = await axios.request<GetListItemResponse>({
        url: `/v1/list/namespace/${namespace}/list/${listId}/items`,
        method: 'GET',
        params: ObjectUtil.removeEmpty(opt) as GetListItemParam,
      });
      return response.data as GetListItemResponse;
    },
    /**
     * 获取List元素 [V1]
     * @return 列表元素
     * @param listId
     * @param index
     */
    getItemByIndex: async (
      listId: string,
      index: number
    ): Promise<ListItem> => {
      const response = await axios.request<ListItem>({
        url: `/v1/list/namespace/${namespace}/list/${listId}/item/${index}`,
        method: 'GET',
      });
      return response.data as ListItem;
    },
    /**
     * 保存List [V1]
     * @param listId 列表ID
     * @param list 列表
     * @param expire list过期时间配置优先级 expiredTime > ttl
     */
    save: async (
      listId: string,
      list: ListItem[],
      expire?: { ttl?: number; expiredTime?: Date }
    ): Promise<void> => {
      await axios.request<void, SetListBody>({
        url: `/v1/list/namespace/${namespace}/list/${listId}`,
        method: 'PUT',
        data: ObjectUtil.removeEmpty({
          list,
          ttl: expire?.ttl,
          expiredTime: expire?.expiredTime
            ? TimeUtil.toTimestamp(expire.expiredTime)
            : undefined,
        }),
      });
    },
    /**
     * 移除List [V1]
     * @return 移除的list数目
     */
    removeLists: async (listId: string[]): Promise<number> => {
      const response = await axios.request<RemoveListResponse, RemoveListsBody>(
        {
          url: `/v1/list/namespace/${namespace}/list`,
          method: 'DELETE',
          data: {
            listId,
          },
        }
      );
      return response.data!.affected;
    },
    /**
     * 设置List的过期时间 [V1]
     */
    expire: async (
      listId: string[],
      expire?: { ttl?: number; expiredTime?: Date }
    ): Promise<void> => {
      await axios.request<void, ExpireListsBody>({
        url: `/v1/list/namespace/${namespace}/expire`,
        method: 'POST',
        data: ObjectUtil.removeEmpty({
          listId,
          ttl: expire?.ttl,
          expiredTime: expire?.expiredTime
            ? TimeUtil.toTimestamp(expire.expiredTime)
            : undefined,
        }),
      });
    },
    /**
     * 添加列表元素 [V1]
     * @return 更新后的列表长度
     * POST /v1/list/namespace/{namespace}/list/{listId}/item
     * 接口ID：22681841
     * 接口地址：https://www.apifox.cn/web/project/1031456/apis/api-22681841
     */
    addItems: async (
      listId: string,
      items: ListItem[],
      type: AddItemsType
    ): Promise<number> => {
      const response = await axios.request<AddItemsResponse, AddItemsBody>({
        url: `/v1/list/namespace/${namespace}/list/${listId}/item`,
        method: 'POST',
        data: {
          items,
          type,
        },
      });
      return response.data!.total;
    },
    /**
     * 移除列表元素 [V1]
     * DELETE /v1/list/namespace/{namespace}/list/{listId}/item
     * 接口ID：22681913
     * 接口地址：https://www.apifox.cn/web/project/1031456/apis/api-22681913
     *
     * @return 匹配模式下返回,移除的元素数目; 非匹配模式下,返回非匹配模式移除的元素
     *
     */
    removeItem: async (
      listId: string,
      item: ListItem,
      type: RemoveItemsType,
      count: number = 1
    ): Promise<number | ListItem[]> => {
      const response = await axios.request<
        RemoveItemsResponse,
        RemoveItemsBody
      >({
        url: `/v1/list/namespace/${namespace}/list/${listId}/item`,
        method: 'DELETE',
        data: {
          item,
          type,
          count,
        },
      });
      if (type === RemoveItemsType.EQUAL) {
        return response.data!.affected as number;
      } else {
        return response.data!.items as ListItem[];
      }
    },
    /**
     * 通过索引更新列表单个元素 [V1]
     * PATCH /v1/list/namespace/{namespace}/list/{listId}/item/{index}
     * 接口ID：22681979
     * 接口地址：https://www.apifox.cn/web/project/1031456/apis/api-22681979
     * @param listId
     * @param index 目标索引
     * @param item 更新后的元素
     */
    updateItemByIndex: async (
      listId: string,
      index: number,
      item: ListItem
    ): Promise<void> => {
      await axios.request<void, UpdateItemByIndexBody>({
        url: `/v1/list/namespace/${namespace}/list/${listId}/item/${index}`,
        method: 'PATCH',
        data: {
          item,
        },
      });
    },
    /**
     * 通过索引更新列表单个元素 [V1]
     * PATCH /v1/list/namespace/{namespace}/list/{listId}/item/{index}
     * 接口ID：22681979
     * 接口地址：https://www.apifox.cn/web/project/1031456/apis/api-22681979
     * @param listId
     * @param item 要查询的元素
     * @return 查询到的元素索引; -1代表未查询到元素
     */
    index: async (listId: string, item: ListItem): Promise<number> => {
      const response = await axios.request<FindItemIndexResponse>({
        url: `/v1/list/namespace/${namespace}/list/${listId}/index`,
        method: 'GET',
        params: {
          item,
        } as FindItemIndexParam,
      });
      return response.data!.index;
    },
  };
};
