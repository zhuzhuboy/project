export const checkUser = (rule, value, callback) => {
  if (!value) {
    return callback(new Error('用户名不能为空'))
  }
  setTimeout(() => {
    var uPattern = /^[a-zA-Z0-9_-]{4,16}$/
    if (!uPattern.test(value)) {
      callback(new Error('请输入4-16位数字字母组下划线组成的用户名'))
    }
    callback()
  }, 100)
}
// 验证密码，自定义验证
export var checkPassword = (rule, value, callback) => {
  if (!value) {
    return callback(new Error('密码不能为空'))
  }
  setTimeout(() => {
    var pPattern = /^.*(?=.{6,})(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*? ]).*$/
    if (!pPattern.test(value)) {
      callback(new Error('最少6位，包括大写字母，数字，特殊字符'))
    }
    callback()
  }, 100)
}


export const validateCode = (rule, value, callback) => {
  if (!value) {
    return callback(new Error('不能为空'))
  }
  setTimeout(() => {
    if (isNaN(Number(value))) {
      callback(new Error('请输入数字值'))
    }
    callback()
  }, 500)
}
