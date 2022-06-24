import { IBC } from '@ibootcloud/common-lib';
export type DataboxDBRecordRow = {
  _id: string;
  _created_time: Date;
  _updated_time: Date;
  _version: number;
} & DataboxDBRecordContent;
export type DATABOX_DB_SUPPORT_RECORD_VAL =
  | number
  | string
  | Date
  | boolean
  | object;
export type DataboxDBRecordContent = Record<
  string,
  DATABOX_DB_SUPPORT_RECORD_VAL
>;
export interface DataboxDBMongoUpdateObj {
  $set?: DataboxDBRecordContent;
  $unset?: Record<string, 1>;
}
export type DataboxDBRecordData = {
  _id?: string;
} & DataboxDBRecordContent;
export interface DataboxDBCreateTableBody {
  table: string;
}
export interface DataboxDBRenameTableBody {
  newTableName: string;
}
export type DataboxDBListTableNameResponse = string[];
export interface DataboxDBQueryRecordBody {
  query: object;
}
export interface DataboxDBQueryRecordResponse {
  page: IBC.Page<DataboxDBRecordRow>;
}
export interface DataboxDBUpdateRecordByIdBody {
  $set?: DataboxDBRecordContent;
  $unset?: string[];
}
export interface DataboxDBUpdateRecordByIdResponse {
  affected: number;
}
export interface DataboxDBInsertRecordBody {
  record: DataboxDBRecordData;
}
export interface DataboxDBInsertRecordResponse {
  record: DataboxDBRecordRow;
}
export interface DataboxDBRemoveRecordByIdResponse {
  success: boolean;
}
export interface DataboxDBCountRecordsInTableResponse {
  count: number;
}
export interface DataboxDBReadRecordByIdResponse {
  record: DataboxDBRecordRow;
}
