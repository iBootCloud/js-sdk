import { LANG } from '@ibootcloud/common-lib';

export namespace Notify {
  export enum SMSTemplate {
    VERIFY_CODE = 1,
    VERIFY_CODE_TTL_MIN = 2,
    OPR_OTP = 3,
    OTP = 4,
    OTP_TTL = 5,
  }

  export enum EmailTemplate {
    OTP = 1,
  }

  export interface SendSMSBody {
    template: SMSTemplate;
    templateParams?: Record<string, string>;
    target: string[];
  }

  export interface SendEMailBody {
    template: EmailTemplate;
    templateParams?: Record<string, unknown>;
    senderName?: string;
    subject?: string;
    replyAddress?: string;
    target: string[];
    lang?: LANG;
  }
}
