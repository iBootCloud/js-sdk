import { AxiosBaseClient } from '../../axios';
import { ModuleClientConfig } from '../index';
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

export class KVClient {
  axios: AxiosBaseClient;
  moduleClientConfig: ModuleClientConfig;
  instanceId: string;
  namespace: string;
  constructor(
    moduleClientConfig: ModuleClientConfig,
    { instanceId, namespace = DEFAULT_NS }: KVClientConfig
  ) {
    this.moduleClientConfig = moduleClientConfig;
    this.instanceId = instanceId;
    this.namespace = namespace;
    this.axios = new AxiosBaseClient({
      ...moduleClientConfig,
      instanceId,
    });
  }
  /**
   * 移除命名空间
   * 将移除命名空间下所有Key
   * @param ns 要移除的命名空间
   * @return 移除的键数目
   */
  async removeNamespace(ns: string = this.namespace): Promise<number> {
    const response = await this.axios.request<RemoveNamespaceResponse>({
      url: `/v1/kv/namespace/${ns}`,
      method: 'DELETE',
    });
    return response.data!.affected;
  }
  /**
   * 获取命名空间下所有Key
   * @return 键名数组
   */
  async keys(): Promise<string[]> {
    const response = await this.axios.request<GetKeysInNamespaceResponse>({
      url: `/v1/kv/namespace/${this.namespace}/keys`,
      method: 'GET',
    });
    return response.data as GetKeysInNamespaceResponse;
  }
  /**
   * 获取KV键值对 [V1]
   * @return 键值对
   */
  async read(keys?: string[]): Promise<KVContent> {
    const response = await this.axios.request<GetKVResponse>({
      url: `/v1/kv/namespace/${this.namespace}/values`,
      method: 'GET',
      params: ObjectUtil.removeEmpty({ keys }),
    });
    return response.data as GetKVResponse;
  }
  /**
   * 获取KV键值 [V1]
   * @param key 键名
   * @return 键值
   */
  async readValue(key: string): Promise<string> {
    const response = await this.axios.request<string>({
      url: `/v1/kv/namespace/${this.namespace}/value/${key}`,
      method: 'GET',
    });
    return response.data as string;
  }
  /**
   * 保存KV键值对 [V1]
   * @param kv 键值对
   * @param expire 键过期时间配置优先级 expiredTime > ttl
   */
  async save(
    kv: KVContent,
    expire?: { ttl?: number; expiredTime?: Date }
  ): Promise<void> {
    await this.axios.request<void, SaveKVBody>({
      url: `/v1/kv/namespace/${this.namespace}/values`,
      method: 'PUT',
      data: ObjectUtil.removeEmpty({
        kv,
        ttl: expire?.ttl,
        expiredTime: expire?.expiredTime
          ? TimeUtil.toTimestamp(expire.expiredTime)
          : undefined,
      }),
    });
  }
  /**
   * 移除KV键 [V1]
   */
  async removeKeys(keys: string[]): Promise<number> {
    const response = await this.axios.request<
      RemoveKeysResponse,
      RemoveKeysBody
    >({
      url: `/v1/kv/namespace/${this.namespace}/keys`,
      method: 'DELETE',
      data: {
        key: keys,
      },
    });
    return response.data!.affected;
  }
  /**
   * 设置KV键的过期时间 [V1]
   */
  async expire(
    keys: string[],
    expire?: { ttl?: number; expiredTime?: Date }
  ): Promise<void> {
    await this.axios.request<void, ExpireKeysBody>({
      url: `/v1/kv/namespace/${this.namespace}/expire`,
      method: 'POST',
      data: ObjectUtil.removeEmpty({
        key: keys,
        ttl: expire?.ttl,
        expiredTime: expire?.expiredTime
          ? TimeUtil.toTimestamp(expire.expiredTime)
          : undefined,
      }),
    });
  }

  /**
   * KV键值自增 [V1]
   * @return 更新后的值
   */
  async increaseValue(key: string, step?: number): Promise<number> {
    const resp = await this.axios.request<IncreaseValueResponse>({
      url: `/v1/kv/namespace/${this.namespace}/value/${key}/increase`,
      method: 'POST',
      params: ObjectUtil.removeEmpty({
        step,
      }),
    });
    return parseInt(String(resp.data!.value));
  }

  /**
   * KV键值自减 [V1]
   * @return 更新后的值
   */
  async decreaseValue(key: string, step?: number): Promise<number> {
    const resp = await this.axios.request<DecreaseValueResponse>({
      url: `/v1/kv/namespace/${this.namespace}/value/${key}/decrease`,
      method: 'POST',
      params: ObjectUtil.removeEmpty({
        step,
      }),
    });
    return parseInt(String(resp.data!.value));
  }
}

export const createKVClient = (
  moduleClientConfig: ModuleClientConfig,
  kvClientConfig: KVClientConfig
): KVClient => new KVClient(moduleClientConfig, kvClientConfig);
