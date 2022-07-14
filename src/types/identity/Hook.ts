export class IdentityWebHookConfig {
  endpoint?: string;
  headers?: Record<string, string>;
}

export type IdentityHookConfig = IdentityWebHookConfig;

export interface IdentityHook {
  hookId?: string;
  hookType?: IdentityHookType;
  eventType?: IdentityHookEvent;
  config?: IdentityHookConfig;
  meta?: IdentityHookMeta;
}

import { IBC } from '@ibootcloud/common-lib';

export enum IdentityHookEvent {
  LOGIN = 1,
  LOGOUT = 2,
  REFRESH_TOKEN = 3,
}

export enum IdentityHookType {
  WEBHOOK = 1,
}

export interface IdentityHookMeta {
  name?: string;
  description?: string;
}

export interface IdentityCreateHookBody {
  hookType: IdentityHookType;
  eventType: IdentityHookEvent;
  config: IdentityHookConfig;
  meta: IdentityHookMeta;
}

export interface IdentityUpdateHookBody extends IdentityCreateHookBody {
  hookId: string;
}

export interface IdentityListHookParam {
  hookId?: string[];
  eventType?: IdentityHookEvent[];
  hookType?: IdentityHookType[];
}

export interface IdentityListHookResponse {
  page: IBC.Page<IdentityHook>;
}

export interface IdentityRemoveHookBody {
  hookId: string[];
}

export interface IdentityRemoveHookResponse {
  affected: number;
}
