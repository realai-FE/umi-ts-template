import { defineConfig } from 'umi';
import routes from './config/routes';
import proxy from './config/proxy';
import defaultSettings from './config/defaultSettings';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  routes,
  proxy,
  fastRefresh: {},
  ...defaultSettings,
});
