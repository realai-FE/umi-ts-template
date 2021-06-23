import { extend } from 'umi-request';
import { message } from 'antd';
import requestConfig from '../../config/request.rc';

type responseConfig = {
  code: number;
  msg: string;
  data: { [x: string]: any };
};
// const codeMessage: Record<number, string> = {
//   200: '服务器成功返回请求的数据。',
//   201: '新建或修改数据成功。',
//   202: '一个请求已经进入后台排队（异步任务）。',
//   204: '删除数据成功。',
//   400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
//   401: '用户没有权限（令牌、用户名、密码错误）。',
//   403: '用户得到授权，但是访问是被禁止的。',
//   404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
//   406: '请求的格式不可得。',
//   410: '请求的资源被永久删除，且不会再得到的。',
//   422: '当创建一个对象时，发生一个验证错误。',
//   500: '服务器发生错误，请检查服务器。',
//   502: '网关错误。',
//   503: '服务不可用，服务器暂时过载或维护。',
//   504: '网关超时。',
// };

// /** 异常处理程序 */

// const errorHandler = (error: { response: Response }): Response => {
//   const { response } = error;
//   if (response && response.status) {
//     const errorText = codeMessage[response.status] || response.statusText;
//     const { status, url } = response;

//     // eslint-disable-next-line no-console
//     console.error({
//       message: `请求错误 ${status}: ${url}`,
//       description: errorText,
//     });
//   } else if (!response) {
//     // eslint-disable-next-line no-console
//     console.error({
//       description: '接口网络发生异常，请重试',
//       message: '网络异常',
//     });
//   }
//   return response;
// };
const { devPrefix = '', prodPrefix = '', ...restConfig } = requestConfig;
const prefix = process.env.NODE_ENV === 'development' ? devPrefix : prodPrefix;

const extendConfig: Record<string, any> = {
  ...restConfig,
};

/** 配置request请求时的默认参数 */
const request = extend({
  // errorHandler, // 默认错误处理
  ...extendConfig,
});
// 拦截请求，对@前缀请求不增加前缀，支持代理多种服务器
request.interceptors.request.use((url, options) => {
  let tranUrl = url;
  const reg = /^\/@(\w+)\//;
  tranUrl = tranUrl.match(reg)
    ? tranUrl.replace(reg, '/$1/')
    : `${prefix}${tranUrl}`;
  return {
    url: tranUrl,
    options,
  };
});

request.interceptors.response.use(async (response) => {
  const res: responseConfig = await response.clone().json();
  if (res?.code !== 0) {
    return message.warn(res.msg);
  }
  return res.data;
});

export default request;
