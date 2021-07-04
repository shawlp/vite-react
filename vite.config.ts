import { defineConfig } from 'vite'
import reactRefresh from '@vitejs/plugin-react-refresh'
import legacy from '@vitejs/plugin-legacy'
import vitePluginHtml from 'vite-plugin-html'
import reactJsx from 'vite-react-jsx'
import viteESLint from '@ehutch79/vite-eslint'
// import vitePluginImp from 'vite-plugin-imp'
import path from 'path'

export default defineConfig({
  plugins: [
    reactRefresh(),
    legacy({
      // 为打包后的文件提供传统浏览器兼容性支持
      targets: [
        'Android >= 39',
        'Chrome >= 50',
        'Safari >= 10.1',
        'iOS >= 10.3',
        'Firefox >= 54',
        'Edge >= 15',
        '> 1%',
        'not IE 11'
      ]
    }),
    vitePluginHtml({
      minify: true,
      inject: {
        injectData: {
          title: 'vite-react'
        },
        injectOptions: {
          filename: './index.html'
        }
      }
    }),
    reactJsx(),
    viteESLint({ include: ['src/**/*.js', 'src/**/*.ts', 'src/**/*.jsx', 'src/**/*.tsx'] })
    // vitePluginImp({
    //   libList: [
    //     {
    //       libName: 'antd',
    //       libDirectory: 'es',
    //       style: (name) => `antd/es/${name}/style`
    //     }
    //   ]
    // })
  ],
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
    alias: [
      {
        find: /@\//,
        replacement: path.join(__dirname, './src/')
      }
    ]
  },
  css: {
    // css相关处理
    preprocessorOptions: {
      less: {
        // 支持内联 JavaScript
        javascriptEnabled: true
      }
    },
    modules: {
      scopeBehaviour: 'local',
      localsConvention: 'camelCase'
    },
    postcss: {
      plugins: [
        require('autoprefixer')
        // require('postcss-pxtorem')({
        //   rootValue: 200,
        //   propList: ['*'],
        //   selectorBlackList: [],
        //   replace: true,
        //   mediaQuery: false,
        //   minPixelValue: 0,
        //   exclude: /node_modules/i
        // })
      ]
    }
  },
  build: {
    target: 'es2015',
    minify: 'terser',
    cssCodeSplit: true,
    polyfillDynamicImport: true,
    sourcemap: false,
    manifest: false,
    outDir: 'dist',
    rollupOptions: {
      plugins: []
    }
  },
  server: {
    host: '127.0.0.1',
    open: true,
    port: 8888
  }
})
