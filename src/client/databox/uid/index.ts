import { AxiosBaseClient } from '../../axios';
import { CreateModuleClientConfig } from '../index';
import { IDType, NextUIDResponse } from '../../../types/databox/uid.dto';
import { ObjectUtil } from '@ibootcloud/common-lib';

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
     */
    generate: async (
      type?: IDType,
      opt?: { size?: number; alphabet?: string }
    ): Promise<string> => {
      const response = await axios.request<NextUIDResponse>({
        url: `/v1/uid/generate`,
        method: 'POST',
        params: ObjectUtil.removeEmpty({
          type: type ?? idType,
          ...opt,
        }),
      });
      return response.data!.uid;
    },
  };
};
