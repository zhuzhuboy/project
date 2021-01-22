import request from '@/plugin/axios'

// 管理员列表
export function adminLists() {
    return request({
        url: '/adRole/adminLists',
        method: 'post'
    })
}

// 添加-编辑管理员
export function adminAdEd(data) {
    return request({
        url: '/adRole/adminAdEd',
        method: 'post',
        data
    })
}

// 添加-编辑管理员
export function groupSeeMenu(data) {
    return request({
        url: '/adRole/groupSeeMenu',
        method: 'post',
        data
    })
}
