import { IBC } from '@ibootcloud/common-lib';

export namespace Hook {
  export class WebHookConfig {
    endpoint?: string;
    headers?: Record<string, string>;
  }

  export type HookConfig = WebHookConfig;

  export interface Hook {
    hookId?: string;
    hookType?: HookType;
    eventType?: HookEvent;
    config?: HookConfig;
    meta?: HookMeta;
  }

  export enum HookEvent {
    LOGIN = 1,
    LOGOUT = 2,
    REFRESH_TOKEN = 3,
  }

  export enum HookType {
    WEBHOOK = 1,
  }

  export interface HookMeta {
    name?: string;
    description?: string;
  }

  export interface CreateHookBody {
    hookType: HookType;
    eventType: HookEvent;
    config: HookConfig;
    meta: HookMeta;
  }

  export interface UpdateHookBody extends CreateHookBody {
    hookId: string;
  }

  export interface ListHookParam {
    hookId?: string[];
    eventType?: HookEvent[];
    hookType?: HookType[];
  }

  export interface ListHookResponse {
    page: IBC.Page<Hook>;
  }

  export interface RemoveHookBody {
    hookId: string[];
  }

  export interface RemoveHookResponse {
    affected: number;
  }
}
