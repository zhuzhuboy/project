export default {
  path: '/materiel',
  title: '物料',
  icon: 'archive',
  children: (pre => [{
    path: `${pre}/cate`,
    title: '原始物料分类',
    icon: 'window-restore'
  },
  {
    path: `${pre}/list`,
    title: '原始物料列表',
    icon: 'list'
  }
  ])('/materiel')
}
