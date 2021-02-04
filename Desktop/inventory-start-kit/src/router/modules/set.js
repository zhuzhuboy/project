import layoutHeaderAside from '@/layout/header-aside'
import store from '@/store/index'
// 由于懒加载页面太多的话会造成webpack热更新太慢，所以开发环境不使用懒加载，只有生产环境使用懒加载
const _import = require('@/libs/util.import.' + process.env.NODE_ENV)

const meta = {
    auth: true
}

export default {
    path: '/set',
    name: 'set',
    meta,
    redirect: {
        name: 'set-info-supplier-list'
    },
    component: layoutHeaderAside,
    children: (pre => [{
            path: `info/supplier/list`,
            name: `${pre}info-supplier-list`,
            component: () => import('@/views/info/supplier/index'),
            meta: {
                ...meta,
                title: '供应商列表'
            }
        },
        {
            path: 'info/warehouse/list',
            name: `${pre}info-warehouse-list`,
            component: () => import('@/views/info/warehouse/index'),
            meta: {
                ...meta,
                title: '仓库列表'
            }
        },
        {
            path: `materiel/list`,
            name: `${pre}materiel-list`,
            component: () => import('@/views/materiel/mat-list/index'),
            meta: {
                ...meta,
                title: '原始物料列表'
            }
        },
        {
            path: 'materiel/cate',
            name: `${pre}materiel-materiel-list`,
            component: () => import('@/views/materiel/mat-cate/index'),
            meta: {
                ...meta,
                title: '原始物料分类'
            }
        },
        {
            path: `customer/list`,
            name: `${pre}customer-list`,
            component: () => import('@/views/customer/customerList/index'),
            meta: {
                ...meta,
                title: '客户列表'
            }
        },
        {
            path: `customer/importCustomer`,
            name: `${pre}importCustomer`,
            component: () => import('@/views/customer/importCustomer/index'),
            meta: {
                ...meta,
                title: '导入客户'
            }
        }

    ])('set-')
}
