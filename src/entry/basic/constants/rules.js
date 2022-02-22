/**
 * 登录
 */
export const RULE_LOGIN = {
  phone: [{
    required: true,
    message: '请输入手机号',
  }, {
    pattern: /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/,
    message: '手机号不正确',
  }],
  code: [{
    required: true,
    message: '请输入验证码',
  }, {
    len: 6,
    message: '验证码错误',
    trigger: 'blur'
  }],
}

/**
 * 规则校验
 * @param {Object} params 需要校验的参数数组
 * @param {Object} rules 校验规则
 * @param {Boolean} showToast是否展示toast框
 */
export function verifyForm(params, rules, showToast = false) {
  if (!rules) {
    return false
  }
  let passed = true

  for (const key in params) {
    const arr_rule = rules[ key ] // 单个字段校验规则
    const val = params[ key ] // 输入的值

    for (let i = 0; i < arr_rule.length; i++) {
      const rule = arr_rule[ i ]

      if (rule.required && !val) {
        passed = false
      } else if (rule.type && typeof val !== rule.type) {
        passed = false
      } else if (rule.pattern && !rule.pattern.test(val)) {
        passed = false
      } else if (rule.len && val.length !== rule.len) {
        passed = false
      } else if (rule.maxlen && val.length > rule.maxlen) {
        passed = false
      } else if (rule.min && val < rule.min) {
        passed = false
      } else if (rule.max && val > rule.max) {
        passed = false
      }
      /* 不通过直接退出函数 */
      if (!passed) {
        if (showToast) {
          Vue.prototype.$fail(rule.message, false, 1000)
        }
        return false
      }
    }
  }
  return true
}
