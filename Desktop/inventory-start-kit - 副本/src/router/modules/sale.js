import layoutHeaderAside from '@/layout/header-aside'
import store from '@/store/index'
// 由于懒加载页面太多的话会造成webpack热更新太慢，所以开发环境不使用懒加载，只有生产环境使用懒加载
const _import = require('@/libs/util.import.' + process.env.NODE_ENV)

const meta = {
    auth: true
}

export default {
    path: '/sale',
    name: 'sale',
    meta,
    redirect: {
        name: 'sale'
    },
    component: layoutHeaderAside,
    children: (pre => [{
            // 新建销售订单
            path: `addOrder`,
            name: `${pre}addOrder`,
            component: () => import('@/views/sale/addOrder/index'),
            meta: {
                ...meta,
                title: '新建销售订单'
            }
        },
        {
            // 销售订单列表
            path: `orderList`,
            name: `${pre}orderList`,
            component: () => import('@/views/sale/orderList/index'),
            meta: {
                ...meta,
                title: '销售订单列表',
                cache: true
            }
        },
        {
            // 出库导入
            path: `delivery`,
            name: `${pre}delivery`,
            component: () => import('@/views/sale/delivery/index'),
            meta: {
                ...meta,
                title: '出库导入'
            },
            beforeEnter(to, from, next) {
                // 判断vuex中是否点击了出库。
                if (store.state.d2admin.sale.deliveryStatus == false) {
                    // 点击了出库，判断从哪个页面过来的。如果是从销售订单列表页面过来的就跳转到首页，如果不是则跳转到销售订单列表页
                    if (from.name == 'sale-orderList') {
                        next('/')
                    } else {
                        next('/sale/orderList')
                    }
                } else {
                    next()
                }
            }
        },

        //'出库设备列表'
        {
            path: `deliveryList`,
            name: `${pre}deliveryList`,
            component: () => import('@/views/sale/deliveryList/index'),
            meta: {
                ...meta,
                title: '出库设备列表'
            }
        },

    ])('sale-')
}
