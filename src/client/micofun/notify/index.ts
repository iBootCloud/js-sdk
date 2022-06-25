import { AxiosBaseClient } from '../../axios';
import { MicofunModuleClientConfig } from '../index';
import { ObjectUtil } from '@ibootcloud/common-lib';
import {
  MicofunNotifySendEMailBody,
  MicofunNotifySendSMSBody,
  MicofunNotifySMSTemplate,
} from '../../../types';

export class MicofunNotifyClient {
  axios: AxiosBaseClient;
  constructor(moduleClientConfig: MicofunModuleClientConfig) {
    this.axios = new AxiosBaseClient({
      ...moduleClientConfig,
    });
  }
  /**
   * 提交短信发送 [V1]
   * POST /v1/notify/sms
   * 接口ID：21397377
   * 接口地址：https://www.apifox.cn/web/project/1031456/apis/api-21397377
   */
  async sms(
    target: string[],
    template: MicofunNotifySMSTemplate,
    templateParams?: Record<string, string>
  ): Promise<void> {
    await this.axios.request<void, MicofunNotifySendSMSBody>({
      url: `/v1/notify/sms`,
      method: 'POST',
      data: ObjectUtil.removeUndefined({
        template,
        target,
        templateParams,
      }),
    });
  }

  /**
   * 提交电子邮件发送 [V1]
   * POST /v1/notify/email
   * 接口ID：25627669
   * 接口地址：https://www.apifox.cn/web/project/1031456/apis/api-25627669
   */
  async email(params: MicofunNotifySendEMailBody): Promise<void> {
    await this.axios.request<void, MicofunNotifySendEMailBody>({
      url: `/v1/notify/email`,
      method: 'POST',
      data: ObjectUtil.removeUndefined(params),
    });
  }
}

export const createNotifyClient = (
  moduleClientConfig: MicofunModuleClientConfig
): MicofunNotifyClient => new MicofunNotifyClient(moduleClientConfig);
