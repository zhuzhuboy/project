export default {
    path: '/sale',
    title: '出库',
    icon: 'truck',
    children: (pre => [{
            path: `${pre}/orderList`,
            title: '出库订单列表',
            icon: 'list'
        },
        {
            path: `${pre}/addOrder`,
            title: '新建出库订单',
            icon: 'plus-square-o'
        },

        {
            path: `${pre}/deliveryList`,
            title: '出库设备列表',
            icon: 'list'
        },


    ])('/sale')
}
