export namespace UID {
  export enum IDType {
    SERIAL = 1,
    NANOID = 2,
    UUID = 3,
    OBJECT_ID = 4,
  }

  export interface GlobalParam {
    global?: boolean;
    instanceId?: string;
  }

  export interface NextUIDResponse {
    uid: string;
    type: IDType;
  }

  export interface NextUIDParam {
    instanceId?: string;
    global?: boolean;
  }

  export interface NextUUIDParam extends NextUIDParam {
    version?: number;
    simplify?: boolean;
  }

  export interface NextNanoIDParam extends NextUIDParam {
    alphabet?: string;
    size?: number;
  }

  export interface NextSerialParam extends NextUIDParam {
    step?: number;
  }
}
