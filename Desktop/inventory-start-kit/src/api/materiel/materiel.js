import request from '@/plugin/axios'

// 物料分类列表
export function gCateList(data) {
    return request({
        url: 'adset/gCateList',
        method: 'post',
        data
    })
}

// 分类新增
export function gCateSaveEd(data) {
    return request({
        url: 'adset/gCateSaveEd',
        method: 'post',
        data
    })
}

// 物料列表
export function goodsLists(data) {
    return request({
        url: 'adset/goodsLists',
        method: 'post',
        data
    })
}

// 物料保存
export function goodsSaveEd(data) {
    return request({
        url: '/adset/goodsSaveEd',
        method: 'post',
        data
    })
}

// 物料删除
export function goodsDel(data) {
    return request({
        url: '/adset/goodsDel',
        method: 'post',
        data
    })
}


