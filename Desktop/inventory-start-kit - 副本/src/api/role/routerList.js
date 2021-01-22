import request from '@/plugin/axios'

// 获取菜单数据
export function menuLists () {
  return request({
    url: '/adRole/menuLists',
    method: 'post'
  })
}

// 添加菜单
export function menuAdEd (data) {
  return request({
    url: '/adRole/menuAdEd',
    method: 'post',
    data
  })
}
