import {
  AppendIdentityClientConfig,
  createEndUserAuthClient,
  createEndUserProfileClient,
  IdentityEndUserAuthClient,
  IdentityEndUserProfileClient,
  IdentityModuleClientConfig,
} from '../index';

export * from './auth';
export * from './profile';

export class IdentityEndUserClient {
  clientConfig: IdentityModuleClientConfig;

  constructor(cfg: IdentityModuleClientConfig) {
    this.clientConfig = { ...cfg };
  }

  auth(cfg?: AppendIdentityClientConfig): IdentityEndUserAuthClient {
    return createEndUserAuthClient({ ...this.clientConfig, ...cfg });
  }

  profile(cfg?: AppendIdentityClientConfig): IdentityEndUserProfileClient {
    return createEndUserProfileClient({ ...this.clientConfig, ...cfg });
  }
}

export const createEndUserClient = (
  clientConfig: IdentityModuleClientConfig
): IdentityEndUserClient => new IdentityEndUserClient(clientConfig);
