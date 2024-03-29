const { merge } = require('webpack-merge')
const webpackConfigBase = require('./webpack.base.config.js')

const webpackConfigDev = {
  mode: 'development',
  target: ['web', 'es5'],
  // devServer 为热更新服务，通过hot:true来启动
  devServer: {
    // contentBase: resolve(PATH_ROOT, 'public'), // 当存在静态资源时，此项必须有。指向开发的静态资源目录，配合url-loader的outPath，匹配文件中的静态资源引用地址。
    hot: true,
    open: true, // 启动后是否在浏览器自动打开
    host: 'localhost',
    port: 8090
    // historyApiFallback: true, // 为true时，当路径找不到时，即404时，会重新加载本页面，否则报错。当react-router为BrowserRouter时，需要配置为true,否则原路径刷新报错，此时也可以用HashRoute来代替
    // historyApiFallback: {
    //   rewrites: [
    //     ...getDevEntryOption(),
    //     { from: /./, to: '/app.html' } // 默认重定向
    //   ]
    // }
    // compress: true, // enable gzip compression
    // proxy: { // proxy URLs to backend development server
    //   '/api': 'http://localhost:3000'
    // },
  }
}

module.exports = merge(webpackConfigBase, webpackConfigDev)
