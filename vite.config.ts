import { defineConfig, ConfigEnv, UserConfigExport } from 'vite'
import reactRefresh from '@vitejs/plugin-react-refresh'
import legacy from '@vitejs/plugin-legacy'
import vitePluginHtml, { minifyHtml } from 'vite-plugin-html'
import reactJsx from 'vite-react-jsx'
import viteESLint from '@ehutch79/vite-eslint'
import { cjs2esmVitePlugin } from 'cjs2esmodule'
// import vitePluginImp from 'vite-plugin-imp'
import dotenv from 'dotenv'
import visualizer from 'rollup-plugin-visualizer'
import path from 'path'
import fs from 'fs'

const config: UserConfigExport = {
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
      ],
      additionalLegacyPolyfills: ['regenerator-runtime/runtime']
    }),
    vitePluginHtml({
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
    viteESLint({ include: ['src/**/*.js', 'src/**/*.ts', 'src/**/*.jsx', 'src/**/*.tsx'] }),
    cjs2esmVitePlugin() // 将 commonjs 转化为 es module
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
        // eslint-disable-next-line global-require
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
      // plugins: [
      //   visualizer({
      //     open: true,
      //     gzipSize: true,
      //     brotliSize: true
      //   })
      // ],
      external: 'react/jsx-runtime'
    }
  }
}

/** 根据命令行设置process.env */
function setEnv() {
  try {
    // 根据环境变量加载环境变量文件
    const file = dotenv.parse(fs.readFileSync(`./env/.env.${process.env.NODE_ENV}`), {
      debug: true
    })
    // 根据获取的 key 给对应的环境变量赋值
    // eslint-disable-next-line no-restricted-syntax
    for (const [key, value] of Object.entries(file)) {
      process.env[key] = value
    }
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error(e)
  }
}

export default ({ command, mode }: ConfigEnv) => {
  console.log('mode:', mode, ' command:', command)
  setEnv()
  const {
    plugins = [],
    build: { rollupOptions }
  } = config
  const { API_LOCATION, VITE_API_HOST, VISUALIZER } = process.env
  console.log('VISUALIZER', VISUALIZER)

  const isBuild = command === 'build'

  if (isBuild) {
    config.plugins = [...plugins, minifyHtml()]
    config.define = {
      'process.env.NODE_ENV': 'production'
    }
  }

  if (VISUALIZER) {
    config.build.rollupOptions = {
      ...rollupOptions,
      plugins: [
        visualizer({
          open: true,
          gzipSize: true,
          brotliSize: true
        })
      ]
    }
  }

  if (command === 'serve') {
    config.server = {
      host: '127.0.0.1',
      open: true,
      port: 8888,
      proxy: {
        [API_LOCATION]: {
          target: VITE_API_HOST,
          changeOrigin: true,
          rewrite: (pathName) => pathName.replace(API_LOCATION, '')
        }
      }
    }
  }

  return config
}
