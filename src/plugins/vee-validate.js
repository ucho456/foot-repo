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

extend('minPassword', {
  ...rules.min,
  message: '4桁以上のパスワードを入力して下さい。'
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
