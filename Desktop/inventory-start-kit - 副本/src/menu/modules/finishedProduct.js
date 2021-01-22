// 成品
export default {
    path: '/finishedProduct',
    title: '成品',
    icon: 'podcast',
    children: (pre => [
      {
        path: `${pre}/list`,
        title: '成品列表',
        icon: 'list'
      },
      {
        path: `${pre}/synthesis`,
        title: '合并成品',
        icon: 'book'
      }
    ])('/finishedProduct')
  }
