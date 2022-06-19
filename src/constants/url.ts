import { ENV, Service } from './service';

export const getBaseURL = (env?: ENV): Record<Service, string> => {
  switch (env) {
    case ENV.PRODUCTION:
      return {
        [Service.IBC]: `https://api.app.ibootcloud.com`,
        [Service.DATABOX]: `https://api.databox.ibootcloud.com`,
        [Service.MICOFUN]: `https://api.micofun.ibootcloud.com`,
      };
    case ENV.TEST:
      return {
        [Service.IBC]: `https://api.app.ibootcloud.com/test`,
        [Service.DATABOX]: `https://api.databox.ibootcloud.com/test`,
        [Service.MICOFUN]: `https://api.micofun.ibootcloud.com/test`,
      };
    case ENV.DEVELOPMENT:
      return {
        [Service.IBC]: `http://127.0.0.1:9000`,
        [Service.DATABOX]: `http://127.0.0.1:9000`,
        [Service.MICOFUN]: `http://127.0.0.1:9000`,
      };
    default:
      return {
        [Service.IBC]: `https://api.app.ibootcloud.com`,
        [Service.DATABOX]: `https://api.databox.ibootcloud.com`,
        [Service.MICOFUN]: `https://api.micofun.ibootcloud.com`,
      };
  }
};
