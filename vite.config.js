import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    host: '0.0.0.0',
  },
  base:"/sun_moon_public/", //设置项目的根目录
  build: {
    outDir: 'docs'
  }
})
