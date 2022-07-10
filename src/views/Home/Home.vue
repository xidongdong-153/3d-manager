<template>
  <n-calendar
    v-model:value="dateValue"
    #="{ year, month, date }"
    :is-date-disabled="isDateDisabled"
  >
    {{ year }}-{{ month }}-{{ date }}
  </n-calendar>
</template>

<script setup lang="ts">
import { isYesterday, addDays } from 'date-fns/esm'
import { ref } from 'vue'

const dateValue = ref(addDays(Date.now(), 1).valueOf())
const isDateDisabled = (timestamp: number): boolean => {
  if (isYesterday(timestamp)) {
    return true
  }
  return false
}
</script>
