import { LANG } from '@ibootcloud/common-lib';
import { createDataboxClient, DataboxClient } from './databox';
import { ENV } from '../constants';
import { IBCClientLogAdapter } from './axios';
import { createMicofunClient, MicofunClient } from './micofun';

export * from './databox';
export * from './axios';

export interface IBCServiceClientConfig {
  // 当前的i18n语言
  lang: LANG;
  // IBC的应用请求密钥
  apiKey?: string;
  accessToken?: string;
  // 请求环境
  env: ENV;
  // 请求超时
  timeout: number;
  // client使用的日志适配器
  logAdapter?: IBCClientLogAdapter;
  // 覆盖内部自带的服务域名
  baseUrl?: string;
  // 请求不成功时(code !== 1)是否抛出错误，错误信息为错误码
  throwOnFail: boolean;
}

export interface IBCClientConfig {
  lang?: LANG;
  apiKey?: string;
  accessToken?: string;
  env?: ENV;
  timeout?: number;
  logAdapter?: IBCClientLogAdapter;
  throwOnFail?: boolean;
}

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

  databox(param?: IBCServiceClientConfig): DataboxClient {
    return createDataboxClient({ ...this.serviceClientConfig, ...param });
  }

  micofun(param?: IBCServiceClientConfig): MicofunClient {
    return createMicofunClient({ ...this.serviceClientConfig, ...param });
  }
}

export const createClient = (cfg?: IBCClientConfig): IBCClient =>
  new IBCClient(cfg);
