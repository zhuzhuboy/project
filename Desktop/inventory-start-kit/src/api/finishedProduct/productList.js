import request from '@/plugin/axios'

// 合并参数
export function ableLists(data) {
    return request({
        url: '/adMerge/ableLists',
        method: 'post',
        data
    })
}
