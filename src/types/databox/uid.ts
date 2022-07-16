export namespace UID {
  export enum Type {
    INC_INT = 1,
    NANOID = 2,
    UUID = 3,
    OBJECT_ID = 4,
  }

  export interface NextUIDParam {
    type?: Type;
    alphabet?: string;
    size?: number;
  }

  export interface NextUIDResponse {
    uid: string;
    type: Type;
  }
}
