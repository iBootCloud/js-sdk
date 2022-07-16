import { IBC } from '@ibootcloud/common-lib';

export namespace Url {
  export namespace Shorten {
    export interface ShortenUrlBody {
      url: string;
    }

    export interface ShortenUrlResponse {
      shortenId: string;
    }

    export interface ConvertShortenUrlResponse {
      destinationUrl: string;
    }

    export interface ShortenUrlInfo {
      shortenId: string;
      destinationUrl: string;
      hits: number;
    }

    export interface ListShortenUrlResponse {
      page: IBC.Page<ShortenUrlInfo>;
    }
  }
}
