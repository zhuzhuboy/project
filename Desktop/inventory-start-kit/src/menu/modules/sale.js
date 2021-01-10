export default {
    path: '/sale',
    title: '销售',
    icon: 'book',
    children: (pre => [{
            path: `${pre}/orderList`,
            title: '销售订单列表',
            icon: 'file-text'
        },

        {
            path: `${pre}/deliveryList`,
            title: '出库设备列表',
            icon: 'file-text'
        },
    ])('/sale')
}
