import { fileURLToPath, URL } from 'node:url'
import { defineConfig, normalizePath } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

import { createMpaPlugin, createPages } from 'vite-plugin-virtual-mpa'

import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'
import compression from 'vite-plugin-compression'

import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

const isProd = process.env.NODE_ENV === 'production'

const pages = createPages([
  {
    name: 'management',
    filename: isProd ? 'management.html' : 'src/management/index.html',
    template: 'src/management/index.html',
    entry: '/src/management/main.js'
  },
  {
    name: 'render',
    filename: isProd ? 'render.html' : 'src/render/index.html',
    template: 'src/render/index.html',
    entry: '/src/render/main.js'
  }
])
const mpaPlugin = createMpaPlugin({
  pages,
  verbose: true,
  rewrites: [
    {
      from: /render/,
      to: () => normalizePath('/src/render/index.html')
    },
    {
      from: /management\/preview/,
      to: () => normalizePath('/src/render/index.html')
    },
    {
      from: /\/|\/management\/.?/,
      to: () => normalizePath('/src/management/index.html')
    }
  ]
})

// https://vitejs.dev/config/
export default defineConfig({
  optimizeDeps: {
    include: [
      'lodash-es',
      'async-validator',
      'vuedraggable',
      'element-plus/es',
      '@wangeditor/editor-for-vue',
      'element-plus/es/components/*/style/index',
      'element-plus/es/locale/lang/zh-cn',
      'element-plus/es/locale/lang/en',
      'vue-i18n',
      'copy-to-clipboard',
      'qrcode',
      'moment',
      'moment/locale/zh-cn',
      'echarts',
      'nanoid',
      'yup',
      'crypto-js/sha256',
      'element-plus/es/locale/lang/zh-cn',
      'node-forge',
      '@logicflow/core',
      '@logicflow/extension'
    ],
    force: true,
    esbuildOptions: {
      target: 'es2020'
    }
  },
  plugins: [
    vue(),
    vueJsx(),
    AutoImport({
      resolvers: [
        ElementPlusResolver(),
        // Auto import icon components
        IconsResolver({
          prefix: 'Icon'
        })
      ]
    }),
    Components({
      resolvers: [
        ElementPlusResolver({
          importStyle: 'sass'
        }),
        // Auto register icon components
        IconsResolver({
          enabledCollections: ['ep']
        })
      ]
    }),
    Icons({
      autoInstall: true
    }),
    mpaPlugin,
    compression({
      algorithm: 'gzip',
      threshold: 1024,
      deleteOriginFile: false
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '@management': fileURLToPath(new URL('./src/management', import.meta.url)),
      '@materials': fileURLToPath(new URL('./src/materials', import.meta.url)),
      '@render': fileURLToPath(new URL('./src/render', import.meta.url))
    }
  },
  appType: 'mpa',
  css: {
    devSourcemap: false,
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler',
        additionalData: `@use "@/management/styles/element-variables.scss" as *;`
      }
    }
  },
  server: {
    host: '0.0.0.0',
    port: 8080,
    open: false, // 是否自动打开浏览器
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:3000',
        changeOrigin: true
      },
      '/exportfile': {
        target: 'http://127.0.0.1:3000',
        changeOrigin: true
      },
      // 静态文件的默认存储文件夹
      '/userUpload': {
        target: 'http://127.0.0.1:3000',
        changeOrigin: true
      }
    }
  },
  build: {
    target: 'es2020',
    minify: 'terser',
    cssMinify: true,
    sourcemap: false,
    chunkSizeWarningLimit: 1000,
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        pure_funcs: ['console.log']
      }
    },
    rollupOptions: {
      output: {
        assetFileNames: '[ext]/[name]-[hash].[ext]',
        chunkFileNames: 'js/[name]-[hash].js',
        entryFileNames: 'js/[name]-[hash].js',
        manualChunks(id) {
          // 优化chunk拆分策略
          if (id.includes('element-plus')) {
            return 'element-plus'
          }
          if (id.includes('@wangeditor')) {
            return 'wangeditor'
          }
          if (id.includes('node-forge')) {
            return 'node-forge'
          }
          if (id.includes('echarts')) {
            return 'echarts'
          }
          if (id.includes('vue-router')) {
            return 'vue-router'
          }
          if (id.includes('vue-i18n')) {
            return 'vue-i18n'
          }
          if (id.includes('lodash-es')) {
            return 'lodash'
          }
          if (id.includes('@logicflow')) {
            return 'logicflow'
          }
          // 将剩余的node_modules分组到vendor chunk
          if (id.includes('node_modules')) {
            return 'vendor'
          }
        }
      }
    }
  }
})
