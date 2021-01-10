import request from '@/plugin/axios'

// 采购订单API

// 已生成的采购订单物料
export function generatedList (data) {
  return request({
    url: '/adEnter/generatedList',
    method: 'post',
    data

  })
}

// 物料详情
export function enterDetails (data) {
  return request({
    url: '/adEnter/enterDetails',
    method: 'post',
    data

  })
}

// 待审核
export function submits (data) {
  return request({
    url: 'adEnter/submits',
    method: 'post',
    data
  })
}
