import { AxiosBaseClient } from '../../axios';
import { MedifyModuleClientConfig } from '../index';
import { Medify } from '../../../types/medify';

export class MedifyImgClient {
  axios: AxiosBaseClient;

  constructor(moduleClientConfig: MedifyModuleClientConfig) {
    this.axios = new AxiosBaseClient({
      ...moduleClientConfig,
    });
  }

  /**
   * 上传图片 【V1】
   * POST /v1/img/upload
   * 接口ID：26881613
   * 接口地址：https://www.apifox.cn/web/project/1031456/apis/api-26881613
   */
  async upload(img: ArrayBuffer, ext: string): Promise<string> {
    const FormData = require('form-data'); // npm install --save form-data
    const form = new FormData();
    form.append('file', img, `uploaded.${ext}`);
    const response = await this.axios.request<
      Medify.Img.SingleImgUploadResponse
    >({
      url: `/v1/img/upload`,
      method: 'POST',
      // 表单上传文件
      headers: { ...form.getHeaders() },
      data: form,
    });
    return response.data!.url;
  }
}

export const createImgClient = (
  moduleClientConfig: MedifyModuleClientConfig
): MedifyImgClient => new MedifyImgClient(moduleClientConfig);
