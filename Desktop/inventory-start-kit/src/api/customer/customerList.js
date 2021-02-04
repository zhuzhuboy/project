import request from '@/plugin/axios'

//客户列表
export function customerList(data) {
    return request({
        url: '/adset/customerList',
        method: 'post',
        data
    })
}
//新增-编辑客户
export function customerAdEd(data) {
    return request({
        url: '/adset/customerAdEd',
        method: 'post',
        data
    })
}
//删除客户
export function customerDel(data) {
    return request({
        url: '/adset/customerDel',
        method: 'post',
        data
    })
}
