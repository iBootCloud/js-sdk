import { MicofunModuleClientConfig } from '../index';
import {
  createUrlShortenClient,
  MicofunUrlShortenClient,
  MicofunUrlShortenClientConfig,
} from './shorten';
import { AxiosBaseClient } from '../../axios';

export * from './shorten';

export class MicofunUrlClient {
  moduleClientConfig: MicofunModuleClientConfig;
  axios: AxiosBaseClient;
  constructor(moduleClientConfig: MicofunModuleClientConfig) {
    this.moduleClientConfig = moduleClientConfig;
    this.axios = new AxiosBaseClient({
      ...moduleClientConfig,
    });
  }

  shorten(cfg: MicofunUrlShortenClientConfig): MicofunUrlShortenClient {
    return createUrlShortenClient(this.moduleClientConfig, cfg);
  }
}

export const createUrlClient = (
  moduleClientConfig: MicofunModuleClientConfig
): MicofunUrlClient => new MicofunUrlClient(moduleClientConfig);
