import Vue from 'vue'
import { ValidationProvider, ValidationObserver, extend } from 'vee-validate'
import * as rules from 'vee-validate/dist/rules'

extend('required', {
  ...rules.required,
  message: '必須項目です。'
})

extend('email', {
  ...rules.email,
  message: '正しいメールアドレスを入力して下さい。'
})

extend('password', {
  validate(value) {
    return /^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9.?/-]{6,}$/.test(value)
  },
  message: '文字・数字を含む6桁以上で入力して下さい。'
})

extend('characterLimit', {
  validate(value) {
    return (
      /^[^"#$%&()*+\-\\/:;<=>@[\\\]^_`{|}~]+$/.test(value) &&
      !/[\uD800-\uDBFF][\uDC00-\uDFFF]/.test(value)
    )
  },
  message: `使用できない文字が含まれています。`
})

Vue.component('ValidationProvider', ValidationProvider)
Vue.component('ValidationObserver', ValidationObserver)
