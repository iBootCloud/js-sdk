import { AxiosBaseClient } from '../../../axios';
import { MicofunModuleClientConfig } from '../../index';
import { ObjectUtil } from '@ibootcloud/common-lib';
import { Micofun } from '../../../../types';

export class MicofunMagicTokenClient {
  axios: AxiosBaseClient;

  constructor(moduleClientConfig: MicofunModuleClientConfig) {
    this.axios = new AxiosBaseClient({
      ...moduleClientConfig,
    });
  }

  /**
   * 生成MagicToken [V1]
   * POST /v1/token/magic/generate
   * 接口ID：28134365
   * 接口地址：https://www.apifox.cn/web/project/1031456/apis/api-28134365
   */
  async generate(
    params: Micofun.Token.MagicToken.GenerateMagicTokenBody
  ): Promise<string> {
    const response = await this.axios.request<
      Micofun.Token.MagicToken.GenerateMagicTokenResponse,
      Micofun.Token.MagicToken.GenerateMagicTokenBody
    >({
      url: `/v1/token/magic/generate`,
      method: 'POST',
      data: ObjectUtil.removeUndefined(params),
    });
    return response.data!.token;
  }

  /**
   * 验证MagicToken [V1]
   * POST /v1/token/magic/validate
   * 接口ID：28134366
   * 接口地址：https://www.apifox.cn/web/project/1031456/apis/api-28134366
   */
  async validate(
    params: Micofun.Token.MagicToken.ValidateMagicTokenBody
  ): Promise<object | string | false> {
    const response = await this.axios.request<
      Micofun.Token.MagicToken.ValidateMagicTokenResponse,
      Micofun.Token.MagicToken.ValidateMagicTokenBody
    >({
      url: `/v1/token/magic/validate`,
      method: 'POST',
      data: ObjectUtil.removeUndefined(params),
    });
    return response.data!.pass
      ? (response.data!.context as string | object)
      : false;
  }
}

export const createMagicTokenClient = (
  moduleClientConfig: MicofunModuleClientConfig
): MicofunMagicTokenClient => new MicofunMagicTokenClient(moduleClientConfig);
