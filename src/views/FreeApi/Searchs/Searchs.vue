<template>
  <n-scrollbar style="max-width: 300px; max-height: 220px; border: 1px solid #333;">
    <div class="abbr-container">
      <div class="abbr-title">没什么用的搜索
        <a href="https://www.alapi.cn/api/view/99" target="_blank" style="color: white">https://www.alapi.cn/api/view/99</a>
      </div>
      
      <n-input
        v-model:value="searchValue"
        type="text"
        placeholder="输入关键词缩写: 例如 yyds"
        :loading="isLoading"
        @keyup.enter="queryAbbr(searchValue)"
        @blur="onBlur"
        @focus="onFocus"
      />
    </div>
    <ul v-for="item in searchResult" :key="item">
      <li>
        {{ item }}
      </li>
    </ul>
  </n-scrollbar>
</template>

<script setup lang="ts">
import { abbr } from '@/api/freeApi'
import { ref } from 'vue'

const searchValue = ref('')
const isLoading = ref<boolean>(false)
const searchResult = ref<[]>([])

const queryAbbr = async (searchValue: string): Promise<void> => {
  const { data } = await abbr({ token: 'OQAPRjSJZF76QK9q', abbr: searchValue })

  if (data.data != null) {
    searchResult.value = data.data.explain_arr
    // if ()
  }
}

const onBlur = () => {
  isLoading.value = false
  searchValue.value = ''
  searchResult.value = []
}
const onFocus = () => {
  isLoading.value = true
}
</script>

<style lang="less">
.abbr-container {
  padding: 10px;
  width: 280px;
  .abbr-title {
    margin-bottom: 10px;
  }
}
</style>
