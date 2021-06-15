import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import 'lib-flexible'

// CSS
import 'normalize.css'
import '@/assets/scss/common.scss'

// plugins
import Vant from '@/plugins/vant'

createApp(App).use(router).use(Vant).mount('#app')
