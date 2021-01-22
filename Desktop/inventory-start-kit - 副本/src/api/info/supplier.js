import request from '@/plugin/axios'

// 供应商列表
export function comLists (data) {
  return request({
    url: 'adInfo/comLists',
    method: 'post',
    data
  })
}

// 新增供应商
export function comSaveEd (data) {
  return request({
    url: 'adInfo/comSaveEd',
    method: 'post',
    data
  })
}
// 删除
export function comDel (data) {
  return request({
    url: 'adInfo/comDel ',
    method: 'post',
    data
  })
}
