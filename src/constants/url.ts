import { ENV, IBCService } from './service';

export const getBaseURL = (
  env: ENV = ENV.PRODUCTION
): Record<IBCService, string> => {
  switch (env) {
    case ENV.PRODUCTION:
      return {
        [IBCService.IBC]: `https://api.app.ibootcloud.com`,
        [IBCService.DATABOX]: `https://api.databox.ibootcloud.com`,
        [IBCService.MICOFUN]: `https://api.micofun.ibootcloud.com`,
        [IBCService.SEARCHABLE]: `https://api.searchable.ibootcloud.com`,
      };
    case ENV.TEST:
      return {
        [IBCService.IBC]: `https://api.app.ibootcloud.com/test`,
        [IBCService.DATABOX]: `https://api.databox.ibootcloud.com/test`,
        [IBCService.MICOFUN]: `https://api.micofun.ibootcloud.com/test`,
        [IBCService.SEARCHABLE]: `https://api.searchable.ibootcloud.com/test`,
      };
    case ENV.DEVELOPMENT:
      return {
        [IBCService.IBC]: `http://127.0.0.1:9000`,
        [IBCService.DATABOX]: `http://127.0.0.1:9000`,
        [IBCService.MICOFUN]: `http://127.0.0.1:9000`,
        [IBCService.SEARCHABLE]: `http://127.0.0.1:9000`,
      };
  }
};
