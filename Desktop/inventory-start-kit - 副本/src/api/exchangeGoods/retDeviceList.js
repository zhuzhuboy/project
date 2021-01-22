import request from '@/plugin/axios'

// 退货设备列表
export function retDevices(data) {
    return request({
        url: '/adSwap/retDevices',
        method: 'post',
        data
    })
}

