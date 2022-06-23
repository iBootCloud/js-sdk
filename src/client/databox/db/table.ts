import { AxiosBaseClient } from '../../axios';
import { createRecordClient } from './record';
import { RecordData } from '../../../types/databox/db.dto';

export type DBTableClientConfig = {
  table: string;
};

export class DBTableClient {
  axios: AxiosBaseClient;
  tableClientConfig: DBTableClientConfig;
  table: string;
  constructor(axios: AxiosBaseClient, tableClientConfig: DBTableClientConfig) {
    this.axios = axios;
    this.tableClientConfig = tableClientConfig;
    this.table = tableClientConfig.table;
  }
  record(recordData?: RecordData) {
    return createRecordClient(this.axios, this.tableClientConfig, recordData);
  }
  /**
   * 创建DB表
   */
  async create(table?: string): Promise<void> {
    await this.axios.request<void>({
      url: `/v1/db/table`,
      method: 'POST',
      data: {
        table: table ?? this.table,
      },
    });
  }

  /**
   * 列出DB表
   */
  async list(): Promise<string[]> {
    const response = await this.axios.request<string[]>({
      url: `/v1/db/tables`,
      method: 'GET',
    });
    return response!.data as string[];
  }

  /**
   * 重命名表名
   */
  async rename(newTableName: string): Promise<void> {
    await this.axios.request<void>({
      url: `/v1/db/table/${this.table}/rename`,
      method: 'POST',
      data: {
        newTableName,
      },
    });
  }

  /**
   * 清空表
   */
  async empty(table?: string): Promise<void> {
    await this.axios.request<void>({
      url: `/v1/db/table/${table ?? this.table}/empty`,
      method: 'POST',
    });
  }

  /**
   * 移除表
   * 将删除表中所有记录
   */
  async remove(table?: string): Promise<void> {
    await this.axios.request<void>({
      url: `/v1/db/table/${table ?? this.table}`,
      method: 'DELETE',
    });
  }
}

export const createDBTableClient = (
  axios: AxiosBaseClient,
  tableClientConfig: DBTableClientConfig
): DBTableClient => new DBTableClient(axios, tableClientConfig);
