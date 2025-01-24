import { createApp } from 'vue'
import App from './App.vue'

// 导入element-plus
import ElementPlus from 'element-plus'

// 完整引入
import 'element-plus/dist/index.css'

import * as ElementPlusIconsVue from '@element-plus/icons-vue'

const app = createApp(App)

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
// 使用element-plus
app.use(ElementPlus)
app.mount('#app')
