import request from '@/plugin/axios'

//导入客户
export function customerImport(data) {
    return request({
        url: '/adSet/customerImport ',
        method: 'post',
        data
    })
}
