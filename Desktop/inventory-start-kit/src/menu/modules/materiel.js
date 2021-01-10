export default {
  path: '/materiel',
  title: '物料',
  icon: 'book',
  children: (pre => [{
    path: `${pre}/cate`,
    title: '原始物料分类',
    icon: 'file-text'
  },
  {
    path: `${pre}/list`,
    title: '原始物料列表',
    icon: 'file-text'
  }
  ])('/materiel')
}
