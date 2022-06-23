export type DataboxKVContent = Record<string, string>;
export interface RemoveDataboxKVNamespaceResponse {
  affected: number;
}
export type DataboxKVGetKeysInNamespaceResponse = string[];
export interface DataboxKVGetKVParam {
  keys?: string[];
}
export type DataboxKVGetKVResponse = DataboxKVContent;
export interface DataboxKVSaveKVBody {
  kv: DataboxKVContent;
  expiredTime?: string;
  ttl?: number;
}
export interface DataboxKVRemoveKeysBody {
  key: string[];
}
export interface DataboxKVRemoveKeysResponse {
  affected: number;
}
export interface DataboxKVExpireKeysBody {
  key?: string[];
  expiredTime?: string;
  ttl?: number;
}
export interface DataboxKVIncreaseValueResponse {
  value: number;
}
export interface DataboxKVDecreaseValueResponse {
  value: number;
}
