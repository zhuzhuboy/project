import request from '@/plugin/axios'

// 1.已生成的销售订单列表
export function genSaleList(data) {
    return request({
        url: '/adSale/genSaleList',
        method: 'post',
        data
    })
}

// 以销售记录查询销售物料
export function findSaleGoods(data) {
    return request({
        url: '/adSale/findSaleGoods',
        method: 'post',
        data
    })
}


// 待发货
export function deliverStatus(data) {
    return request({
        url: '/adSale/deliverStatus',
        method: 'post',
        data
    })
}


