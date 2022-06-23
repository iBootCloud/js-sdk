import { AxiosBaseClient } from '../../axios';
import { MicofunModuleClientConfig } from '../index';
import { ObjectUtil } from '@ibootcloud/common-lib';
import {
  MicofunOTPGenerateOTPBody,
  MicofunOTPGenerateOTPResponse,
  MicofunOTPValidateOTPBody,
  MicofunOTPValidateOTPResponse,
} from '../../../types';

export class MicofunOTPClient {
  axios: AxiosBaseClient;
  constructor(moduleClientConfig: MicofunModuleClientConfig) {
    this.axios = new AxiosBaseClient({
      ...moduleClientConfig,
    });
  }
  /**
   * 生成OTP [V1]
   * POST /v1/otp/generate
   * 接口ID：25650112
   * 接口地址：https://www.apifox.cn/web/project/1031456/apis/api-25650112
   */
  async generate(params: MicofunOTPGenerateOTPBody): Promise<string> {
    const response = await this.axios.request<
      MicofunOTPGenerateOTPResponse,
      MicofunOTPGenerateOTPBody
    >({
      url: `/v1/otp/generate`,
      method: 'POST',
      data: ObjectUtil.removeEmpty(params),
    });
    return response.data!.passCode;
  }

  /**
   * 校验OTP [V1]
   * POST /v1/otp/validate
   * 接口ID：21397378
   * 接口地址：https://www.apifox.cn/web/project/1031456/apis/api-21397378
   */
  async validate(params: MicofunOTPValidateOTPBody): Promise<boolean> {
    const response = await this.axios.request<
      MicofunOTPValidateOTPResponse,
      MicofunOTPValidateOTPBody
    >({
      url: `/v1/otp/validate`,
      method: 'POST',
      data: ObjectUtil.removeEmpty(params),
    });
    return response.data!.pass;
  }
}

export const createOTPClient = (
  moduleClientConfig: MicofunModuleClientConfig
): MicofunOTPClient => new MicofunOTPClient(moduleClientConfig);
