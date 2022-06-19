import { AxiosBaseClient } from '../../axios';
import { createRecordClient } from './record';
import { RecordData } from '../../../types/databox/db.dto';

export type DBTableClientConfig = {
  table?: string;
};

export const createDBTableClient = (
  axios: AxiosBaseClient,
  tableClientConfig: DBTableClientConfig = {}
) => {
  return {
    record: (recordData?: RecordData) =>
      createRecordClient(axios, tableClientConfig, recordData),
    /**
     * 创建DB表
     */
    create: async (table?: string): Promise<void> => {
      await axios.request<void>({
        url: `/v1/db/table`,
        method: 'POST',
        data: {
          table: table ?? tableClientConfig.table,
        },
      });
    },

    /**
     * 列出DB表
     */
    list: async (): Promise<string[]> => {
      const response = await axios.request<string[]>({
        url: `/v1/db/tables`,
        method: 'GET',
      });
      return response!.data as string[];
    },

    /**
     * 重命名表名
     */
    rename: async (newTableName: string): Promise<void> => {
      await axios.request<void>({
        url: `/v1/db/table/${tableClientConfig.table}/rename`,
        method: 'POST',
        data: {
          newTableName,
        },
      });
    },

    /**
     * 清空表
     */
    empty: async (table?: string): Promise<void> => {
      await axios.request<void>({
        url: `/v1/db/table/${table ?? tableClientConfig.table}/empty`,
        method: 'POST',
      });
    },

    /**
     * 移除表
     * 将删除表中所有记录
     */
    remove: async (table?: string): Promise<void> => {
      await axios.request<void>({
        url: `/v1/db/table/${table ?? tableClientConfig.table}`,
        method: 'DELETE',
      });
    },
  };
};
