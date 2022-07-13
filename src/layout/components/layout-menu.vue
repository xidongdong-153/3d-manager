<template>
  <n-layout-sider
    bordered
    collapse-mode="width"
    :collapsed-width="64"
    :width="240"
    :collapsed="collapsed"
    show-trigger
    @collapse="collapsed = true"
    @expand="collapsed = false"
    :native-scrollbar="false"
  >
    <n-menu
      v-model:value="activeKey"
      :collapsed="collapsed"
      :collapsed-width="64"
      :collapsed-icon-size="22"
      :options="menuOptions"
      :indent="18"
      :on-update:value="handleUpdateValue"
    />
  </n-layout-sider>
</template>

<script setup lang="ts">
import { h, ref, Component } from 'vue'
import { NIcon } from 'naive-ui'
import { MenuOption } from 'naive-ui'
import { RouterLink } from 'vue-router'
import {
  EaselSharp,
  EarthSharp,
  Camera,
  AccessibilityOutline,
  WineOutline as WineIcon,
  BarChartSharp,
  StatsChartSharp
} from '@vicons/ionicons5'
import { MouseSharp, ShowChartRound, BarChartRound } from '@vicons/material'

function renderIcon (icon: Component) {
  return () => h(NIcon, null, { default: () => h(icon) })
}

const activeKey = ref<string | null>(null)

const collapsed = ref(false)

const menuOptions: MenuOption[] = [
  {
    label: () =>
      h(
        RouterLink,
        {
          to: {
            name: 'Home',
            params: {
              lang: 'zh-CN'
            }
          }
        },
        { default: () => '仪表盘' }
      ),
    key: 'home',
    icon: renderIcon(EaselSharp)
  },
  {
    label: 'Cesium~',
    key: 'cesium-basic',
    icon: renderIcon(EarthSharp),
    children: [
      {
        label: '基础吧',
        key: 'cesium-basic',
        icon: renderIcon(AccessibilityOutline),
        children: [
          {
            label: () =>
              h(
                RouterLink,
                {
                  to: {
                    name: 'Camera',
                    params: {
                      lang: 'zh-CN'
                    }
                  }
                },
                { default: () => '学习相机' }
              ),
            key: 'camera',
            icon: renderIcon(Camera)
          },
          {
            label: () =>
              h(
                RouterLink,
                {
                  to: {
                    name: 'Mouse',
                    params: {
                      lang: 'zh-CN'
                    }
                  }
                },
                { default: () => '学习鼠标' }
              ),
            key: 'mouse-event',
            icon: renderIcon(MouseSharp)
          }
        ]
      },
      {
        label: '不知道是啥',
        key: 'something',
        icon: renderIcon(WineIcon),
        children: [
          {
            label: '要干嘛',
            key: 'whisky'
          }
        ]
      }
    ]
  },
  {
    label: 'Echart~',
    key: 'echarts-basic',
    icon: renderIcon(StatsChartSharp),
    children: [
      {
        label: '试试图表...',
        key: 'chart',
        icon: renderIcon(BarChartSharp),
        children: [
          {
            label: () =>
              h(
                RouterLink,
                {
                  to: {
                    name: 'BarChart',
                    params: {
                      lang: 'zh-CN'
                    }
                  }
                },
                { default: () => '柱状图' }
              ),
            key: 'bar',
            icon: renderIcon(BarChartRound)
          },
          {
            label: () =>
              h(
                RouterLink,
                {
                  to: {
                    name: 'LineChart',
                    params: {
                      lang: 'zh-CN'
                    }
                  }
                },
                { default: () => '折线图' }
              ),
            key: 'line',
            icon: renderIcon(ShowChartRound)
          }
        ]
      }
    ]
  }
]

// 点击菜单 回调
const handleUpdateValue = (key: string, item: MenuOption) => {
  window.$message.info(`路由跳到了 => ${key}`)
}
</script>

<style lang="less">
</style>
