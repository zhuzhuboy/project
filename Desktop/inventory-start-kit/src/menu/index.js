// 信息栏
import info from './modules/info'
// 物料
import materiel from './modules/materiel'
// 采购
import purchase from './modules/purchase'
// 销售
import sale from './modules/sale'
// 成品
import finishedProduct from './modules/finishedProduct'
// 退换货
import exchangeGoods from './modules/exchangeGoods'
// 客户
import customer from './modules/customer'
// 客户
import set from './modules/set'
// 菜单 侧边栏
export const menuAside = [
    purchase,
    sale,
    finishedProduct,
    exchangeGoods,
    set
]

// 菜单 顶栏
export const menuHeader = [{
        path: '/index',
        title: '首页',
        icon: 'home'
    },
    purchase,
    sale,
    finishedProduct,
    exchangeGoods,
    set
]
