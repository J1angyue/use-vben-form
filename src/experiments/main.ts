import { createApp } from 'vue'

import App from '@e/App.vue'

import 'ant-design-vue/dist/antd.css'
import '@/style/index.less'
import iVComps from '@c/index'

createApp(App)
  .use(iVComps)
  .mount('#app')
