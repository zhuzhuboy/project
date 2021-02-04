import request from '@/plugin/axios'

// 合并成品
export function become(data) {
    return request({
        url: '/adMerge/become',
        method: 'post',
        data
    })
}
