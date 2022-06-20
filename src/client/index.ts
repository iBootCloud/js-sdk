import { LANG } from '@ibootcloud/common-lib';
import { createDataboxClient } from './databox';
import { ENV } from '../constants';
import { ClientLogAdapter } from './axios';

export interface CreateServiceClientConfig {
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
  logAdapter?: ClientLogAdapter;
  // 覆盖内部自带的服务域名
  baseUrl?: string;
  // 请求不成功时(code !== 1)是否抛出错误，错误信息为错误码
  throwOnFail: boolean;
}

export const createClient = (
  rootClientConfig: {
    lang?: LANG;
    apiKey?: string;
    accessToken?: string;
    env?: ENV;
    timeout?: number;
    logAdapter?: ClientLogAdapter;
    throwOnFail?: boolean;
  } = {}
) => {
  const {
    lang = LANG.EN,
    env = ENV.PRODUCTION,
    timeout = 10000,
    throwOnFail = true,
  } = rootClientConfig;
  const serviceClientConfig: CreateServiceClientConfig = {
    ...rootClientConfig,
    lang,
    env,
    timeout,
    throwOnFail,
  };
  return {
    databox: (param?: CreateServiceClientConfig) =>
      createDataboxClient({ ...serviceClientConfig, ...param }),
  };
};
