import { JwtUtil } from '@ibootcloud/common-lib';
import { IdentityUserIdentifierType } from './profile';

export interface IdentityConfigSet {
  open_enable?: boolean;
  open_authorization_code_ttl?: number;
  open_access_token_ttl?: number;
  open_refresh_token_ttl?: number;
  open_jwt_algorithm?: JwtUtil.JwtAlgorithm;
  open_access_token_sign_secret?: string;
  open_refresh_token_sign_secret?: string;
  token_access_token_expire?: number;
  token_refresh_token_expire?: number;
  token_jwt_algorithm?: JwtUtil.JwtAlgorithm;
  token_access_token_sign_secret?: string;
  token_refresh_token_sign_secret?: string;
  connect_github_client_id?: string;
  connect_github_client_secret?: string;
  connect_alipay_app_id?: string;
  connect_alipay_app_private_key?: string;
  connect_wechat_app_id?: string;
  connect_wechat_app_secret?: string;
  connect_fresh_user_auto_signup_enable?: boolean;
  endUser_profile_obtain_field?: string[];
  endUser_login_enable?: boolean;
  endUser_passwordless_login_auto_signup_enable?: boolean;
  endUser_logout_enable?: boolean;
  unassigned_identifier_type_match_priority?: IdentityUserIdentifierType[];
  otp_code_ttl?: number;
  magic_token_ttl?: number;
  password_complexity_regex?: string;
}

export interface IdentityGetConfigParam {
  include?: (keyof IdentityConfigSet)[];
}
