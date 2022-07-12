/** check */
import Vue from 'vue'
import { extend, ValidationObserver, ValidationProvider } from 'vee-validate'
import { email, required } from 'vee-validate/dist/rules'

extend('required', {
  ...required,
  message: '必須項目です。'
})

extend('email', {
  ...email,
  message: '正しいメールアドレスを入力して下さい。'
})

extend('password', {
  validate(value) {
    return /^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9.?/-]{6,}$/.test(value)
  },
  message: '文字・数字を含む6桁以上で入力して下さい。'
})

Vue.component('ValidationProvider', ValidationProvider)
Vue.component('ValidationObserver', ValidationObserver)
