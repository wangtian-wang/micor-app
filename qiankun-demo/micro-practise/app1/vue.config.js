let port = 8081;
const packageName = require('./package.json').name;
const publicPath = process.env.NODE_ENV === 'production' ? '/app1' : '/';
module.exports = {
  publicPath,
  devServer: {
    open: true,
    port: port,
    headers: {
      'Access-Control-Allow-Origin': '*'
    }
  },
  configureWebpack: {
    output: {
      library: packageName,
      libraryTarget: 'umd',
      chunkLoadingGlobal: `chunkLoadingGlobal_${packageName}`
    },
    externals: {
      // 在使用import vuerouter from 'vue-router' 时候，不打包vue-router 这个包；并且去找全局的VueRouter 变量
      'vue-router': 'VueRouter'
    }
  }
};
