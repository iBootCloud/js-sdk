import { Profile as _Profile } from './profile';
import { Hook as _Hook } from './Hook';
import { Config as _Config } from './config';
import { Open as _Open } from './open';
import { Auth as _Auth } from './auth';

export namespace Identity {
  export interface EndUserRequestParam {
    accessToken?: string;
  }

  export import Profile = _Profile;
  export import Hook = _Hook;
  export import Config = _Config;
  export import Open = _Open;
  export import Auth = _Auth;
}
