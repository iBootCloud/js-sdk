export enum MicofunOTPType {
  NUMBER = 1,
  LETTER = 2,
  NUMBER_LETTER = 3,
}
export interface MicofunOTPGenerateOTPBody {
  identifier: string;
  ttl?: number;
  type?: MicofunOTPType;
  size?: number;
}
export type MicofunOTPGenerateOTPResponse = {
  passCode: string;
};
export interface MicofunOTPValidateOTPBody {
  identifier: string;
  otp: string;
}
export type MicofunOTPValidateOTPResponse = {
  pass: boolean;
};
