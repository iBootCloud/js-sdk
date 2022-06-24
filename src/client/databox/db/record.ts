import { AxiosBaseClient, PaginationOpt } from '../../axios';
import { DataboxDBTableClientConfig } from './table';
import {
  DataboxDBCountRecordsInTableResponse,
  DataboxDBInsertRecordBody,
  DataboxDBInsertRecordResponse,
  DataboxDBQueryRecordBody,
  DataboxDBQueryRecordResponse,
  DataboxDBReadRecordByIdResponse,
  DataboxDBRecordData,
  DataboxDBRecordRow,
  DataboxDBRemoveRecordByIdResponse,
  DataboxDBUpdateRecordByIdBody,
  DataboxDBUpdateRecordByIdResponse,
} from '../../../types';
import { IBC } from '@ibootcloud/common-lib';

export class DataboxDBRecordClient {
  axios: AxiosBaseClient;
  table: string;
  recordData: DataboxDBRecordData;
  constructor(
    axios: AxiosBaseClient,
    { table }: DataboxDBTableClientConfig,
    recordData: DataboxDBRecordData = {}
  ) {
    this.axios = axios;
    this.table = table;
    this.recordData = recordData;
  }

  /**
   * 获取记录数目
   */
  async count(): Promise<number> {
    const response = await this.axios.request<
      DataboxDBCountRecordsInTableResponse
    >({
      url: `/v1/db/table/${this.table}/count`,
      method: 'GET',
    });
    return response.data!.count;
  }

  /**
   * 插入记录
   */
  async insert(
    record: DataboxDBRecordData = this.recordData
  ): Promise<DataboxDBRecordRow> {
    const response = await this.axios.request<
      DataboxDBInsertRecordResponse,
      DataboxDBInsertRecordBody
    >({
      url: `/v1/db/table/${this.table}/record`,
      method: 'POST',
      data: { record },
    });
    return response!.data!.record;
  }

  /**
   * 通过ID获取记录
   */
  async readById(id?: string): Promise<DataboxDBRecordRow> {
    const response = await this.axios.request<DataboxDBReadRecordByIdResponse>({
      url: `/v1/db/table/${this.table}/record/${id ?? this.recordData._id}`,
      method: 'GET',
    });
    return response.data!.record;
  }

  /**
   * 查询记录
   * 查询对象参考 Mongo(https://www.mongodb.com/docs/manual/tutorial/query-documents/)
   */
  async query(
    query: object,
    opt?: PaginationOpt
  ): Promise<IBC.Page<DataboxDBRecordRow>> {
    const response = await this.axios.request<
      DataboxDBQueryRecordResponse,
      DataboxDBQueryRecordBody
    >(
      {
        url: `/v1/db/table/${this.table}/query`,
        method: 'POST',
        data: { query },
      },
      opt
    );
    return response.data!.page;
  }

  /**
   * 更新记录
   * 更新对象参考 Mongo(https://www.mongodb.com/docs/manual/tutorial/update-documents/)
   * 目前仅支持 $set $unset
   */
  async updateById(
    updateObj: DataboxDBUpdateRecordByIdBody,
    id?: string
  ): Promise<boolean> {
    const response = await this.axios.request<
      DataboxDBUpdateRecordByIdResponse,
      DataboxDBUpdateRecordByIdBody
    >({
      url: `/v1/db/table/${this.table}/record/${id ?? this.recordData.id}`,
      method: 'PUT',
      data: updateObj,
    });
    return response.data!.affected === 1;
  }

  /**
   * 通过ID移除记录
   */
  async removeById(id?: string): Promise<boolean> {
    const response = await this.axios.request<
      DataboxDBRemoveRecordByIdResponse
    >({
      url: `/v1/db/table/${this.table}/record/${id ?? this.recordData.id}`,
      method: 'DELETE',
    });
    return response.data!.success;
  }
}

export const createRecordClient = (
  axios: AxiosBaseClient,
  dbTableClientConfig: DataboxDBTableClientConfig,
  recordData: DataboxDBRecordData = {}
): DataboxDBRecordClient =>
  new DataboxDBRecordClient(axios, dbTableClientConfig, recordData);
