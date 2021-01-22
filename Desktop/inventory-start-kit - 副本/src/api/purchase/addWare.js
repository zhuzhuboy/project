import request from '@/plugin/axios'

// 采购入库首页请求数据
export function getInfo () {
  return request({
    url: 'adEnter/getInfo',
    method: 'post'
  })
}

// 入库保存接口
export function save (data) {
  return request({
    url: 'adEnter/save',
    method: 'post',
    data
  })
}
