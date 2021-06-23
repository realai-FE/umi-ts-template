export default [
  {
    path: '/',
    component: '@/layouts/index',
    routes: [
      { path: '/', redirect: '/group' },
      { path: '/group', component: '@/pages/GroupAnalysis' },
      { path: '/third-party', component: '@/pages/ThirdAnalysis' },
    ],
  },
];
