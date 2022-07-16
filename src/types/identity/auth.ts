import { Profile } from './profile';
import { Micofun } from '../micofun';

export namespace Auth {
  export interface UserTokenPack {
    accessToken: string;
    accessTokenExpired: string;
    refreshToken: string;
    refreshTokenExpired: string;
  }

  export interface EndUserLoginByPasswordBody {
    identifier: string;
    password: string;
    identifierType?: Profile.UserIdentifierType;
  }

  export type EndUserLoginResponse = {
    uid: string;
    token: UserTokenPack;
  };

  export interface PasswordlessLoginTicket {
    instanceId: string;
    identifier: string;
    identifierType: Profile.UserIdentifierType;
    context?: object;
    profile?: object;
  }

  export interface ApplyPasswordlessLoginBody {
    identifier: string;
    identifierType: Profile.UserIdentifierType;
    ttl?: number;
    context?: object;
    profile?: Profile.UserProfile;
  }

  export interface ApplyOTPLoginBody extends ApplyPasswordlessLoginBody {
    type?: Micofun.OTP.Type;
    size?: number;
  }

  export type ApplyOTPLoginResponse = {
    id: string;
    otp: string;
    expired: string;
  };
  export type ApplyMagicTokenLoginResponse = {
    token: string;
    expired: string;
  };

  export interface EndUserOTPLoginBody {
    id: string;
    otp: string;
  }

  export interface EndUserMagicTokenLoginBody {
    token: string;
  }

  export type EndUserPasswordlessLoginResponse = EndUserLoginResponse & {
    context?: object;
  };

  export interface EndUserConnectLoginBody {
    provider: Profile.UserConnectIdentityType;
    ticket: string;
  }

  export interface EndUserRefreshUserTokenParam {
    refreshToken: string;
  }

  export interface EndUserLogoutBody {
    refreshToken: string;
  }

  export interface EndUserLogoutResponse {
    uid: string;
  }

  export interface GenerateUserTokenParam {
    uid: string;
  }

  export type GenerateUserTokenResponse = EndUserLoginResponse;

  export interface InvalidUserTokenBody {
    accessToken?: string[];
    refreshToken?: string[];
  }

  export interface UpdateUserPasswordBody {
    uid: string;
    password: string;
  }
}
