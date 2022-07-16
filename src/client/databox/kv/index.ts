import { AxiosBaseClient } from '../../axios';
import { DataboxModuleClientConfig } from '../index';
import { Databox } from '../../../types';
import { ObjectUtil, TimeUtil } from '@ibootcloud/common-lib';

export interface DataboxKVClientConfig {
  instanceId: string;
  namespace?: string;
}

export const KV_DEFAULT_NS = 'DEFAULT';

export class DataboxKVClient {
  axios: AxiosBaseClient;
  moduleClientConfig: DataboxModuleClientConfig;
  instanceId: string;
  namespace: string;

  constructor(
    moduleClientConfig: DataboxModuleClientConfig,
    { instanceId, namespace = KV_DEFAULT_NS }: DataboxKVClientConfig
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
    const response = await this.axios.request<
      Databox.KV.RemoveNamespaceResponse
    >({
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
    const response = await this.axios.request<
      Databox.KV.GetKeysInNamespaceResponse
    >({
      url: `/v1/kv/namespace/${this.namespace}/keys`,
      method: 'GET',
    });
    return response.data as Databox.KV.GetKeysInNamespaceResponse;
  }

  /**
   * 获取KV键值对 [V1]
   * @return 键值对
   */
  async read(keys?: string[]): Promise<Databox.KV.KVContent> {
    const response = await this.axios.request<Databox.KV.GetKVResponse>({
      url: `/v1/kv/namespace/${this.namespace}/values`,
      method: 'GET',
      params: ObjectUtil.removeUndefined({ keys }),
    });
    return response.data as Databox.KV.GetKVResponse;
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
    kv: Databox.KV.KVContent,
    expire?: { ttl?: number; expiredTime?: Date }
  ): Promise<void> {
    await this.axios.request<void, Databox.KV.SaveKVBody>({
      url: `/v1/kv/namespace/${this.namespace}/values`,
      method: 'PUT',
      data: ObjectUtil.removeUndefined({
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
      Databox.KV.RemoveKeysResponse,
      Databox.KV.RemoveKeysBody
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
    await this.axios.request<void, Databox.KV.ExpireKeysBody>({
      url: `/v1/kv/namespace/${this.namespace}/expire`,
      method: 'POST',
      data: ObjectUtil.removeUndefined({
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
    const resp = await this.axios.request<Databox.KV.IncreaseValueResponse>({
      url: `/v1/kv/namespace/${this.namespace}/value/${key}/increase`,
      method: 'POST',
      params: ObjectUtil.removeUndefined({
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
    const resp = await this.axios.request<Databox.KV.DecreaseValueResponse>({
      url: `/v1/kv/namespace/${this.namespace}/value/${key}/decrease`,
      method: 'POST',
      params: ObjectUtil.removeUndefined({
        step,
      }),
    });
    return parseInt(String(resp.data!.value));
  }
}

export const createKVClient = (
  moduleClientConfig: DataboxModuleClientConfig,
  kvClientConfig: DataboxKVClientConfig
): DataboxKVClient => new DataboxKVClient(moduleClientConfig, kvClientConfig);
