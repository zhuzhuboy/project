export default {
  path: '/info',
  title: '信息',
  icon: 'book',
  children: (pre => [
    {
      path: `${pre}/supplier/list`,
      title: '供应商',
      icon: 'file-text'
    },
    {
      path: `${pre}/warehouse/list`,
      title: '仓库',
      icon: 'file-text'
    }
  ])('/info')
}
