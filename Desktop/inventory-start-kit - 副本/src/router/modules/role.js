import layoutHeaderAside from '@/layout/header-aside'

// 由于懒加载页面太多的话会造成webpack热更新太慢，所以开发环境不使用懒加载，只有生产环境使用懒加载
const _import = require('@/libs/util.import.' + process.env.NODE_ENV)

const meta = {
    auth: true
}

export default {
    path: '/role',
    name: 'role',
    meta,
    redirect: {
        name: 'role'
    },
    component: layoutHeaderAside,
    children: (pre => [{
            path: `routerList`,
            name: `${pre}routerList`,
            component: () => import('@/views/role/routerList/index'),
            meta: {
                ...meta,
                title: '权限列表'
            }
        },
        {
            path: `groupList`,
            name: `${pre}groupList`,
            component: () => import('@/views/role/groupList/index'),
            meta: {
                ...meta,
                title: '分组列表'
            }
        },
        {
            path: `adminAccount`,
            name: `${pre}adminAccount`,
            component: () => import('@/views/role/adminAccount/index'),
            meta: {
                ...meta,
                title: '管理账户'
            }
        }

        // {
        //     path: 'warehouse/list',
        //     name: `${pre}warehouse-list`,
        //     component: () => import('@/views/role/warehouse/index'),
        //     meta: {
        //         ...meta,
        //         title: '仓库列表'
        //     }
        // }

    ])('role-')
}
