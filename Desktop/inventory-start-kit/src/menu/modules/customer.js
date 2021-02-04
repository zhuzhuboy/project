export default {
    path: '/customer',
    title: '客户',
    icon: 'user-circle-o',
    children: (pre => [{
            path: `${pre}/list`,
            title: '客户列表',
            icon: 'list'
        },

    ])('/customer')
}
