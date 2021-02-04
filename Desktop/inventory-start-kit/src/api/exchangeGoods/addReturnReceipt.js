import request from '@/plugin/axios'

// 选择出库单
export function retDocument(data) {
    return request({
        url: '/adSwap/retDocument',
        method: 'post',
        data
    })
}

// 根据选择出库单获取详情
export function getSaleDetails(data) {
    return request({
        url: '/adSwap/getSaleDetails',
        method: 'post',
        data
    })
}


// 获得列表
export function optSale(data) {
    return request({
        url: '/adSwap/optSale',
        method: 'post',
        data
    })
}


// 保存
export function retSave(data) {
    return request({
        url: '/adSwap/retSave',
        method: 'post',
        data
    })
}
