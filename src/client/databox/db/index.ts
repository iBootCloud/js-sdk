import { AxiosBaseClient } from '../../axios';
import { CreateModuleClientConfig } from '../index';
import { createDBTableClient, DBTableClientConfig } from './table';

export interface DBClientConfig {
  instanceId: string;
}

export const createDBClient = (
  moduleClientConfig: CreateModuleClientConfig,
  dbClientConfig: DBClientConfig
) => {
  const axios = new AxiosBaseClient({
    ...moduleClientConfig,
    ...dbClientConfig,
  });
  return {
    table: (tableClientConfig?: DBTableClientConfig) =>
      createDBTableClient(axios, tableClientConfig),

    /**
     * 初始化DB实例
     */
    initInstance: async (): Promise<void> => {
      await axios.request<void>({
        url: `/v1/db/instance/init`,
        method: 'POST',
      });
    },

    /**
     * 移除DB实例
     */
    removeInstance: async (): Promise<void> => {
      await axios.request<void>({
        url: `/v1/db/instance`,
        method: 'DELETE',
      });
    },
  };
};
