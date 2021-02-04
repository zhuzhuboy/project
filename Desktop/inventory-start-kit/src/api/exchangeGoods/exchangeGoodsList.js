import request from '@/plugin/axios'

// 退换货列表
export function barterList(data) {
    return request({
        url: '/adSwap/barterList',
        method: 'post',
        data
    })
}
