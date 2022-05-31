<template>
  <v-dialog
    ref="dialog"
    v-model="datePicker"
    :persistent="true"
    :return-value.sync="yearMonth"
    :width="'290px'"
  >
    <template #activator="{ on, attrs }">
      <v-text-field v-bind="attrs" :readonly="true" :value="yearMonth" v-on="on" />
    </template>
    <v-date-picker
      v-model="tmpYearMonth"
      :no-title="true"
      :scrollable="true"
      :type="'month'"
      @input="inputYearMonth"
    >
      <v-spacer />
      <v-btn :color="'primary'" :text="true" @click="$refs.dialog.save(yearMonth)"> 決定 </v-btn>
    </v-date-picker>
  </v-dialog>
</template>

<script lang="ts">
import { defineComponent, ref } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'DialogYearMonth',

  props: {
    yearMonth: { type: String, default: '' }
  },

  setup(props, ctx) {
    const tmpYearMonth = props.yearMonth
    const datePicker = ref(false)
    const inputYearMonth = (yearMonth: string): void => {
      ctx.emit('input', yearMonth)
    }

    return { tmpYearMonth, datePicker, inputYearMonth }
  }
})
</script>
