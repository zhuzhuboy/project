import layoutHeaderAside from '@/layout/header-aside'

// 由于懒加载页面太多的话会造成webpack热更新太慢，所以开发环境不使用懒加载，只有生产环境使用懒加载
const _import = require('@/libs/util.import.' + process.env.NODE_ENV)

const meta = {
  auth: true
}

export default {
  path: '/info',
  name: 'info',
  meta,
  redirect: {
    name: 'info'
  },
  component: layoutHeaderAside,
  children: (pre => [{
    path: `supplier/list`,
    name: `${pre}supplier-list`,
    component: () => import('@/views/info/supplier/index'),
    meta: {
      ...meta,
      title: '供应商列表'
    }
  },
  {
    path: 'warehouse/list',
    name: `${pre}warehouse-list`,
    component: () => import('@/views/info/warehouse/index'),
    meta: {
      ...meta,
      title: '仓库列表'
    }
  }

  ])('info-')
}
