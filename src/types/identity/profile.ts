import { IBC, LANG } from '@ibootcloud/common-lib';

export namespace IdentityProfile {
  export enum Gender {
    UNKNOWN = 'unknown',
    MALE = 'male',
    FEMALE = 'female',
  }

  export enum Status {
    NORMAL = 1,
    LOCKED = 2,
  }
}

export interface IdentityUserProfileAvatar {
  thumbnail?: string;
  origin?: string;
}

export interface IdentityUserProfileLocationCoordinates {
  latitude?: string;
  longitude?: string;
}

export interface IdentityUserProfileLocationTimezone {
  offset?: string;
  description?: string;
}

export interface IdentityUserProfileLocation {
  timezone?: IdentityUserProfileLocationTimezone;
  postalCode?: string;
  address?: string;
  coordinates?: IdentityUserProfileLocationCoordinates;
}

export interface IdentityUserProfileConnectWechat {
  openId?: string;
  unionId?: string;
}

export interface IdentityUserProfileConnectAliPay {
  userId?: string;
}

export interface IdentityUserProfileConnectGithub {
  username?: string;
}

export interface IdentityUserProfileConnect {
  wechat?: IdentityUserProfileConnectWechat;
  alipay?: IdentityUserProfileConnectAliPay;
  github?: IdentityUserProfileConnectGithub;
}

export interface IdentityUserProfileWithoutUID {
  username?: string;
  email?: string;
  mobile?: string;
  displayName?: string;
  avatar?: IdentityUserProfileAvatar;
  tags?: string[];
  language?: LANG;
  location?: IdentityUserProfileLocation;
  lastIp?: string;
  gender?: IdentityProfile.Gender;
  status?: IdentityProfile.Status;
  dob?: string;
  extra?: Record<string, unknown>;
  connect?: IdentityUserProfileConnect;
}

export type IdentityUserProfile = {
  uid?: string;
} & IdentityUserProfileWithoutUID;

export enum IdentityUserCommonIdentifierType {
  USERNAME = 1,
  EMAIL = 2,
  MOBILE = 3,
}

export enum IdentityUserConnectIdentityType {
  WECHAT_UNION_ID = 21,
  WECHAT_OPEN_ID = 22,
  ALIPAY_USER_ID = 23,
  GITHUB_USERNAME = 24,
}

export const IdentityUserIdentifierType = {
  ...IdentityUserCommonIdentifierType,
  ...IdentityUserConnectIdentityType,
};
export type IdentityUserIdentifierType =
  | IdentityUserCommonIdentifierType
  | IdentityUserConnectIdentityType;

export interface IdentityEndUserGetMyProfileParam {
  include?: string[];
  exclude?: string[];
}

export type IdentityEndUserGetMyProfileResponse = IdentityUserProfile;

export interface IdentityCreateUserBody extends IdentityUserProfileWithoutUID {
  password?: string;
}

export type IdentityCreateUserResponse = IdentityUserProfile;

export interface IdentityRemoveUserBody {
  uid: string[];
}

export type IdentityRemoveUserResponse = {
  affected: number;
};

export interface IdentityGetSingleUserProfileParam {
  uid: string;
  include?: string[];
  exclude?: string[];
}

export type IdentityGetSingleUserProfileResponse = IdentityUserProfile;

export interface IdentityEditUserProfileBody {
  uid: string;
  profile: IdentityUserProfileWithoutUID;
}

export interface IdentityGetUserByIdentifierParam {
  identifier: string;
  identifierType?: IdentityUserIdentifierType;
}

export type IdentityGetUserByIdentifierResponse = IdentityUserProfile;

export interface IdentitySearchUserProfileParam {
  uid?: string[];
  query?: string;
  attributesToRetrieve?: string[];
}

export type IdentitySearchUserProfileResponse = {
  page: IBC.Page<IdentityUserProfile>;
};
