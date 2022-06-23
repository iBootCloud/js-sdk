import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosRequestHeaders,
} from 'axios';
import _ from 'lodash';
import {
  Formation,
  IBC,
  IBCHeader,
  IdUtil,
  QueryParam,
  dayjs,
  LANG,
} from '@ibootcloud/common-lib';
import { ENV, IBCService, getBaseURL } from '../constants';

export interface IBCClientLogAdapter {
  error: (...msg: any) => void;
  warn: (...msg: any) => void;
  info: (...msg: any) => void;
  debug: (...msg: any) => void;
  trace: (...msg: any) => void;
}

// 默认的控制台打印日志适配器
class ConsoleLogAdapter implements IBCClientLogAdapter {
  debug(...msg: any): void {
    console.debug(msg);
  }

  error(...msg: any): void {
    console.error(msg);
  }

  info(...msg: any): void {
    console.info(msg);
  }

  trace(...msg: any): void {
    console.trace(msg);
  }

  warn(...msg: any): void {
    console.warn(msg);
  }
}

// 请求之前添加时间戳
const timestampInterceptor = (config: any) => {
  config.headers[IBCHeader.TIMESTAMP_KEY] = dayjs().format(Formation.TIMESTAMP);
  return config;
};
// 请求之前添加Nonce
const nonceInterceptor = (config: any) => {
  config.headers[IBCHeader.NONCE_KEY] = IdUtil.nextUUIDv4();
  return config;
};

interface CreateAxiosClientConfig {
  instanceId?: string;
  lang: LANG;
  apiKey?: string;
  accessToken?: string;
  env: ENV;
  timeout: number;
  service: IBCService;
  logAdapter?: IBCClientLogAdapter;
  baseUrl?: string;
  throwOnFail: boolean;
}

// 组合配置并创建Axios客户端
const createAxiosInstance = (
  opt: CreateAxiosClientConfig
): { axios: AxiosInstance; logAdapter: IBCClientLogAdapter } => {
  const {
    instanceId,
    timeout,
    lang,
    service,
    env,
    apiKey,
    accessToken,
    logAdapter = new ConsoleLogAdapter(),
    baseUrl,
    throwOnFail,
  } = opt;

  // 组装请求头
  const headers: AxiosRequestHeaders = {};
  if (lang) headers[IBCHeader.LANG_KEY] = lang;
  if (instanceId) headers[IBCHeader.INSTANCE_ID_KEY] = instanceId;
  if (apiKey) headers[IBCHeader.API_KEY_KEY] = apiKey;
  if (accessToken) headers[IBCHeader.AUTH_KEY] = `Bearer ${accessToken}`;

  // 创建Axios实例
  const inst = axios.create({
    baseURL: baseUrl ?? getBaseURL(env)[service],
    timeout,
    headers,
  });

  // 请求结果验证
  const respSchemaInterceptor = async (response: any) => {
    if (response.data.code !== 1) {
      logAdapter?.warn(
        // 打印错误信息
        `[iBootCloud JS-SDK] response result abnormal: ${response.data.msg}`,
        response.data
      );
      if (throwOnFail) {
        throw new Error(response.data.code);
      }
    }
    return response;
  };

  inst.interceptors.request.use(timestampInterceptor);
  inst.interceptors.request.use(nonceInterceptor);
  inst.interceptors.response.use(respSchemaInterceptor);

  return { axios: inst, logAdapter };
};

export interface PaginationOpt {
  page?: IBC.Page;
  sort?: IBC.Sort;
}

export class AxiosBaseClient {
  baseAxiosOptions: CreateAxiosClientConfig;
  baseAxios: AxiosInstance;
  logAdapter: ConsoleLogAdapter;

  constructor(opt: CreateAxiosClientConfig) {
    const inst = createAxiosInstance(opt);
    this.baseAxiosOptions = opt;
    this.baseAxios = inst.axios;
    this.logAdapter = inst.logAdapter;
  }

  async request<R, D = unknown>(
    config: AxiosRequestConfig<D>,
    opt?: PaginationOpt
  ): Promise<IBC.Response<R>> {
    // 填充query特殊参数
    if (opt?.page?.currentPage)
      _.set(
        config,
        `params.${QueryParam.PAGE_CURRENT}`,
        opt?.page?.currentPage
      );
    if (opt?.page?.pageSize)
      _.set(config, `params.${QueryParam.PAGE_SIZE}`, opt?.page?.pageSize);
    if (opt?.sort?.orderType)
      _.set(
        config,
        `params.${QueryParam.SORT_ORDER_TYPE}`,
        opt?.sort?.orderType
      );
    if (opt?.sort?.sortBy)
      _.set(config, `params.${QueryParam.SORT_ORDER_TYPE}`, opt?.sort?.sortBy);

    try {
      const resp = await this.baseAxios.request<IBC.Response<R>>(config);
      return resp.data;
    } catch (err) {
      throw new Error(`[iBootCloud JS-SDK] Request ERROR ${err}`);
    }
  }
}
