// import layoutHeaderAside from '@/layout/header-aside'

// // 由于懒加载页面太多的话会造成webpack热更新太慢，所以开发环境不使用懒加载，只有生产环境使用懒加载
// const _import = require('@/libs/util.import.' + process.env.NODE_ENV)

// const meta = { auth: true }

// export default {
//   path: '/user',
//   name: 'user',
//   meta,
//   redirect: { name: 'user' },
//   component: layoutHeaderAside,
//   children: (pre => [
//     {
//       path: 'lists',
//       name: `${pre}lists`,
//       component: () => import('@/views/user/lists'),
//       meta: {
//         ...meta,
//         title: '用户列表'
//       }
//     },
//   ])('user-')
// }
