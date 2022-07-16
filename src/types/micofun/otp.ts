export namespace OTP {
  export enum Type {
    NUMBER = 1,
    LETTER = 2,
    NUMBER_LETTER = 3,
  }

  export interface GenerateOTPBody {
    identifier: string;
    ttl?: number;
    type?: Type;
    size?: number;
  }

  export type GenerateOTPResponse = {
    passCode: string;
  };

  export interface ValidateOTPBody {
    identifier: string;
    otp: string;
    removeOnPass?: boolean;
  }

  export type ValidateOTPResponse = {
    pass: boolean;
  };
}
