import { AxiosBaseClient } from '../../axios';
import { MicofunModuleClientConfig } from '../index';
import { ObjectUtil } from '@ibootcloud/common-lib';
import {
  MicofunOTPGenerateOTPBody,
  MicofunOTPGenerateOTPResponse,
  MicofunOTPValidateOTPBody,
  MicofunOTPValidateOTPResponse,
} from '../../../types';

export interface MicofunOTPClientConfig {
  instanceId: string;
}

export class MicofunOTPClient {
  otpClientConfig: MicofunOTPClientConfig;
  axios: AxiosBaseClient;
  constructor(
    otpClientConfig: MicofunOTPClientConfig,
    moduleClientConfig: MicofunModuleClientConfig
  ) {
    this.otpClientConfig = otpClientConfig;
    this.axios = new AxiosBaseClient({
      ...moduleClientConfig,
      ...otpClientConfig,
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
      data: ObjectUtil.removeUndefined(params),
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
      data: ObjectUtil.removeUndefined(params),
    });
    return response.data!.pass;
  }
}

export const createOTPClient = (
  moduleClientConfig: MicofunModuleClientConfig,
  cfg: MicofunOTPClientConfig
): MicofunOTPClient => new MicofunOTPClient(cfg, moduleClientConfig);
