import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Inspect from 'vite-plugin-inspect'
import path from "path";

export default defineConfig({
  plugins: [
    Inspect(),
    vue()
  ],
  build: {
    lib: {
      entry: path.resolve(__dirname, './lib/index.ts'),
      name: 'GitRevisionVitePlugin',
      formats: ['es', 'umd', 'cjs']
    },
    rollupOptions: {
      external: ['vue'],
      output: {
        globals: {
          'vue': 'Vue'
        }
      }
    }
  }
})
