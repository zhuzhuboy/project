import request from '@/plugin/axios'

// 销售信息
export function saleGetInfo () {
  return request({
    url: '/adSale/saleGetInfo',
    method: 'post'
  })
}

// 参数   地区 =》area
export function searchArea (data) {
  return request({
    url: '/adSale/searchArea',
    method: 'post',
    data
  })
}

// 参数   客户=》 uid
export function perInfo (data) {
  return request({
    url: '/adSale/perInfo',
    method: 'post',
    data
  })
}

// 保存

export function saveOrder (data) {
  return request({
    url: '/adSale/saveOrder',
    method: 'post',
    data
  })
}
