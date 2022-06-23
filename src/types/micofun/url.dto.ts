import { IBC } from '@ibootcloud/common-lib';
export interface MicofunUrlShortenUrlBody {
  url: string;
}
export interface MicofunUrlShortenUrlResponse {
  shortenId: string;
}
export interface MicofunUrlConvertShortenUrlResponse {
  destinationUrl: string;
}
export interface MicofunUrlShortenUrlInfo {
  shortenId: string;
  destinationUrl: string;
  hits: number;
}
export interface MicofunUrlListShortenUrlResponse {
  page: IBC.Page<MicofunUrlShortenUrlInfo>;
}
