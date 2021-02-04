import request from '@/plugin/axios'

// 管理员登录
export function AccountLogin(data) {
    return request({
        url: '/admin/login',
        method: 'post',
        data
    })
}

// 修改密码
export function editPwd(data) {
    return request({
        url: '/adPower/editPwd',
        method: 'post',
        data
    })
}
