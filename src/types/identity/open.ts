import { Auth } from './auth';
import { Profile } from './profile';
import { IBC } from '@ibootcloud/common-lib';

export namespace Open {
  export interface OpenClientMeta {
    name?: string;
    description?: string;
  }

  export interface OpenThirdpartyClient {
    clientId?: string;
    enable?: boolean;
    clientSecret?: string;
    meta?: OpenClientMeta;
    scope?: string[];
  }

  export interface OpenUser {
    uid?: string;
    openId?: string;
    clientId?: string;
  }

  export interface OAuthCodeInfo {
    instanceId: string;
    clientId: string;
    uid: string;
    scope: string[];
  }

  export interface OpenTokenPayload {
    instanceId: string;
    clientId: string;
    openId: string;
    scope: string[];
  }

  export interface OpenClientRequestTokenParam {
    instanceId: string;
    client_id: string;
    client_secret: string;
    grant_type: string;
    code: string;
  }

  export interface OpenClientRequestTokenResponse {
    openId: string;
    scope: string[];
    token: Auth.UserTokenPack;
  }

  export interface OpenClientRequestUserResponse {
    openId: string;
    instanceId: string;
    profile: Profile.UserProfile;
  }

  export interface GenOauthCodeParam {
    clientId: string;
    uid: string;
    scope: string[];
  }

  export interface GenOauthCodeResponse {
    code: string;
  }

  export interface CreateOpenClientBody {
    scope?: string[];
    enable?: boolean;
    meta?: OpenClientMeta;
  }

  export interface RemoveOpenClientBody {
    clientId?: string[];
  }

  export interface RemoveOpenClientResponse {
    affected: number;
  }

  export interface UpdateOpenClientBody {
    clientId: string;
    enable?: boolean;
    meta?: OpenClientMeta;
    scope?: string[];
  }

  export interface ListOpenClientParam {
    enable?: boolean;
    clientId?: string[];
    scope?: string[];
  }

  export interface ListOpenClientsResponse {
    page: IBC.Page<OpenThirdpartyClient>;
  }

  export interface GetOpenClientParam {
    clientId: string;
  }

  export interface OpenRefreshTokenBody {
    clientId: string;
    refreshToken: string;
  }
}
