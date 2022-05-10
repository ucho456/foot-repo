<template>
  <v-dialog ref="dialog" v-model="datePicker" persistent :return-value.sync="date" width="290px">
    <template #activator="{ on, attrs }">
      <v-text-field
        v-bind="attrs"
        clearable
        label="日にち"
        prepend-inner-icon="mdi-calendar"
        readonly
        :value="date"
        v-on="on"
      />
    </template>
    <v-date-picker v-model="tmpDate" no-title scrollable @input="inputDate">
      <v-spacer />
      <v-btn color="primary" text @click="$refs.dialog.save(date)"> 決定 </v-btn>
    </v-date-picker>
  </v-dialog>
</template>

<script lang="ts">
import { defineComponent, ref } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'DialogDate',

  props: {
    date: { type: String, default: '' }
  },

  setup(props, ctx) {
    const tmpDate = props.date
    const datePicker = ref(false)
    const inputDate = (date: string) => ctx.emit('input', date)
    return { tmpDate, datePicker, inputDate }
  }
})
</script>
