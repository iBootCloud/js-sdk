import { AppendIBCServiceClientConfig, IBCServiceClientConfig } from '../index';
import { IBCService } from '../../constants';

import { createEndUserClient, IdentityEndUserClient } from './endUser';
import { createOpenClient, IdentityOpenClient } from './open';
import { createManageClient, IdentityManageClient } from './manage';

export * from './endUser';
export * from './manage';
export * from './open';

export type IdentityClientConfig = {
  instanceId: string;
};
export type CreateIdentityClientConfig = IdentityClientConfig &
  IBCServiceClientConfig;

export type IdentityModuleClientConfig = CreateIdentityClientConfig & {
  service: IBCService.IDENTITY;
};

export type AppendIdentityClientConfig = {
  instanceId?: string;
} & AppendIBCServiceClientConfig;

export class IdentityClient {
  clientConfig: IdentityModuleClientConfig;

  constructor(cfg: CreateIdentityClientConfig) {
    this.clientConfig = {
      ...cfg,
      service: IBCService.IDENTITY,
    };
  }

  endUser(cfg?: AppendIdentityClientConfig): IdentityEndUserClient {
    return createEndUserClient({ ...this.clientConfig, ...cfg });
  }

  open(cfg?: AppendIdentityClientConfig): IdentityOpenClient {
    return createOpenClient({ ...this.clientConfig, ...cfg });
  }

  manage(cfg?: AppendIdentityClientConfig): IdentityManageClient {
    return createManageClient({ ...this.clientConfig, ...cfg });
  }
}

export const createIdentityClient = (
  cfg: CreateIdentityClientConfig
): IdentityClient => new IdentityClient(cfg);
