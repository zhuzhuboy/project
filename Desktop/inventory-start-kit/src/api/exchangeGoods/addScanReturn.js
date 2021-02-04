import request from '@/plugin/axios'

// 首页请求下拉框
export function getRet(data) {
    return request({
        url: '/adSwap/getRet',
        method: 'post',
        data
    })
}

// 远程搜索
export function searchArea(data) {
    return request({
        url: '/adSale/searchArea',
        method: 'post',
        data
    })
}


// 输入请求数据。加入到表格中
export function retScan(data) {
    return request({
        url: '/adSwap/retScan',
        method: 'post',
        data
    })
}


// 保存
export function retSubmit(data) {
    return request({
        url: '/adSwap/retSubmit',
        method: 'post',
        data
    })
}



