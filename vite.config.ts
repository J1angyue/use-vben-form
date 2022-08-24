import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import eslintPlugin from 'vite-plugin-eslint'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { ViteEjsPlugin } from 'vite-plugin-ejs'
import fs from 'fs'
function resolveDirs (...dir: string[]) {
  return resolve(process.cwd(), ...dir)
}

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    open: true,
  },
  resolve: {
    alias: {
      '@': resolveDirs('src'),
      '@t': resolveDirs('src/types'),
      '@u': resolveDirs('src/utils'),
      '@c': resolveDirs('src/components'),
      '@e': resolveDirs('src/experiments')
    }
  },
  plugins: [
    vue(),
    vueJsx(),
    eslintPlugin(),
    ViteEjsPlugin({
      loadingHTMLFragement: fs.readFileSync('src/loading.html')
    })
  ]
})
