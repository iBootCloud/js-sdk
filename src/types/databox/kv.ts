export namespace KV {
  export type KVContent = Record<string, string>;

  export interface RemoveNamespaceResponse {
    affected: number;
  }

  export type GetKeysInNamespaceResponse = string[];

  export interface GetKVParam {
    keys?: string[];
  }

  export type GetKVResponse = KVContent;

  export interface SaveKVBody {
    kv: KVContent;
    expiredTime?: string;
    ttl?: number;
  }

  export interface RemoveKeysBody {
    key: string[];
  }

  export interface RemoveKeysResponse {
    affected: number;
  }

  export interface ExpireKeysBody {
    key?: string[];
    expiredTime?: string;
    ttl?: number;
  }

  export interface IncreaseValueResponse {
    value: number;
  }

  export interface DecreaseValueResponse {
    value: number;
  }
}
