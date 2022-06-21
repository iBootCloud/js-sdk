import { AxiosBaseClient } from '../../axios';
import { CreateModuleClientConfig } from '../index';
import {
  DecreaseValueResponse,
  ExpireKeysBody,
  GetKeysInNamespaceResponse,
  GetKVResponse,
  IncreaseValueResponse,
  KVContent,
  RemoveKeysBody,
  RemoveKeysResponse,
  RemoveNamespaceResponse,
  SaveKVBody,
} from '../../../types/databox/kv.dto';
import { ObjectUtil, TimeUtil } from '@ibootcloud/common-lib';

export interface KVClientConfig {
  instanceId: string;
  namespace?: string;
}
export const DEFAULT_NS = 'DEFAULT';

export const createKVClient = (
  moduleClientConfig: CreateModuleClientConfig,
  { instanceId, namespace = DEFAULT_NS }: KVClientConfig
) => {
  const axios = new AxiosBaseClient({
    ...moduleClientConfig,
    instanceId,
  });
  return {
    /**
     * 移除命名空间
     * 将移除命名空间下所有Key
     * @param ns 要移除的命名空间
     * @return 移除的键数目
     */
    removeNamespace: async (ns: string = namespace): Promise<number> => {
      const response = await axios.request<RemoveNamespaceResponse>({
        url: `/v1/kv/namespace/${ns}`,
        method: 'DELETE',
      });
      return response.data!.affected;
    },
    /**
     * 获取命名空间下所有Key
     * @return 键名数组
     */
    keys: async (): Promise<string[]> => {
      const response = await axios.request<GetKeysInNamespaceResponse>({
        url: `/v1/kv/namespace/${namespace}/keys`,
        method: 'GET',
      });
      return response.data as GetKeysInNamespaceResponse;
    },
    /**
     * 获取KV键值对 [V1]
     * @return 键值对
     */
    read: async (keys?: string[]): Promise<KVContent> => {
      const response = await axios.request<GetKVResponse>({
        url: `/v1/kv/namespace/${namespace}/values`,
        method: 'GET',
        params: ObjectUtil.removeEmpty({ keys }),
      });
      return response.data as GetKVResponse;
    },
    /**
     * 获取KV键值 [V1]
     * @param key 键名
     * @return 键值
     */
    readValue: async (key: string): Promise<string> => {
      const response = await axios.request<string>({
        url: `/v1/kv/namespace/${namespace}/value/${key}`,
        method: 'GET',
      });
      return response.data as string;
    },
    /**
     * 保存KV键值对 [V1]
     * @param kv 键值对
     * @param expire 键过期时间配置优先级 expiredTime > ttl
     */
    save: async (
      kv: KVContent,
      expire?: { ttl?: number; expiredTime?: Date }
    ): Promise<void> => {
      await axios.request<void, SaveKVBody>({
        url: `/v1/kv/namespace/${namespace}/values`,
        method: 'PUT',
        data: ObjectUtil.removeEmpty({
          kv,
          ttl: expire?.ttl,
          expiredTime: expire?.expiredTime
            ? TimeUtil.toTimestamp(expire.expiredTime)
            : undefined,
        }),
      });
    },
    /**
     * 移除KV键 [V1]
     */
    removeKeys: async (keys: string[]): Promise<number> => {
      const response = await axios.request<RemoveKeysResponse, RemoveKeysBody>({
        url: `/v1/kv/namespace/${namespace}/keys`,
        method: 'DELETE',
        data: {
          key: keys,
        },
      });
      return response.data!.affected;
    },
    /**
     * 设置KV键的过期时间 [V1]
     */
    expire: async (
      keys: string[],
      expire?: { ttl?: number; expiredTime?: Date }
    ): Promise<void> => {
      await axios.request<void, ExpireKeysBody>({
        url: `/v1/kv/namespace/${namespace}/expire`,
        method: 'POST',
        data: ObjectUtil.removeEmpty({
          key: keys,
          ttl: expire?.ttl,
          expiredTime: expire?.expiredTime
            ? TimeUtil.toTimestamp(expire.expiredTime)
            : undefined,
        }),
      });
    },

    /**
     * KV键值自增 [V1]
     * @return 更新后的值
     */
    increaseValue: async (key: string, step?: number): Promise<number> => {
      const resp = await axios.request<IncreaseValueResponse>({
        url: `/v1/kv/namespace/${namespace}/value/${key}/increase`,
        method: 'POST',
        params: ObjectUtil.removeEmpty({
          step,
        }),
      });
      return parseInt(String(resp.data!.value));
    },

    /**
     * KV键值自减 [V1]
     * @return 更新后的值
     */
    decreaseValue: async (key: string, step?: number): Promise<number> => {
      const resp = await axios.request<DecreaseValueResponse>({
        url: `/v1/kv/namespace/${namespace}/value/${key}/decrease`,
        method: 'POST',
        params: ObjectUtil.removeEmpty({
          step,
        }),
      });
      return parseInt(String(resp.data!.value));
    },
  };
};
