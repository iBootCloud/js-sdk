import { AxiosBaseClient, PaginationOpt } from '../../axios';
import { DataboxDBTableClientConfig } from './table';
import { Databox } from '../../../types';
import { IBC } from '@ibootcloud/common-lib';

export class DataboxDBRecordClient {
  axios: AxiosBaseClient;
  table: string;
  recordData: Databox.DB.RecordData;

  constructor(
    axios: AxiosBaseClient,
    { table }: DataboxDBTableClientConfig,
    recordData: Databox.DB.RecordData = {}
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
      Databox.DB.CountRecordsInTableResponse
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
    record: Databox.DB.RecordData = this.recordData
  ): Promise<Databox.DB.RecordRow> {
    const response = await this.axios.request<
      Databox.DB.InsertRecordResponse,
      Databox.DB.InsertRecordBody
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
  async readById(id?: string): Promise<Databox.DB.RecordRow> {
    const response = await this.axios.request<
      Databox.DB.ReadRecordByIdResponse
    >({
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
  ): Promise<IBC.Page<Databox.DB.RecordRow>> {
    const response = await this.axios.request<
      Databox.DB.QueryRecordResponse,
      Databox.DB.QueryRecordBody
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
    updateObj: Databox.DB.UpdateRecordByIdBody,
    id?: string
  ): Promise<boolean> {
    const response = await this.axios.request<
      Databox.DB.UpdateRecordByIdResponse,
      Databox.DB.UpdateRecordByIdBody
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
      Databox.DB.RemoveRecordByIdResponse
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
  recordData: Databox.DB.RecordData = {}
): DataboxDBRecordClient =>
  new DataboxDBRecordClient(axios, dbTableClientConfig, recordData);
