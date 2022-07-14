import { createRouter, createWebHashHistory } from 'vue-router'
import layout from '@/layout/layout.vue'

const routes = [
  {
    path: '/',
    redirect: '/home',
    component: layout,
    children: [
      {
        name: 'Home',
        path: '/home',
        component: () => import('@/views/Home/Home.vue')
      },
      {
        name: 'Camera',
        path: '/camera',
        component: () => import('@/views/Cesium/Cesium-Camera/Camera.vue')
      },
      {
        name: 'Mouse',
        path: '/mouse',
        component: () => import('@/views/Cesium/Cesium-Mouse/Mouse.vue')
      },
      {
        name: 'Entity',
        path: '/entity',
        component: () => import('@/views/Cesium/Cesium-Entity/Entity.vue')
      },
      {
        name: 'BarChart',
        path: '/barchart',
        component: () => import('@/views/Echarts/BarChart/Barchart.vue')
      },
      {
        name: 'LineChart',
        path: '/linechart',
        component: () => import('@/views/Echarts/LineChart/LineChart.vue')
      },
      {
        name: 'FreeApi',
        path: '/freeapi',
        component: () => import('@/views/FreeApi/FreeApi.vue'),
        redirect: '',
        children: [
          {
            name: 'Search',
            path: '/search',
            component: () => import('@/views/FreeApi/Searchs/Searchs.vue')
          }
        ]
      }
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
