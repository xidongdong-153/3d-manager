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
      }
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
