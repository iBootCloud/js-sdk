import { AxiosBaseClient } from '../../axios';
import { DataboxModuleClientConfig } from '../index';
import { Databox } from '../../../types';
import { ObjectUtil } from '@ibootcloud/common-lib';

export interface DataboxUIDClientConfig {
  instanceId?: string;
}

export class DataboxUIDClient {
  axios: AxiosBaseClient;

  instanceId?: string;

  constructor(
    moduleClientConfig: DataboxModuleClientConfig,
    { instanceId }: DataboxUIDClientConfig = {}
  ) {
    this.instanceId = instanceId;
    this.axios = new AxiosBaseClient({
      ...moduleClientConfig,
    });
  }

  /**
   * 生成NanoID [V1]
   * POST /v1/uid/generate/nanoid
   * 接口ID：23867249
   * 接口地址：https://www.apifox.cn/web/project/1031456/apis/api-23867249
   */
  async nextNanoID({
    size,
    alphabet,
    global = true,
    instanceId,
  }: Databox.UID.NextNanoIDParam = {}): Promise<string> {
    const response = await this.axios.request<Databox.UID.NextUIDResponse>({
      url: `/v1/uid/generate/nanoid`,
      method: 'POST',
      params: ObjectUtil.removeUndefined({
        size,
        alphabet,
        global,
        instanceId: global ? undefined : instanceId,
      }),
    });
    return response.data!.uid;
  }

  /**
   * 生成UUID [V1]
   * POST /v1/uid/generate/uuid
   * 接口ID：29741367
   * 接口地址：https://www.apifox.cn/web/project/1031456/apis/api-29741367
   */
  async nextUUID({
    simplify,
    global = true,
    instanceId,
  }: Databox.UID.NextUUIDParam = {}): Promise<string> {
    const response = await this.axios.request<Databox.UID.NextUIDResponse>({
      url: `/v1/uid/generate/uuid`,
      method: 'POST',
      params: ObjectUtil.removeUndefined({
        simplify,
        global,
        instanceId: global ? undefined : instanceId,
      }),
    });
    return response.data!.uid;
  }

  /**
   * 生成ObjectID [V1]
   * POST /v1/uid/generate/objectID
   * 接口ID：29741459
   * 接口地址：https://www.apifox.cn/web/project/1031456/apis/api-29741459
   */
  async nextObjectID({
    global = true,
    instanceId,
  }: Databox.UID.NextUIDParam = {}): Promise<string> {
    const response = await this.axios.request<Databox.UID.NextUIDResponse>({
      url: `/v1/uid/generate/objectID`,
      method: 'POST',
      params: ObjectUtil.removeUndefined({
        global,
        instanceId: global ? undefined : instanceId,
      }),
    });
    return response.data!.uid;
  }

  /**
   * 生成Serial [V1]
   * POST /v1/uid/generate/serial
   * 接口ID：29741472
   * 接口地址：https://www.apifox.cn/web/project/1031456/apis/api-29741472
   */
  async nextSerial({
    step,
    global = true,
    instanceId,
  }: Databox.UID.NextSerialParam = {}): Promise<string> {
    const response = await this.axios.request<Databox.UID.NextUIDResponse>({
      url: `/v1/uid/generate/serial`,
      method: 'POST',
      params: ObjectUtil.removeUndefined({
        step,
        global,
        instanceId: global ? undefined : instanceId,
      }),
    });
    return response.data!.uid;
  }
}

export const createUIDClient = (
  moduleClientConfig: DataboxModuleClientConfig,
  uidClientConfig: DataboxUIDClientConfig = {}
): DataboxUIDClient =>
  new DataboxUIDClient(moduleClientConfig, uidClientConfig);
