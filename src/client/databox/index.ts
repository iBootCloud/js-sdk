import { ServiceClientConfig } from '../index';
import { createDBClient, DBClient, DBClientConfig } from './db';
import { LANG } from '@ibootcloud/common-lib';
import { ENV, Service } from '../../constants';
import { ClientLogAdapter } from '../axios';
import { createKVClient, KVClient, KVClientConfig } from './kv';
import { createListClient, ListClient, ListClientConfig } from './list';
import { createUIDClient, UIDClient, UIDClientConfig } from './uid';

export interface ModuleClientConfig {
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

export class DataboxClient {
  moduleClientConfig: ModuleClientConfig;
  constructor(cfg: ServiceClientConfig) {
    this.moduleClientConfig = {
      ...cfg,
      service: Service.DATABOX,
    };
  }
  db(dbClientConfig: DBClientConfig): DBClient {
    return createDBClient(this.moduleClientConfig, dbClientConfig);
  }
  kv(kvClientConfig: KVClientConfig): KVClient {
    return createKVClient(this.moduleClientConfig, kvClientConfig);
  }
  list(listClientConfig: ListClientConfig): ListClient {
    return createListClient(this.moduleClientConfig, listClientConfig);
  }
  uid(uidClientConfig?: UIDClientConfig): UIDClient {
    return createUIDClient(this.moduleClientConfig, uidClientConfig);
  }
}

export const createDataboxClient = (cfg: ServiceClientConfig): DataboxClient =>
  new DataboxClient(cfg);
