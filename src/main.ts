import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index'
import './styles/index.less'
// 通用字体
import 'vfonts/Lato.css'
// 等宽字体
import 'vfonts/FiraCode.css'

const app = createApp(App)

app.use(router).mount('#app')
