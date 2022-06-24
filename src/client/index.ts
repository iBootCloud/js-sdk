import { LANG } from '@ibootcloud/common-lib';
import { createDataboxClient, DataboxClient } from './databox';
import { ENV } from '../constants';
import { IBCClientLogAdapter } from './axios';
import { createMicofunClient, MicofunClient } from './micofun';
import { AxiosRequestConfig } from 'axios';

export * from './databox';
export * from './axios';

export interface IBCClientConfig {
  lang?: LANG;
  apiKey?: string;
  accessToken?: string;
  env?: ENV;
  timeout?: number;
  logAdapter?: IBCClientLogAdapter;
  throwOnFail?: boolean;
  requestInterceptor?: (config: AxiosRequestConfig) => AxiosRequestConfig;
  responseInterceptor?: (response: any) => any;
}

export type IBCServiceClientConfig = IBCClientConfig & {
  // 当前的i18n语言
  lang: LANG;
  // 请求环境
  env: ENV;
  // 请求超时
  timeout: number;
  // 请求不成功时(code !== 1)是否抛出错误，错误信息为错误码
  throwOnFail: boolean;
};

export type AppendIBCServiceClientConfig = IBCClientConfig & {
  // 覆盖内部自带的服务域名
  baseUrl?: string;
};

export class IBCClient {
  serviceClientConfig: IBCServiceClientConfig;
  constructor(cfg: IBCClientConfig = {}) {
    const {
      lang = LANG.EN,
      env = ENV.PRODUCTION,
      timeout = 10000,
      throwOnFail = true,
    } = cfg;
    this.serviceClientConfig = { ...cfg, lang, env, timeout, throwOnFail };
  }

  databox(param?: AppendIBCServiceClientConfig): DataboxClient {
    return createDataboxClient({ ...this.serviceClientConfig, ...param });
  }

  micofun(param?: AppendIBCServiceClientConfig): MicofunClient {
    return createMicofunClient({ ...this.serviceClientConfig, ...param });
  }
}

export const createClient = (cfg?: IBCClientConfig): IBCClient =>
  new IBCClient(cfg);
