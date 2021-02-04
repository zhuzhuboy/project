export default {
    path: '/purchase',
    title: '入库',
    icon: 'archive',
    children: (pre => [{
            path: `${pre}/warehousing`,
            title: '入库订单列表',
            icon: 'list'
        },
        {
            path: `${pre}/add`,
            title: '新建入库',
            icon: 'plus-square-o'
        },
        {
            path: `${pre}/stockList`,
            title: '库存设备列表',
            icon: 'list'
        }
    ])('/purchase')
}
