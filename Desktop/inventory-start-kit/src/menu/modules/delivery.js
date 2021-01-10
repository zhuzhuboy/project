export default {
  path: '/delivery',
  title: '出库',
  icon: 'book',
  children: (pre => [
    {
      path: `${pre}/list`,
      title: '出库列表',
      icon: 'file-text'
    },

  ])('/delivery')
}
