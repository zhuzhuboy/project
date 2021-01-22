import request from '@/plugin/axios'

// 扫码
export function saleDevice(data) {
    return request({
        url: '/adSale/saleDevice',
        method: 'post',
        data
    })
}

