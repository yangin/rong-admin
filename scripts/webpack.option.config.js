const { cpus } = require('os')
const { resolve } = require('path')

const HtmlWebpackPlugin = require('html-webpack-plugin')

const PATH_ROOT = resolve(__dirname, '../')
const PATH_SRC_ROOT = resolve(__dirname, '../src/')
const BUILD_CPU_COUNT = Math.min(cpus().length, 6) || 2 // too much thread may also cause memory explode slow down (~800MB for each thread) || 2

const isProduction = process.env.NODE_ENV === 'production'

const entryConfig = {
  'index': {
    entry: resolve(PATH_SRC_ROOT, 'index.tsx'),
    template: 'index.html'
  }
}

// 将 entryConfig 转换成 webpackConfig.entry 的格式 { entryName: entryFilePath }
const getEntryOption = () => Object.entries(entryConfig).reduce((result, [entryName, config]) => {
  Object.assign(result, { [ entryName ]: config.entry })
  return result
}, {})

// 将 entryConfig 转换成 webpackConfig.entry 的格式 { entryName: entryFilePath }
const getDevEntryOption = () => Object.entries(entryConfig).map(([entryName, config]) => ({ from: config.matchPath, to: `/${config.template}` }))

// { from: /^\/(app|app\/)/, to: '/app.html' },

// 根据 entryConfig 获取 HtmlWebpackPlugin
const getHtmlWebpackPluginList = () => Object.entries(entryConfig).map(([entryName, config]) => new HtmlWebpackPlugin({
  filename: config.template, // 打包输出的html文件名
  template: resolve(PATH_ROOT, `templates/${config.template}`), // 引用模板html文件生成项目的入口文件html
  chunks: [entryName] // 将指定名称的脚本注入到html模板中
  // templateContent: require('./templates/index'),  // 将内容直接覆盖到html模板中，通常从js文件中引入
  // inject: false  // 如果为false, 则禁止在html模板中注入脚本
}))

const getThreadLoader = ({ isProduction }) => ({ loader: 'thread-loader', options: { workers: BUILD_CPU_COUNT, poolParallelJobs: 64, poolTimeout: isProduction ? 500 : Infinity } })
const getBabelLoader = () => ({
  loader: 'babel-loader',
  options: {
    // cacheDirectory: isProduction && resolve(PATH_ROOT, '.cache/babel-loader/'), //默认值为 false。当有设置时，指定的目录将用来缓存 loader 的执行结果。之后的 Webpack 构建，将会尝试读取缓存，来避免在每次执行时，可能产生的、高性能消耗的 Babel 重新编译过程。
    // cacheCompression: false,
    configFile: false, babelrc: false, // do NOT use `babel.config.js`
    presets: [
      ['@babel/preset-env', { useBuiltIns: 'usage', corejs: 3.22 }],
      '@babel/preset-react',
      ['@babel/preset-typescript', { isTSX: true, allExtensions: true, allowNamespaces: true }]
    ]
  }
})
const getPostCssLoader = () => ({ loader: 'postcss-loader', options: { postcssOptions: { plugins: [require('autoprefixer')()] } } }) // 给css自动添加前缀

module.exports = {
  PATH_ROOT,
  PATH_SRC_ROOT,
  isProduction,
  getEntryOption,
  getDevEntryOption,
  getHtmlWebpackPluginList,
  getThreadLoader,
  getBabelLoader,
  getPostCssLoader
}
