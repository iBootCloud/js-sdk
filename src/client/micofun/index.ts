import {
  createGrantClient,
  IBCServiceClientConfig,
  MicofunGrantClient,
  MicofunGrantClientConfig,
} from '../index';
import { LANG } from '@ibootcloud/common-lib';
import { ENV, IBCService } from '../../constants';
import { IBCClientLogAdapter } from '../axios';
import { createNotifyClient, MicofunNotifyClient } from './notify';
import { createUrlClient, MicofunUrlClient } from './url';
import {
  createOTPClient,
  MicofunOTPClient,
  MicofunOTPClientConfig,
} from './otp';
import { AxiosRequestConfig } from 'axios';
import { createTokenClient, MicofunTokenClient } from './token';

export * from './otp';
export * from './url';
export * from './token';
export * from './notify';
export * from './grant';

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
  requestInterceptor?: (config: AxiosRequestConfig) => AxiosRequestConfig;
  responseInterceptor?: (response: any) => any;
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

  otp(otpClientConfig: MicofunOTPClientConfig): MicofunOTPClient {
    return createOTPClient(this.moduleClientConfig, otpClientConfig);
  }

  token(): MicofunTokenClient {
    return createTokenClient(this.moduleClientConfig);
  }

  grant(cfg: MicofunGrantClientConfig): MicofunGrantClient {
    return createGrantClient(this.moduleClientConfig, cfg);
  }
}

export const createMicofunClient = (
  serviceClientConfig: IBCServiceClientConfig
): MicofunClient => new MicofunClient(serviceClientConfig);
