import request from '@/plugin/axios'

// 仓库列表
export function stockDeviceList (data) {
  return request({
    url: '/adEnter/stockDeviceList',
    method: 'post',
    data
  })
}
