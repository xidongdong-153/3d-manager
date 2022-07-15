<template>
  <n-calendar v-model:value="dateValue" #="{ year, month, date }" :is-date-disabled="isDateDisabled">
    {{ year }}-{{ month }}-{{ date }}
  </n-calendar>
  <n-card :title="'更新时间: ' + item.updateTime" v-for="(item, index) in jokeList" :key="item.updateTime">
    {{ item.content }}
  </n-card>
</template>

<script setup lang="ts">
import { isYesterday, addDays } from 'date-fns/esm'
import { ref } from 'vue'
import { jokeApi } from '@/api/freeApi'

interface JokeResult {
  content: string
  updateTime: string
}

const dateValue = ref(addDays(Date.now(), 1).valueOf())
const isDateDisabled = (timestamp: number): boolean => {
  if (isYesterday(timestamp)) {
    return true
  }
  return false
}

const jokeList = ref<JokeResult[]>([])

const getJoke = async () => {
  const { data } = await jokeApi({ page: 1, app_id: 'rgihdrm0kslojqvm', app_secret: 'WnhrK251TWlUUThqaVFWbG5OeGQwdz09' })
  jokeList.value = data.data.list

  window.$message.info('拿到 一些笑话')
}
getJoke()

</script>

<style lang="less" scoped>
</style>
