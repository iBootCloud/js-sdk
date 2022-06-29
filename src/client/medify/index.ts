import { IBCServiceClientConfig } from '../index';
import { LANG } from '@ibootcloud/common-lib';
import { ENV, IBCService } from '../../constants';
import { IBCClientLogAdapter } from '../axios';
import { AxiosRequestConfig } from 'axios';
import { createImgClient, MedifyImgClient } from './img';

export interface MedifyModuleClientConfig {
  lang: LANG;
  apiKey?: string;
  accessToken?: string;
  env: ENV;
  timeout: number;
  service: IBCService.MEDIFY;
  logAdapter?: IBCClientLogAdapter;
  baseUrl?: string;
  throwOnFail: boolean;
  requestInterceptor?: (config: AxiosRequestConfig) => AxiosRequestConfig;
  responseInterceptor?: (response: any) => any;
}

export class MedifyClient {
  moduleClientConfig: MedifyModuleClientConfig;
  constructor(serviceClientConfig: IBCServiceClientConfig) {
    this.moduleClientConfig = {
      ...serviceClientConfig,
      service: IBCService.MEDIFY,
    };
  }
  img(): MedifyImgClient {
    return createImgClient(this.moduleClientConfig);
  }
}

export const createMedifyClient = (
  serviceClientConfig: IBCServiceClientConfig
): MedifyClient => new MedifyClient(serviceClientConfig);
