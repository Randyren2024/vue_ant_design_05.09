import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import i18n from './locales'
import 'ant-design-vue/dist/reset.css'

// 设置初始语言
const app = createApp(App)
document.documentElement.lang = i18n.global.locale.value

app.use(router)
app.use(i18n)
app.mount('#app')
