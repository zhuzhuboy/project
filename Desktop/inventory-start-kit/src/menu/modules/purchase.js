export default {
  path: '/purchase',
  title: '采购',
  icon: 'book',
  children: (pre => [{
    path: `${pre}/warehousing`,
    title: '采购入库',
    icon: 'file-text'
  },
  {
    path: `${pre}/order`,
    title: '采购订单',
    icon: 'file-text'
  },
  ])('/purchase')
}
