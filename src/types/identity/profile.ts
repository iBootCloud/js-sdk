import { IBC, LANG } from '@ibootcloud/common-lib';

export namespace Profile {
  export enum Gender {
    UNKNOWN = 'unknown',
    MALE = 'male',
    FEMALE = 'female',
  }

  export enum Status {
    NORMAL = 1,
    LOCKED = 2,
  }

  export interface UserProfileAvatar {
    thumbnail?: string;
    origin?: string;
  }

  export interface UserProfileLocationCoordinates {
    latitude?: string;
    longitude?: string;
  }

  export interface UserProfileLocationTimezone {
    offset?: string;
    description?: string;
  }

  export interface UserProfileLocation {
    timezone?: UserProfileLocationTimezone;
    postalCode?: string;
    address?: string;
    coordinates?: UserProfileLocationCoordinates;
  }

  export interface UserProfileConnectWechat {
    openId?: string;
    unionId?: string;
  }

  export interface UserProfileConnectAliPay {
    userId?: string;
  }

  export interface UserProfileConnectGithub {
    username?: string;
  }

  export interface UserProfileConnect {
    wechat?: UserProfileConnectWechat;
    alipay?: UserProfileConnectAliPay;
    github?: UserProfileConnectGithub;
  }

  export interface UserProfileWithoutUID {
    username?: string;
    email?: string;
    mobile?: string;
    displayName?: string;
    avatar?: UserProfileAvatar;
    tags?: string[];
    language?: LANG;
    location?: UserProfileLocation;
    lastIp?: string;
    gender?: Profile.Gender;
    status?: Profile.Status;
    dob?: string;
    extra?: Record<string, unknown>;
    connect?: UserProfileConnect;
  }

  export type UserProfile = {
    uid?: string;
  } & UserProfileWithoutUID;

  export enum UserCommonIdentifierType {
    USERNAME = 1,
    EMAIL = 2,
    MOBILE = 3,
  }

  export enum UserConnectIdentityType {
    WECHAT_UNION_ID = 21,
    WECHAT_OPEN_ID = 22,
    ALIPAY_USER_ID = 23,
    GITHUB_USERNAME = 24,
  }

  export const UserIdentifierType = {
    ...UserCommonIdentifierType,
    ...UserConnectIdentityType,
  };
  export type UserIdentifierType =
    | UserCommonIdentifierType
    | UserConnectIdentityType;

  export interface EndUserGetMyProfileParam {
    include?: string[];
    exclude?: string[];
  }

  export type EndUserGetMyProfileResponse = UserProfile;

  export interface CreateUserBody extends UserProfileWithoutUID {
    password?: string;
  }

  export type CreateUserResponse = UserProfile;

  export interface RemoveUserBody {
    uid: string[];
  }

  export type RemoveUserResponse = {
    affected: number;
  };

  export interface GetSingleUserProfileParam {
    uid: string;
    include?: string[];
    exclude?: string[];
  }

  export type GetSingleUserProfileResponse = UserProfile;

  export interface EditUserProfileBody {
    uid: string;
    profile: UserProfileWithoutUID;
  }

  export interface GetUserByIdentifierParam {
    identifier: string;
    identifierType?: UserIdentifierType;
  }

  export type GetUserByIdentifierResponse = UserProfile;

  export interface SearchUserProfileParam {
    uid?: string[];
    query?: string;
    attributesToRetrieve?: string[];
  }

  export type SearchUserProfileResponse = {
    page: IBC.Page<UserProfile>;
  };
}
