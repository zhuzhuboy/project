export default {
    path: '/sale',
    title: '销售',
    icon: 'gavel',
    children: (pre => [{
            path: `${pre}/orderList`,
            title: '销售订单列表',
            icon: 'list'
        },

        {
            path: `${pre}/deliveryList`,
            title: '出库设备列表',
            icon: 'list'
        },


    ])('/sale')
}
