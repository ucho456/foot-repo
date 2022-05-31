<template>
  <v-dialog
    ref="dialog"
    v-model="datePicker"
    :persistent="true"
    :return-value.sync="date"
    :width="'290px'"
  >
    <template #activator="{ on, attrs }">
      <v-text-field
        v-bind="attrs"
        :clearable="true"
        :label="'日にち'"
        :prepend-inner-icon="'mdi-calendar'"
        :readonly="true"
        :value="date"
        v-on="on"
        @input="clearDate"
      />
    </template>
    <v-date-picker v-model="tmpDate" :no-title="true" :scrollable="true" @input="inputDate">
      <v-spacer />
      <v-btn :color="'primary'" :text="true" @click="handleClick"> 決定 </v-btn>
    </v-date-picker>
  </v-dialog>
</template>

<script>
import { defineComponent, ref } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'DialogDate',

  props: {
    date: { type: String, default: '' }
  },

  setup(props, ctx) {
    const tmpDate = props.date
    const datePicker = ref(false)
    const inputDate = (date) => {
      ctx.emit('input', date)
    }
    const clearDate = () => {
      ctx.emit('clear')
    }
    const handleClick = () => {
      ctx.refs.dialog.save(props.date)
    }

    return { tmpDate, datePicker, inputDate, clearDate, handleClick }
  }
})
</script>
