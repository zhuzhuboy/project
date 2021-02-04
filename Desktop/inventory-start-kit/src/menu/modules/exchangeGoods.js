// 退换货
export default {
    path: '/exchangeGoods',
    title: '退换货',
    icon: 'adjust',
    children: (pre => [{
            path: `${pre}/scanExchange`,
            title: '扫码换货',
            icon: 'barcode'
        },
        {
            path: `${pre}/exchangeGoodsList`,
            title: '换货列表',
            icon: 'list'
        },
        // 扫码退货
        {
            path: `${pre}/addScanReturn`,
            title: '扫码退货',
            icon: 'barcode'
        },
        // 退货入库
        {
            path: `${pre}/returnToWarehouse`,
            title: '退货入库列表',
            icon: 'list'
        },
        // 退货设备列表
        {
            path: `${pre}/retDeviceList`,
            title: '退货设备列表',
            icon: 'list'
        },
    ])('/exchangeGoods')
}
