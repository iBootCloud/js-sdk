import { IBCServiceClientConfig } from '../index';
import { LANG } from '@ibootcloud/common-lib';
import { ENV, IBCService } from '../../constants';
import { IBCClientLogAdapter } from '../axios';
import { createDBClient, DataboxDBClient, DataboxDBClientConfig } from './db';
import { createKVClient, DataboxKVClient, DataboxKVClientConfig } from './kv';
import {
  createListClient,
  DataboxListClient,
  DataboxListClientConfig,
} from './list';
import {
  createUIDClient,
  DataboxUIDClient,
  DataboxUIDClientConfig,
} from './uid';

export * from './db';
export * from './kv';
export * from './list';
export * from './uid';

export interface DataboxModuleClientConfig {
  lang: LANG;
  apiKey?: string;
  accessToken?: string;
  env: ENV;
  timeout: number;
  service: IBCService;
  logAdapter?: IBCClientLogAdapter;
  baseUrl?: string;
  throwOnFail: boolean;
}

export class DataboxClient {
  moduleClientConfig: DataboxModuleClientConfig;
  constructor(cfg: IBCServiceClientConfig) {
    this.moduleClientConfig = {
      ...cfg,
      service: IBCService.DATABOX,
    };
  }
  db(dbClientConfig: DataboxDBClientConfig): DataboxDBClient {
    return createDBClient(this.moduleClientConfig, dbClientConfig);
  }
  kv(kvClientConfig: DataboxKVClientConfig): DataboxKVClient {
    return createKVClient(this.moduleClientConfig, kvClientConfig);
  }
  list(listClientConfig: DataboxListClientConfig): DataboxListClient {
    return createListClient(this.moduleClientConfig, listClientConfig);
  }
  uid(uidClientConfig?: DataboxUIDClientConfig): DataboxUIDClient {
    return createUIDClient(this.moduleClientConfig, uidClientConfig);
  }
}

export const createDataboxClient = (
  cfg: IBCServiceClientConfig
): DataboxClient => new DataboxClient(cfg);
