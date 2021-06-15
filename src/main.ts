/*
 * @Author: Mojie
 * @Date: 2021-06-10 15:40:58
 */
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'lib-flexible'

// CSS
import 'normalize.css'
import '@/assets/scss/common.scss'

// plugins
import Vant from '@/plugins/vant'

createApp(App).use(router).use(store).use(Vant).mount('#app')
