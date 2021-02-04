import request from '@/plugin/axios'

// 供应商列表
export function comLists (data) {
  return request({
    url: 'adset/comLists',
    method: 'post',
    data
  })
}

// 新增供应商
export function comSaveEd (data) {
  return request({
    url: 'adset/comSaveEd',
    method: 'post',
    data
  })
}
// 删除
export function comDel (data) {
  return request({
    url: 'adset/comDel ',
    method: 'post',
    data
  })
}
