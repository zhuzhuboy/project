import request from '@/plugin/axios'

// 仓库列表
export function stockList (data) {
  return request({
    url: 'adset/stockList',
    method: 'post',
    data
  })
}

// 仓库新增
export function stockSave (data) {
  return request({
    url: 'adset/stockSave',
    method: 'post',
    data
  })
}
