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

export const createRecordClient = (
  axios: AxiosBaseClient,
  { table }: DBTableClientConfig,
  recordData: RecordData = {}
) => {
  return {
    /**
     * 获取记录数目
     */
    count: async (): Promise<number> => {
      const response = await axios.request<CountRecordsInTableResponse>({
        url: `/v1/db/table/${table}/count`,
        method: 'GET',
      });
      return response.data!.count;
    },

    /**
     * 插入记录
     */
    insert: async (record: RecordData = recordData): Promise<boolean> => {
      const response = await axios.request<
        InsertRecordResponse,
        InsertRecordBody
      >({
        url: `/v1/db/table/${table}/record`,
        method: 'POST',
        data: { record },
      });
      return response!.data!.success;
    },

    /**
     * 通过ID获取记录
     */
    readById: async (id?: string): Promise<RecordRow> => {
      const response = await axios.request<ReadRecordByIdResponse>({
        url: `/v1/db/table/${table}/record/${id ?? recordData._id}`,
        method: 'GET',
      });
      return response.data!.record;
    },

    /**
     * 查询记录
     * 查询对象参考 Mongo(https://www.mongodb.com/docs/manual/tutorial/query-documents/)
     */
    query: async (
      query: object,
      opt?: PaginationOpt
    ): Promise<IBC.Page<RecordRow>> => {
      const response = await axios.request<
        QueryRecordResponse,
        QueryRecordBody
      >(
        {
          url: `/v1/db/table/${table}/query`,
          method: 'POST',
          data: { query },
        },
        opt
      );
      return response.data!.page;
    },

    /**
     * 更新记录
     * 更新对象参考 Mongo(https://www.mongodb.com/docs/manual/tutorial/update-documents/)
     * 目前仅支持 $set $unset
     */
    updateById: async (
      updateObj: UpdateRecordByIdBody,
      id?: string
    ): Promise<boolean> => {
      const response = await axios.request<
        UpdateRecordByIdResponse,
        UpdateRecordByIdBody
      >({
        url: `/v1/db/table/${table}/record/${id ?? recordData._id}`,
        method: 'PUT',
        data: updateObj,
      });
      return response.data!.affected === 1;
    },

    /**
     * 通过ID移除记录
     */
    removeById: async (id?: string): Promise<boolean> => {
      const response = await axios.request<RemoveRecordByIdResponse>({
        url: `/v1/db/table/${table}/record/${id ?? recordData._id}`,
        method: 'DELETE',
      });
      return response.data!.success;
    },
  };
};
