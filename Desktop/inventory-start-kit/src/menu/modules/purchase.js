export default {
    path: '/purchase',
    title: '采购',
    icon: 'book',
    children: (pre => [{
            path: `${pre}/warehousing`,
            title: '采购订单列表',
            icon: 'file-text'
        }, {
            path: `${pre}/stockList`,
            title: '库存设备列表',
            icon: 'file-text'
        }
    ])('/purchase')
}
