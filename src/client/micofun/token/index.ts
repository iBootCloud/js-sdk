import { AxiosBaseClient } from '../../axios';
import { MicofunModuleClientConfig } from '../index';
import { createMagicTokenClient, MicofunMagicTokenClient } from './magic';

export class MicofunTokenClient {
  moduleClientConfig: MicofunModuleClientConfig;
  axios: AxiosBaseClient;
  constructor(moduleClientConfig: MicofunModuleClientConfig) {
    this.moduleClientConfig = moduleClientConfig;
    this.axios = new AxiosBaseClient({
      ...moduleClientConfig,
    });
  }
  magicToken(cfg?: MicofunModuleClientConfig): MicofunMagicTokenClient {
    return createMagicTokenClient({ ...this.moduleClientConfig, ...cfg });
  }
}

export const createTokenClient = (
  moduleClientConfig: MicofunModuleClientConfig
): MicofunTokenClient => new MicofunTokenClient(moduleClientConfig);
