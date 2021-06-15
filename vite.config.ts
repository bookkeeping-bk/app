/*
 * @Author: Mojie
 * @Date: 2021-06-10 16:25:50
 */

import vue from '@vitejs/plugin-vue'
import dayjs from 'dayjs'
import { defineConfig } from 'vite'
import { injectHtml } from 'vite-plugin-html'
import { resolve } from 'path'
import styleImport from 'vite-plugin-style-import'

require('dotenv').config()

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    // alias: {
    //   '@': resolve(__dirname, 'src'),
    // },

    alias: [
      { find: /^@\//, replacement: resolve(__dirname, 'src') + '/' },

      // 由于vite暂时不支持less的~导入, 需要替换成空字符串
      { find: /^~/, replacement: '' },
    ],
  },
  base: process.env.PUBLIC_PATH,
  server: {
    port: ~~process.env.PORT,
    open: process.env.OPEN === 'true',
  },
  build: {
    outDir: process.env.OUTPUT_DIR,
    assetsDir: process.env.ASSETS_DIR,
    sourcemap: process.env.PRODUCTION_SOURCE_MAP === 'true',
  },
  plugins: [
    vue(),
    injectHtml({
      injectData: {
        title: process.env.VITE_TITLE,
        releaseTime: dayjs().format('YYYY-MM-DD HH:mm:ss'),
      },
    }),
    styleImport({
      libs: [
        {
          libraryName: 'vant',
          esModule: true,
          resolveStyle: (name) => `vant/es/${name}/style/less`,
        },
      ],
    }),
  ],
  css: {
    preprocessorOptions: {
      // 注入全局变量
      scss: {
        additionalData: '@import "./src/assets/scss/variables.scss";',
      },

      // 自定义vant样式主题
      less: {
        javascriptEnabled: true,
        modifyVars: {
          hack: `true; @import "./src/assets/vant-variables.less";`,
        },
      },
    },
  },
})
