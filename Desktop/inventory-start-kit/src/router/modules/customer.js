import layoutHeaderAside from '@/layout/header-aside'

// 由于懒加载页面太多的话会造成webpack热更新太慢，所以开发环境不使用懒加载，只有生产环境使用懒加载
const _import = require('@/libs/util.import.' + process.env.NODE_ENV)

const meta = {
    auth: true
}

export default {
    path: '/customer',
    name: 'customer',
    meta,
    redirect: {
        name: 'customer-list'
    },
    component: layoutHeaderAside,
    children: (pre => [{
            path: `list`,
            name: `${pre}list`,
            component: () => import('@/views/customer/customerList/index'),
            meta: {
                ...meta,
                title: '客户列表'
            }
        },
        {
            path: `importCustomer`,
            name: `${pre}importCustomer`,
            component: () => import('@/views/customer/importCustomer/index'),
            meta: {
                ...meta,
                title: '导入客户'
            }
        }


    ])('customer-')
}
