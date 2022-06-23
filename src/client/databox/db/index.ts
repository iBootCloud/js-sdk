import { AxiosBaseClient } from '../../axios';
import { DataboxModuleClientConfig } from '../index';
import {
  createDBTableClient,
  DataboxDBTableClient,
  DataboxDBTableClientConfig,
} from './table';

export * from './table';
export * from './record';

export interface DataboxDBClientConfig {
  instanceId: string;
}

export class DataboxDBClient {
  moduleClientConfig: DataboxModuleClientConfig;
  axios: AxiosBaseClient;
  constructor(
    moduleClientConfig: DataboxModuleClientConfig,
    dbClientConfig: DataboxDBClientConfig
  ) {
    this.moduleClientConfig = moduleClientConfig;
    this.axios = new AxiosBaseClient({
      ...moduleClientConfig,
      ...dbClientConfig,
    });
  }
  table(tableClientConfig: DataboxDBTableClientConfig): DataboxDBTableClient {
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
  moduleClientConfig: DataboxModuleClientConfig,
  dbClientConfig: DataboxDBClientConfig
): DataboxDBClient => new DataboxDBClient(moduleClientConfig, dbClientConfig);
