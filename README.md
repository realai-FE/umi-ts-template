# umi-ts-template
A template base Umijs
## Getting Started

Install dependencies,

```bash
$ yarn
```

Start the dev server,

```bash
$ yarn start
```

## 文件结构

```
├── config // 配置文件
├── mock // mock数据
├── public // 静态资源
└── src // 开发目录
```

### 配置文件
关注点分离，所以把一些常见的配置按照功能模块抽离了出来
```
./config
├── defaultSettings.ts // 一些umi的透传配置
├── proxy.ts  // 代理服务器配置
├── request.rc.ts // 请求配置文件
└── routes.ts // 路由配置文件
```
### 开发
```
./src
├── api // api资源
├── components
│   ├── Container // 适配组件
│   ├── Header
│   └── demo
├── hooks // hooks
├── layouts // 布局
├── pages // 路由级页面
│   ├── GroupAnalysis
│   └── ThirdAnalysis
└── utils // 工具集合
```
#### 请求
api文件目录是请求资源统一的放置目录
###
请求是根据[umi-request](https://github.com/umijs/umi-request)进行二次封装,详情请见src/utils/request.ts,请求对错误进行了统一处理及弹窗，同时直接返回业务层对象（与后端约定code为0的data）,request.rc.ts的配置是透传umi-request的配置，同时增加了前缀处理（主要是为了代理不同的服务器）
###
有这样的场景，
1. 我们新开发的新项目，此时我们需要全部代理到我们的mock服务器，那我们需要配置
   ###
   ps: 前缀是统一加到最前面
```
export default {
  devPrefix: '/mock', // 开发环境prefix
  prodPrefix: '/api', // 生产环境 prefix
  credentials: 'include', // 默认请求是否带上cookie
};
```
2. 如果我们对既有项目进行新需求开发，我们希望项目代理到既有的环境保证开发环境正常跑起，也需要新业务需求代理到我们的mock服务器（此时后端接口还没写完），联调时我们如果和多人合作我们也需要同时代理多个环境本地调试，二次封装的request做了处理
   我们只需在proxy.ts配好代理服务器，书写方法是我们加上“/@代理服务器的匹配路径”（ps: 只对开发环境生效）
   例如：
   ```
   import { request } from '@/utils';
   // 这时自动转化为/mock/list
   export const getList = () => request.get('/@mock/list')
   ```
   
   请求也封装了轮询请求，封装在src/hooks/useFetchInterval.ts,它提供深比较数据的更新，及更新后的回调功能
   ```
   // wait没有传是普通请求
   const data = useFetchInterval(requsestApi, wait, {
     callback
   })
   ```

#### 适配
通过scale进行响应式适配，相应方法封装在src/components/Container
**适配了16：9的屏幕，支持大屏和小屏（普通PC和笔记本电脑），如果比例大于（16：9），会居中，两边由背景填充**
