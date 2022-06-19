import { AxiosBaseClient } from '../../axios';
import { CreateModuleClientConfig } from '../index';
import { IDType, NextUIDResponse } from '../../../types/databox/uid.dto';

export interface UIDClientConfig {
  type?: IDType;
}

export const createUIDClient = (
  moduleClientConfig: CreateModuleClientConfig,
  { type: idType = IDType.UUID }: UIDClientConfig = {}
) => {
  const axios = new AxiosBaseClient({
    ...moduleClientConfig,
  });
  return {
    /**
     * 生成UID [V1]
     * POST /v1/uid/generate
     * 接口ID：23867249
     * 接口地址：https://www.apifox.cn/web/project/1031456/apis/api-23867249
     * @param type ID类型：
     * 1: 自增ID
     * 2: NanoID
     * 3: UUID
     */
    generate: async (type?: IDType): Promise<string> => {
      const response = await axios.request<NextUIDResponse>({
        url: `/v1/uid/generate`,
        method: 'POST',
        params: {
          type: type ?? idType,
        },
      });
      return response.data!.uid;
    },
  };
};
