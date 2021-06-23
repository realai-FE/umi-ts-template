export { default as request } from './request';
export interface Callback {
  (args?: any[]): void;
}
export function debounce(callback: Callback, delay: number) {
  let timer: any;

  return (...args: any[]) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      callback(args);
    }, delay);
  };
}
// 类型检测
export const isType = (value: any, type: string): boolean => {
  const toString = {}.toString;
  return toString.call(value) === '[object ' + type + ']';
};

export const clone = (source: Object) => {
  if (!source) {
    return source;
  }
  const target: any = {};
  for (let k in source) {
    // @ts-ignore
    target[k] = source[k];
  }
  return target;
};
