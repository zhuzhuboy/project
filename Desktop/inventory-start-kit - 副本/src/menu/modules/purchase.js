export default {
    path: '/purchase',
    title: '采购',
    icon: 'gift',
    children: (pre => [{
            path: `${pre}/warehousing`,
            title: '采购订单列表',
            icon: 'list'
        }, {
            path: `${pre}/stockList`,
            title: '库存设备列表',
            icon: 'list'
        }
    ])('/purchase')
}
