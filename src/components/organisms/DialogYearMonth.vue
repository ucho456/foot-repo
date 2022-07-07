<template>
  <v-dialog ref="dialog" v-model="datePicker" persistent width="290" :return-value.sync="yearMonth">
    <template #activator="{ on, attrs }">
      <v-text-field
        v-bind="attrs"
        readonly
        :clearable="clearable"
        :label="'試合年月'"
        :value="yearMonth"
        v-on="on"
        @click:clear="handleClear"
      />
    </template>
    <v-date-picker
      v-model="tmpYearMonth"
      locale="jp-ja"
      no-title
      scrollable
      type="month"
      @input="inputYearMonth"
    >
      <v-spacer />
      <v-btn color="primary" text @click="handleClick"> 決定 </v-btn>
    </v-date-picker>
  </v-dialog>
</template>

<script>
/** check */
import { defineComponent, ref } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'DialogYearMonth',

  props: {
    clearable: { type: Boolean, default: false },
    yearMonth: { type: String, default: '' }
  },

  setup(props, ctx) {
    const tmpYearMonth = props.yearMonth
    const datePicker = ref(false)
    const inputYearMonth = (yearMonth) => ctx.emit('input', yearMonth)
    const handleClick = () => {
      ctx.refs.dialog.save(props.yearMonth)
      ctx.emit('click')
    }
    const handleClear = () => ctx.emit('clear')

    return { datePicker, handleClear, handleClick, inputYearMonth, tmpYearMonth }
  }
})
</script>
