import { IdentityUserProfile } from './profile';
import { IdentityUserTokenPack } from './auth';
import { IBC } from '@ibootcloud/common-lib';

export interface IdentityOpenClientMeta {
  name?: string;
  description?: string;
}

export interface IdentityOpenThirdpartyClient {
  clientId?: string;
  enable?: boolean;
  clientSecret?: string;
  meta?: IdentityOpenClientMeta;
  scope?: string[];
}

export interface IdentityOpenUser {
  uid?: string;
  openId?: string;
  clientId?: string;
}

export interface IdentityOAuthCodeInfo {
  instanceId: string;
  clientId: string;
  uid: string;
  scope: string[];
}

export interface IdentityOpenTokenPayload {
  instanceId: string;
  clientId: string;
  openId: string;
  scope: string[];
}

export interface IdentityOpenClientRequestTokenParam {
  instanceId: string;
  client_id: string;
  client_secret: string;
  grant_type: string;
  code: string;
}

export interface IdentityOpenClientRequestTokenResponse {
  openId: string;
  scope: string[];
  token: IdentityUserTokenPack;
}

export interface IdentityOpenClientRequestUserResponse {
  openId: string;
  instanceId: string;
  profile: IdentityUserProfile;
}

export interface IdentityGenOauthCodeParam {
  clientId: string;
  uid: string;
  scope: string[];
}

export interface IdentityGenOauthCodeResponse {
  code: string;
}

export interface IdentityCreateOpenClientBody {
  scope?: string[];
  enable?: boolean;
  meta?: IdentityOpenClientMeta;
}

export interface IdentityRemoveOpenClientBody {
  clientId?: string[];
}

export interface IdentityRemoveOpenClientResponse {
  affected: number;
}

export interface IdentityUpdateOpenClientBody {
  clientId: string;
  enable?: boolean;
  meta?: IdentityOpenClientMeta;
  scope?: string[];
}

export interface IdentityListOpenClientParam {
  enable?: boolean;
  clientId?: string[];
  scope?: string[];
}

export interface IdentityListOpenClientsResponse {
  page: IBC.Page<IdentityOpenThirdpartyClient>;
}

export interface IdentityGetOpenClientParam {
  clientId: string;
}

export interface IdentityOpenRefreshTokenBody {
  clientId: string;
  refreshToken: string;
}
