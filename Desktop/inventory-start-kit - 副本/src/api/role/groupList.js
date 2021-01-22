import request from '@/plugin/axios'

// 获取分组列表
export function groupLists() {
    return request({
        url: '/adRole/groupLists',
        method: 'post'
    })
}

// 新增分组
export function groupAdEd(data) {
    return request({
        url: '/adRole/groupAdEd',
        method: 'post',
        data
    })
}

// 查看分组权限菜单
export function groupSeeMenu(data) {
    return request({
        url: '/adRole/groupSeeMenu',
        method: 'post',
        data
    })
}
