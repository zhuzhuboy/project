import request from '@/plugin/axios'

// 退货的列表
export function retLists(data) {
    return request({
        url: '/adSwap/retLists',
        method: 'post',
        data
    })
}


// 以退货列表找详情
export function retDetails(data) {
    return request({
        url: '/adSwap/retDetails',
        method: 'post',
        data
    })
}



// 以退货列表找详情
export function retExamine(data) {
    return request({
        url: '/adSwap/retExamine',
        method: 'post',
        data
    })
}

