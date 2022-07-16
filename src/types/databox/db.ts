import { IBC } from '@ibootcloud/common-lib';

export namespace DB {
  export type RecordRow = {
    _id: string;
    _created_time: Date;
    _updated_time: Date;
    _version: number;
  } & RecordContent;
  export type DATABOX_DB_SUPPORT_RECORD_VAL =
    | number
    | string
    | Date
    | boolean
    | object;
  export type RecordContent = Record<string, DATABOX_DB_SUPPORT_RECORD_VAL>;

  export interface MongoUpdateObj {
    $set?: RecordContent;
    $unset?: Record<string, 1>;
  }

  export type RecordData = {
    _id?: string;
  } & RecordContent;

  export interface CreateTableBody {
    table: string;
  }

  export interface RenameTableBody {
    newTableName: string;
  }

  export type ListTableNameResponse = string[];

  export interface QueryRecordBody {
    query: object;
  }

  export interface QueryRecordResponse {
    page: IBC.Page<RecordRow>;
  }

  export interface UpdateRecordByIdBody {
    $set?: RecordContent;
    $unset?: string[];
  }

  export interface UpdateRecordByIdResponse {
    affected: number;
  }

  export interface InsertRecordBody {
    record: RecordData;
  }

  export interface InsertRecordResponse {
    record: RecordRow;
  }

  export interface RemoveRecordByIdResponse {
    success: boolean;
  }

  export interface CountRecordsInTableResponse {
    count: number;
  }

  export interface ReadRecordByIdResponse {
    record: RecordRow;
  }
}
