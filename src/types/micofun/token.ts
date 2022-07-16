export namespace Token {
  export namespace MagicToken {
    export interface GenerateMagicTokenBody {
      context: string | object;
      ttl?: number;
    }

    export type GenerateMagicTokenResponse = {
      token: string;
    };

    export interface ValidateMagicTokenBody {
      token: string;
      removeOnPass?: boolean;
    }

    export type ValidateMagicTokenResponse = {
      pass: boolean;
      context?: string | object;
    };
  }

}
