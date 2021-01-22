// 冒泡排序

export function bubblesSort (arr, key) {
  // 不是数组return
  if (!Array.isArray(arr)) return
  // 临时交换的 边浪
  let temp
  // 如果key有值。则表示排序的数据每一项是对象。按照对象里面的某一属性值排序
  if (key) {
    for (let i = 0; i < arr.length - 1; i++) {
      for (let j = 0; j < arr.length - 1; j++) {
        if (arr[j][key] > arr[j + 1][key]) {
          temp = arr[j]
          arr[j] = arr[j + 1]
          arr[j + 1] = temp
        }
      }
    }
  } else {
    // 按照数组的大小排序
    for (let i = 0; i < arr.length - 1; i++) {
      for (let j = 0; j < arr.length - 1; j++) {
        if (arr[j] > arr[j + 1]) {
          temp = arr[j]
          arr[j] = arr[j + 1]
          arr[j + 1] = temp
        }
      }
    }
  }
}

// 深克隆

export function structuralClone (obj) {
  return new Promise(resolve => {
    const {
      port1,
      port2
    } = new MessageChannel()
    // 接受数据resolve返回
    port2.onmessage = ev => resolve(ev.data)
    // 发送数据
    port1.postMessage(obj)
  })
}

// 时间转换格式

export function toDate (number) {
  // 如果是毫秒的时间戳就不需要这一步，直接下一步就可以
  var n = number
  var date = new Date(n)
  var Y = date.getFullYear() + '-'
  var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
  var D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()

  return (Y + M + D)
}

// 防抖，高阶函数
export function debounce (func, duration) {
  let timer
  // 返回的函数
  return function (...args) {
    // 利用产生的闭包判断是否清除定时器
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      func.apply(this, args)
      timer = null
    }, duration)
  }
}

// 立即执行的防抖函数
export function imeDebounce (func, duration) {
  let timer
  let flag = true
  // 返回的函数
  return function (...args) {
    console.log(args)
    if (timer) {
      clearTimeout(timer)
    }
    // 立即执行
    if (flag == true) {
      func.apply(this, args)
      flag = false
    } else {
      // 利用产生的闭包判断是否清除定时器
      timer = setTimeout(() => {
        console.log(args)
        func.apply(this, args)
        timer = null
      }, duration)
    }
  }
}

// 只执行一次的函数
export function executeOnlyOnce (func) {
  let flag = true
  // 返回的函数
  return function (...args) {
    if (flag) {
      func.apply(this, args)
      flag = false
    }
  }
}
