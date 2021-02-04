import request from '@/plugin/axios'



// 远程搜索
export function searchArea(data) {
    return request({
        url: '/adSale/searchArea',
        method: 'post',
        data
    })
}
// 详情信息
export function findOldDevice(data) {
    return request({
        url: '/adSwap/findOldDevice',
        method: 'post',
        data
    })
}

// 详情和记录信息
export function barter(data) {
    return request({
        url: '/adSwap/barter',
        method: 'post',
        data
    })
}


