export enum DataboxUIDType {
  INC_INT = 1,
  NANOID = 2,
  UUID = 3,
  OBJECT_ID = 4,
}
export interface DataboxUIDNextUIDParam {
  type?: DataboxUIDType;
  alphabet?: string;
  size?: number;
}
export interface DataboxUIDNextUIDResponse {
  uid: string;
  type: DataboxUIDType;
}
