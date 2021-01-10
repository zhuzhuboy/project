import layoutHeaderAside from '@/layout/header-aside'

// 由于懒加载页面太多的话会造成webpack热更新太慢，所以开发环境不使用懒加载，只有生产环境使用懒加载
const _import = require('@/libs/util.import.' + process.env.NODE_ENV)

const meta = {
    auth: true
}

export default {
    path: '/purchase',
    name: 'purchase',
    meta,
    redirect: {
        name: 'purchase'
    },
    component: layoutHeaderAside,
    children: (pre => [{
            path: `warehousing`,
            name: `${pre}warehousing`,
            component: () => import('@/views/purchase/warehousing/index'),
            meta: {
                ...meta,
                title: '采购订单列表'
            }
        },
        {
            path: `add`,
            name: `${pre}add`,
            component: () => import('@/views/purchase/addWare/index'),
            meta: {
                ...meta,
                title: '新建采购入库 '
            }
        },
        {
            path: `tbImport`,
            name: `${pre}tbImport`,
            component: () => import('@/views/purchase/tbImport/index'),
            meta: {
                ...meta,
                title: '入库导入'
            }
        },

        {
            path: `stockList`,
            name: `${pre}stockList`,
            component: () => import('@/views/purchase/stock-list/index'),
            meta: {
                ...meta,
                title: '库存设备列表'
            }
        },


    ])('purchase-')
}
