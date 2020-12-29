import layoutHeaderAside from '@/layout/header-aside'

// 由于懒加载页面太多的话会造成webpack热更新太慢，所以开发环境不使用懒加载，只有生产环境使用懒加载
const _import = require('@/libs/util.import.' + process.env.NODE_ENV)

const meta = {
  auth: true
}

export default {
  path: '/materiel',
  name: 'materiel',
  meta,
  redirect: {
    name: 'materiel'
  },
  component: layoutHeaderAside,
  children: (pre => [{
    path: `list`,
    name: `${pre}list`,
    component: () => import('@/views/materiel/mat-list/index'),
    meta: {
      ...meta,
      title: '物料列表'
    }
  },
  {
    path: 'cate',
    name: `${pre}materiel-list`,
    component: () => import('@/views/materiel/mat-cate/index'),
    meta: {
      ...meta,
      title: '物料分类'
    }
  }
  ])('info-')
}
