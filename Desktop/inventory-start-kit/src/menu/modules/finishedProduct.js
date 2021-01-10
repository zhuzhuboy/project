// 成品
export default {
    path: '/finishedProduct',
    title: '成品',
    icon: 'book',
    children: (pre => [
      {
        path: `${pre}/list`,
        title: '成品列表',
        icon: 'file-text'
      },
      {
        path: `${pre}/synthesis`,
        title: '合并成品',
        icon: 'file-text'
      }
    ])('/finishedProduct')
  }
