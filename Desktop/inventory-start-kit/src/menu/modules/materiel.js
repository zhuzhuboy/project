export default {
  path: '/materiel',
  title: '物料',
  icon: 'book',
  children: (pre => [{
    path: `${pre}/cate`,
    title: '物料分类',
    icon: 'file-text'
  },
  {
    path: `${pre}/list`,
    title: '物料列表',
    icon: 'file-text'
  }
  ])('/materiel')
}
