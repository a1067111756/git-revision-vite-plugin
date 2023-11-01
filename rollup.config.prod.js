import path from 'path'
import { fileURLToPath } from 'url'
import json from '@rollup/plugin-json'
import babel from '@rollup/plugin-babel'
import terser from '@rollup/plugin-terser'
import commonjs from '@rollup/plugin-commonjs'
import typescript from '@rollup/plugin-typescript'
import { visualizer } from 'rollup-plugin-visualizer'
import { nodeResolve } from '@rollup/plugin-node-resolve'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

export default {
  input: path.resolve(__dirname, './lib/index.ts'), // 入口文件
  output: [
    {
      // 打包umd格式文件
      file: path.resolve(__dirname, './dist/bundle.min.js'), // 输出路劲
      format: 'umd', // umd - 统一兼容模式
      name: 'GlobEagerAutoDeclarePlugin', // 对外暴露的顶级变量
      sourcemap: false, // 关闭sourcemap
      exports: 'named'
    },
    {
      // 打包es格式文件
      file: path.resolve(__dirname, './dist/bundle.min.mjs'), // 输出路劲
      format: 'es', // es6模式
      name: 'GlobEagerAutoDeclarePlugin', // 对外暴露的顶级变量
      sourcemap: false, // 关闭sourcemap
      exports: 'named'
    },
    {
      // 打包es格式文件
      file: path.resolve(__dirname, './dist/bundle.min.cjs'), // 输出路劲
      format: 'cjs', // commonJs模式
      name: 'GlobEagerAutoDeclarePlugin', // 对外暴露的顶级变量
      sourcemap: false, // 关闭sourcemap
      exports: 'named'
    }
  ],
  // 排除打包的资源
  external: [],
  // 插件
  plugins: [
    nodeResolve({ exportConditions: ['node'] }), // 三方依赖打包
    commonjs(), // 支持commonJs语法
    babel({ babelHelpers: 'bundled', }), // babel语法转义
    typescript({ sourceMap: false, tsconfig: './tsconfig.json' }), // 不生成sourceMap
    json(), // 支持引用json文件
    terser(), // 压缩插件
    visualizer(), // 包分析工具
  ]
}
