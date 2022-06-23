import { AxiosBaseClient, PaginationOpt } from '../../axios';
import { DBTableClientConfig } from './table';
import {
  CountRecordsInTableResponse,
  InsertRecordBody,
  InsertRecordResponse,
  QueryRecordBody,
  QueryRecordResponse,
  ReadRecordByIdResponse,
  RecordData,
  RecordRow,
  RemoveRecordByIdResponse,
  UpdateRecordByIdBody,
  UpdateRecordByIdResponse,
} from '../../../types/databox/db.dto';
import { IBC } from '@ibootcloud/common-lib';

export class RecordClient {
  axios: AxiosBaseClient;
  table: string;
  recordData: RecordData;
  constructor(
    axios: AxiosBaseClient,
    { table }: DBTableClientConfig,
    recordData: RecordData = {}
  ) {
    this.axios = axios;
    this.table = table;
    this.recordData = recordData;
  }

  /**
   * 获取记录数目
   */
  async count(): Promise<number> {
    const response = await this.axios.request<CountRecordsInTableResponse>({
      url: `/v1/db/table/${this.table}/count`,
      method: 'GET',
    });
    return response.data!.count;
  }

  /**
   * 插入记录
   */
  async insert(record: RecordData = this.recordData): Promise<boolean> {
    const response = await this.axios.request<
      InsertRecordResponse,
      InsertRecordBody
    >({
      url: `/v1/db/table/${this.table}/record`,
      method: 'POST',
      data: { record },
    });
    return response!.data!.success;
  }

  /**
   * 通过ID获取记录
   */
  async readById(id?: string): Promise<RecordRow> {
    const response = await this.axios.request<ReadRecordByIdResponse>({
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
  ): Promise<IBC.Page<RecordRow>> {
    const response = await this.axios.request<
      QueryRecordResponse,
      QueryRecordBody
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
    updateObj: UpdateRecordByIdBody,
    id?: string
  ): Promise<boolean> {
    const response = await this.axios.request<
      UpdateRecordByIdResponse,
      UpdateRecordByIdBody
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
    const response = await this.axios.request<RemoveRecordByIdResponse>({
      url: `/v1/db/table/${this.table}/record/${id ?? this.recordData.id}`,
      method: 'DELETE',
    });
    return response.data!.success;
  }
}

export const createRecordClient = (
  axios: AxiosBaseClient,
  dbTableClientConfig: DBTableClientConfig,
  recordData: RecordData = {}
): RecordClient => new RecordClient(axios, dbTableClientConfig, recordData);
