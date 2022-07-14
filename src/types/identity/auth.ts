import {
  IdentityUserConnectIdentityType,
  IdentityUserIdentifierType,
  IdentityUserProfile,
} from './profile';
import { MicofunOTPType } from '../micofun';

export interface IdentityUserTokenPack {
  accessToken: string;
  accessTokenExpired: string;
  refreshToken: string;
  refreshTokenExpired: string;
}

export interface IdentityEndUserLoginByPasswordBody {
  identifier: string;
  password: string;
  identifierType?: IdentityUserIdentifierType;
}

export type IdentityEndUserLoginResponse = {
  uid: string;
  token: IdentityUserTokenPack;
};

export interface IdentityPasswordlessLoginTicket {
  instanceId: string;
  identifier: string;
  identifierType: IdentityUserIdentifierType;
  context?: object;
  profile?: object;
}

export interface IdentityApplyPasswordlessLoginBody {
  identifier: string;
  identifierType: IdentityUserIdentifierType;
  ttl?: number;
  context?: object;
  profile?: IdentityUserProfile;
}

export interface IdentityApplyOTPLoginBody
  extends IdentityApplyPasswordlessLoginBody {
  type?: MicofunOTPType;
  size?: number;
}

export type IdentityApplyOTPLoginResponse = {
  id: string;
  otp: string;
  expired: string;
};
export type IdentityApplyMagicTokenLoginResponse = {
  token: string;
  expired: string;
};

export interface IdentityEndUserOTPLoginBody {
  id: string;
  otp: string;
}

export interface IdentityEndUserMagicTokenLoginBody {
  token: string;
}

export type IdentityEndUserPasswordlessLoginResponse = IdentityEndUserLoginResponse & {
  context?: object;
};

export interface IdentityEndUserConnectLoginBody {
  provider: IdentityUserConnectIdentityType;
  ticket: string;
}

export interface IdentityEndUserRefreshUserTokenParam {
  refreshToken: string;
}

export interface IdentityEndUserLogoutBody {
  refreshToken: string;
}

export interface IdentityEndUserLogoutResponse {
  uid: string;
}

export interface IdentityGenerateUserTokenParam {
  uid: string;
}

export type IdentityGenerateUserTokenResponse = IdentityEndUserLoginResponse;

export interface IdentityInvalidUserTokenBody {
  accessToken?: string[];
  refreshToken?: string[];
}

export interface IdentityUpdateUserPasswordBody {
  uid: string;
  password: string;
}
