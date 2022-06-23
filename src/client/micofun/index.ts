import { IBCServiceClientConfig } from '../index';
import { LANG } from '@ibootcloud/common-lib';
import { ENV, IBCService } from '../../constants';
import { IBCClientLogAdapter } from '../axios';
import { createNotifyClient, MicofunNotifyClient } from './notify';
import { createUrlClient, MicofunUrlClient } from './url';
import { createOTPClient, MicofunOTPClient } from './otp';

export interface MicofunModuleClientConfig {
  lang: LANG;
  apiKey?: string;
  accessToken?: string;
  env: ENV;
  timeout: number;
  service: IBCService.MICOFUN;
  logAdapter?: IBCClientLogAdapter;
  baseUrl?: string;
  throwOnFail: boolean;
}

export class MicofunClient {
  moduleClientConfig: MicofunModuleClientConfig;
  constructor(serviceClientConfig: IBCServiceClientConfig) {
    this.moduleClientConfig = {
      ...serviceClientConfig,
      service: IBCService.MICOFUN,
    };
  }
  notify(): MicofunNotifyClient {
    return createNotifyClient(this.moduleClientConfig);
  }
  url(): MicofunUrlClient {
    return createUrlClient(this.moduleClientConfig);
  }
  otp(): MicofunOTPClient {
    return createOTPClient(this.moduleClientConfig);
  }
}

export const createMicofunClient = (
  serviceClientConfig: IBCServiceClientConfig
): MicofunClient => new MicofunClient(serviceClientConfig);
