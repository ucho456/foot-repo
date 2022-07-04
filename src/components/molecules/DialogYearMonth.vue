<template>
  <v-dialog
    ref="dialog"
    v-model="datePicker"
    :persistent="true"
    :return-value.sync="yearMonth"
    :width="'290px'"
  >
    <template #activator="{ on, attrs }">
      <v-text-field
        v-bind="attrs"
        :label="'試合年月'"
        :readonly="true"
        :value="yearMonth"
        v-on="on"
      />
    </template>
    <v-date-picker
      v-model="tmpYearMonth"
      :no-title="true"
      :scrollable="true"
      :type="'month'"
      @input="inputYearMonth"
    >
      <v-spacer />
      <v-btn :color="'primary'" :text="true" @click="handleClick"> 決定 </v-btn>
    </v-date-picker>
  </v-dialog>
</template>

<script>
import { defineComponent, ref } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'DialogYearMonth',

  props: {
    yearMonth: { type: String, default: '' }
  },

  setup(props, ctx) {
    const tmpYearMonth = props.yearMonth
    const datePicker = ref(false)
    const inputYearMonth = (yearMonth) => {
      ctx.emit('input', yearMonth)
    }
    const handleClick = () => {
      ctx.refs.dialog.save(props.yearMonth)
      ctx.emit('click')
    }

    return { tmpYearMonth, datePicker, inputYearMonth, handleClick }
  }
})
</script>
