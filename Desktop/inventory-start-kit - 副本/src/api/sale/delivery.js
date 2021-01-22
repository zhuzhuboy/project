import request from '@/plugin/axios'

// 扫码
export function scanCode(data) {
    return request({
        url: '/adSale/scanCode',
        method: 'post',
        data
    })
}

// 提交销售设备
export function smtDevice(data) {
    return request({
        url: '/adSale/smtDevice',
        method: 'post',
        data
    })
}
