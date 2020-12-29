// 信息栏
import info from './modules/info'
// 物料
import materiel from './modules/materiel'

// 采购
import purchase from './modules/purchase'

// 菜单 侧边栏
export const menuAside = [
  info,
  materiel,
  purchase
]

// 菜单 顶栏
export const menuHeader = [{
  path: '/index',
  title: '首页',
  icon: 'home'
},
info,
materiel,
purchase
]
