import request from '@/plugin/axios'

// 物料分类列表
export function gCateList (data) {
  return request({
    url: 'adInfo/gCateList',
    method: 'post',
    data
  })
}

// 物料新增
export function gCateSaveEd (data) {
  return request({
    url: 'adInfo/gCateSaveEd',
    method: 'post',
    data
  })
}

// 物料列表
export function goodsLists (data) {
  return request({
    url: 'adInfo/goodsLists',
    method: 'post',
    data
  })
}

// 物料列表
export function goodsSaveEd (data) {
  return request({
    url: '/adInfo/goodsSaveEd',
    method: 'post',
    data
  })
}

// 物料列表
export function goodsDel (data) {
  return request({
    url: '/adInfo/goodsDel',
    method: 'post',
    data
  })
}

