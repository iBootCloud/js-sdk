import { LANG } from '@ibootcloud/common-lib';

export enum MicofunNotifySMSTemplate {
  VERIFY_CODE = 1,
  VERIFY_CODE_TTL_MIN = 2,
  OPR_OTP = 3,
  OTP = 4,
  OTP_TTL = 5,
}
export enum MicofunNotifyEmailTemplate {
  OTP = 1,
}
export interface MicofunNotifySendSMSBody {
  template: MicofunNotifySMSTemplate;
  templateParams?: Record<string, string>;
  target: string[];
}
export interface MicofunNotifySendEMailBody {
  template: MicofunNotifyEmailTemplate;
  templateParams?: Record<string, unknown>;
  senderName?: string;
  subject?: string;
  replyAddress?: string;
  target: string[];
  lang?: LANG;
}
