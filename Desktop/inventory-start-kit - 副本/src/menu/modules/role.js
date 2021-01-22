export default {
    path: '/role',
    title: '角色',
    icon: 'book',
    children: (pre => [{
            path: `${pre}/routerList`,
            title: '权限列表',
            icon: 'file-text'
        },
        {
            path: `${pre}/groupList`,
            title: '分组列表',
            icon: 'file-text'
        },
        {
            path: `${pre}/adminAccount`,
            title: '管理账户',
            icon: 'file-text'
        },
    ])('/role')
}
