export enum IDType {
  INC_INT = 1,
  NANOID = 2,
  UUID = 3,
  OBJECT_ID = 4,
}
export interface NextUIDParam {
  type?: IDType;
}
export interface NextUIDResponse {
  uid: string;
  type: IDType;
}
