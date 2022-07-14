import {
  AppendIdentityClientConfig,
  createManageAuthClient,
  createManageConfigClient,
  createManageHookClient,
  createManageOpenClient,
  createManageUserProfileClient,
  IdentityManageAuthClient,
  IdentityManageConfigClient,
  IdentityManageHookClient,
  IdentityManageOpenClient,
  IdentityManageUserProfileClient,
  IdentityModuleClientConfig,
} from '../index';

export * from './config';
export * from './hook';
export * from './profile';
export * from './auth';
export * from './open';

export class IdentityManageClient {
  clientConfig: IdentityModuleClientConfig;

  constructor(cfg: IdentityModuleClientConfig) {
    this.clientConfig = { ...cfg };
  }

  config(cfg?: AppendIdentityClientConfig): IdentityManageConfigClient {
    return createManageConfigClient({ ...this.clientConfig, ...cfg });
  }

  hook(cfg?: AppendIdentityClientConfig): IdentityManageHookClient {
    return createManageHookClient({ ...this.clientConfig, ...cfg });
  }

  profile(cfg?: AppendIdentityClientConfig): IdentityManageUserProfileClient {
    return createManageUserProfileClient({
      ...this.clientConfig,
      ...cfg,
    });
  }

  auth(cfg?: AppendIdentityClientConfig): IdentityManageAuthClient {
    return createManageAuthClient({ ...this.clientConfig, ...cfg });
  }

  open(cfg?: AppendIdentityClientConfig): IdentityManageOpenClient {
    return createManageOpenClient({ ...this.clientConfig, ...cfg });
  }
}

export const createManageClient = (
  clientConfig: IdentityModuleClientConfig
): IdentityManageClient => new IdentityManageClient(clientConfig);
