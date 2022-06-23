import { AxiosBaseClient } from '../../axios';
import { ModuleClientConfig } from '../index';
import {
  createDBTableClient,
  DBTableClient,
  DBTableClientConfig,
} from './table';

export interface DBClientConfig {
  instanceId: string;
}

export class DBClient {
  moduleClientConfig: ModuleClientConfig;
  axios: AxiosBaseClient;
  constructor(
    moduleClientConfig: ModuleClientConfig,
    dbClientConfig: DBClientConfig
  ) {
    this.moduleClientConfig = moduleClientConfig;
    this.axios = new AxiosBaseClient({
      ...moduleClientConfig,
      ...dbClientConfig,
    });
  }
  table(tableClientConfig: DBTableClientConfig): DBTableClient {
    return createDBTableClient(this.axios, tableClientConfig);
  }

  /**
   * 初始化DB实例
   */
  async initInstance(): Promise<void> {
    await this.axios.request<void>({
      url: `/v1/db/instance/init`,
      method: 'POST',
    });
  }

  /**
   * 移除DB实例
   */
  async removeInstance(): Promise<void> {
    await this.axios.request<void>({
      url: `/v1/db/instance`,
      method: 'DELETE',
    });
  }
}

export const createDBClient = (
  moduleClientConfig: ModuleClientConfig,
  dbClientConfig: DBClientConfig
): DBClient => new DBClient(moduleClientConfig, dbClientConfig);
