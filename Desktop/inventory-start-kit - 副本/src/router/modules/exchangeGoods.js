import layoutHeaderAside from '@/layout/header-aside'

// 由于懒加载页面太多的话会造成webpack热更新太慢，所以开发环境不使用懒加载，只有生产环境使用懒加载
const _import = require('@/libs/util.import.' + process.env.NODE_ENV)

const meta = {
    auth: true
}

export default {
    path: '/exchangeGoods',
    name: 'exchangeGoods',
    meta,
    redirect: {
        name: 'exchangeGoods'
    },
    component: layoutHeaderAside,
    children: (pre => [{
            path: `scanExchange`,
            name: `${pre}scanExchange`,
            component: () => import('@/views/exchangeGoods/scanExchange/index'),
            meta: {
                ...meta,
                title: '扫码换货'
            },
        },
        {
            path: 'exchangeGoodsList',
            name: `${pre}exchangeGoodsList`,
            component: () => import('@/views/exchangeGoods/exchangeGoodsList/index'),
            meta: {
                ...meta,
                title: '换货列表'
            }
        },
        {
            path: `returnToWarehouse`,
            name: `${pre}returnToWarehouse`,
            component: () => import('@/views/exchangeGoods/returnToWarehouse/index'),
            meta: {
                ...meta,
                title: '退货入库列表'
            }
        },
        {
            path: `addReturnReceipt`,
            name: `${pre}addReturnReceipt`,
            component: () => import('@/views/exchangeGoods/addReturnReceipt/index'),
            meta: {
                ...meta,
                title: '退货入库单'
            }
        },
        {
            path: `addScanReturn`,
            name: `${pre}addScanReturn`,
            component: () => import('@/views/exchangeGoods/addScanReturn/index'),
            meta: {
                ...meta,
                title: '扫码退货'
            }
        },
        {
            path: `retDeviceList`,
            name: `${pre}retDeviceList`,
            component: () => import('@/views/exchangeGoods/retDeviceList/index'),
            meta: {
                ...meta,
                title: '退货设备列表'
            },

        }
    ])('info-')
}
