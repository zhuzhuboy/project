import layoutHeaderAside from '@/layout/header-aside'

// 由于懒加载页面太多的话会造成webpack热更新太慢，所以开发环境不使用懒加载，只有生产环境使用懒加载
const _import = require('@/libs/util.import.' + process.env.NODE_ENV)

const meta = {
    auth: true
}

export default {
    path: '/finishedProduct',
    name: 'finishedProduct',
    meta,
    redirect: {
        name: 'finishedProduct'
    },
    component: layoutHeaderAside,
    children: (pre => [{
            path: `list`,
            name: `${pre}list`,
            component: () => import('@/views/finishedProduct/productList/index'),
            meta: {
                ...meta,
                title: '成品列表'
            }
        },
        {
            path: 'synthesis',
            name: `${pre}synthesis`,
            component: () => import('@/views/finishedProduct/synthesisProduct/index'),
            meta: {
                ...meta,
                title: '合并成品'
            }
        }

    ])('finishedProduct-')
}
