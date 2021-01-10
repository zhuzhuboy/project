import request from '@/plugin/axios'

// 表格导入

// 导入设备提交
export function imDevice (data) {
  return request({
    url: '/adEnter/imDevice',
    method: 'post',
    data

  })
}
