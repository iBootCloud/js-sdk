export interface MicofunGenerateMagicTokenBody {
  context: string | object;
  ttl?: number;
}
export type MicofunGenerateMagicTokenResponse = {
  token: string;
};
export interface MicofunValidateMagicTokenBody {
  token: string;
  removeOnPass?: boolean;
}
export type MicofunValidateMagicTokenResponse = {
  pass: boolean;
  context?: string | object;
};
