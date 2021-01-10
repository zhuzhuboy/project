import request from '@/plugin/axios'

// 合并参数
export function become(data) {
    return request({
        url: '/adMerge/become',
        method: 'post',
        data
    })
}
