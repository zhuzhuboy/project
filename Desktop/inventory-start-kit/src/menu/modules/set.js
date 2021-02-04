export default {
    path: '/set',
    title: '设置',
    icon: 'book',
    children: (pre => [{
            path: `info`,
            title: '信息',
            icon: 'book',
            children: (pre => [{
                    path: `${pre}/supplier/list`,
                    title: '供应商',
                    icon: 'codepen',
                },
                {
                    path: `${pre}/warehouse/list`,
                    title: '仓库',
                    icon: 'building'
                }
            ])(`${pre}/info`)
        },
        {
            path: `materiel`,
            title: '物料',
            icon: 'archive',
            children: (pre => [{
                    path: `${pre}/cate`,
                    title: '原始物料分类',
                    icon: 'window-restore'
                },
                {
                    path: `${pre}/list`,
                    title: '原始物料列表',
                    icon: 'list'
                }
            ])(`${pre}/materiel`)
        },
        {
            path: 'customer',
            title: '客户',
            icon: 'user-circle-o',
            children: (pre => [{
                path: `${pre}/list`,
                title: '客户列表',
                icon: 'list'
            }, {
                path: `${pre}/importCustomer`,
                title: '导入客户',
                icon: 'address-book-o'
            }])(`${pre}/customer`)
        }

    ])('/set')
}
