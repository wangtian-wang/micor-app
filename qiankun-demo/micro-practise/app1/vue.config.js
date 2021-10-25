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
      'vue-router': 'VueRouter'
    }
  }
};
