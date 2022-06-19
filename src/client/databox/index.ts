import { CreateServiceClientConfig } from '../index';
import { createDBClient, DBClientConfig } from './db';
import { LANG } from '@ibootcloud/common-lib';
import { ENV, Service } from '../../constants';
import { ClientLogAdapter } from '../axios';
import { createKVClient, KVClientConfig } from './kv';
import { createListClient, ListClientConfig } from './list';
import { createUIDClient, UIDClientConfig } from './uid';

export interface CreateModuleClientConfig {
  lang: LANG;
  apiKey?: string;
  accessToken?: string;
  env: ENV;
  timeout: number;
  service: Service;
  logAdapter?: ClientLogAdapter;
  baseUrl?: string;
  throwOnFail: boolean;
}
export const createDataboxClient = (
  serviceClientConfig: CreateServiceClientConfig
) => {
  const moduleClientConfig: CreateModuleClientConfig = {
    ...serviceClientConfig,
    service: Service.DATABOX,
  };
  return {
    db: (dbClientConfig: DBClientConfig) =>
      createDBClient(moduleClientConfig, dbClientConfig),
    kv: (kvClientConfig: KVClientConfig) =>
      createKVClient(moduleClientConfig, kvClientConfig),
    list: (listClientConfig: ListClientConfig) =>
      createListClient(moduleClientConfig, listClientConfig),
    uid: (uidClientConfig?: UIDClientConfig) =>
      createUIDClient(moduleClientConfig, uidClientConfig),
  };
};
