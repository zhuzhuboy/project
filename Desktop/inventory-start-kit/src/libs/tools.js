// 冒泡排序

export function bubblesSort(arr, key) {
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

export function structuralClone(obj) {
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

export function toDate(number) {
    // 如果是毫秒的时间戳就不需要这一步，直接下一步就可以
    var n = number
    var date = new Date(n)
    var Y = date.getFullYear() + '-'
    var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
    var D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()

    return (Y + M + D)
}

// 防抖，高阶函数
export function debounce(func, duration) {
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
export function imeDebounce(func, duration) {
    let timer
    let flag = true
    // 返回的函数
    return function (...args) {
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
                func.apply(this, args)
                timer = null
            }, duration)
        }
    }
}

// 只执行一次的函数
export function executeOnlyOnce(func) {
    let flag = true
    // 返回的函数
    return function (...args) {
        if (flag) {
            func.apply(this, args)
            flag = false
        }
    }
}
// 高精度计算
export class HighPrecisionCalc {
    constructor() {}
    // 判断是否是整数,严谨性判断（是字符串也不行）
    isInteger(val) {
        return Math.floor(val) === val
    }
    // 得到整数
    toInteger(floatNum) {
        // 如果是字符串先转换成数字
        floatNum = +floatNum
        let ret = {
            times: 0,
            originNum: floatNum, //原数值(数字类型)
            num: 0,
            len: 0
        }
        // 如果是整数就赋值后不在执行
        if (this.isInteger(floatNum)) {
            ret.num = floatNum
            return ret
        }
        // 转成字符串
        let strfi = floatNum + ''
        // 判断有没有小数点
        let dotPos = strfi.indexOf('.')
        let len;
        // 如果没有小数点，len为0
        if (dotPos == -1) {
            len = 0
        } else {
            // 如果有小数点，小数点后面的长度为len值
            len = strfi.substr(dotPos + 1).length
        }
        // 当前倍数
        let times = Math.pow(10, len)
        // 得到整数
        let intNum = parseInt(floatNum * times + 0.5, 10)
        // 存储当前倍数
        ret.times = times
        // 整数值
        ret.num = intNum
        // 长度值
        ret.len = len
        // 返回这个对象
        return ret
    }
    operation(a, b, digits, op) {
        let o1 = this.toInteger(a)
        let o2 = this.toInteger(b)
        // 找到两个数中最大倍数
        let max = o1.times > o2.times ? o1.times : o2.times;
        // 找到两个数中最大长度
        let maxLen = o1.len > o2.len ? o1.len : o2.len;
        // o1倍数等于最大长度减去自身（自身通过转换字符串移除小数点）
        let o1Pow = Math.pow(10, maxLen - o1.len)
        // o2倍数等于最大长度减去自身（自身通过转换字符串移除小数点）
        let o2Pow = Math.pow(10, maxLen - o2.len)
        // 得到长度总和
        let totalLen = o1.len + o2.len;
        // 根据长度总和计算出的最多倍数
        let maxPower = Math.pow(10, totalLen)
        let result = null
        // 乘法和除法


        switch (op) {
            case 'add':
                // 如果是加法，原数转换成字符串去掉点再成倍数，相加
                result = (o1.originNum.toString().replace(/\./, '') * o1Pow) + (o2.originNum.toString().replace(/\./, '') * o2Pow)
                break
            case 'subtract':
                // 如果是减法，原数转换成字符串去掉点再成倍数，相减
                result = (o1.originNum.toString().replace(/\./, '') * o1Pow) - (o2.originNum.toString().replace(/\./, '') * o2Pow)
                break
            case 'multiply':
                // 乘法，无小数值相乘
                result = o1.num * o2.num
                break
            case 'divide':
                // 除法，无小数值相除
                result = o1.num / o2.num
                break
        }
        //  如果是乘除法
        if (op === 'multiply' || op === 'divide') {
            // 判断最多倍数是否为0，为0，则直接返回结果
            if (maxPower == 0) {
                return result
            }
            // 返回结果除以最多倍数
            return result / maxPower
        } else {
            // 这里是加减法
            // 判断最大倍数是否是0，如果是0，则直接返回结果
            if (max == 0) {
                return result
            }
            // 返回结果除以最大倍数
            return result / max
        }


    }

    // 加法
    add(val1, val2, digits) {
        return this.operation(val1, val2, digits, 'add')
    }
    // 减法
    subtract(val1, val2, digits) {
        return this.operation(val1, val2, digits, 'subtract')
    }
    // 乘法
    multiply(val1, val2, digits) {
        return this.operation(val1, val2, digits, 'multiply')
    }
    // 除法
    divide(val1, val2, digits) {
        return this.operation(val1, val2, digits, 'divide')
    }
}
