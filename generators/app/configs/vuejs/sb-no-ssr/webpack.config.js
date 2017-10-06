const path = require('path'),
      webpack = require('webpack')

module.exports = {
  entry: ['webpack-hot-middleware/client?path=http://localhost:1488/__webpack_hmr&reload=true&timeout=1000&overlay=false', path.resolve(__dirname, './js/client/index.js')],

  output: {
    path: path.resolve(__dirname, '../dist/client/js'),
    filename: 'main.js',
    publicPath: '/js'
  },

  resolve: {
    unsafeCache: true,
    alias: {
      axios: 'axios/dist/axios.min',
      bluebird: 'bluebird/js/browser/bluebird.core.min'
    }
  },

  module: {
    rules: [
      {
        test: /\.vue?$/,
        exclude: /node_modules/,
        loader: 'vue-loader'
      },
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: [['es2015', {modules: false}], 'stage-0'],
          plugins: ['transform-runtime'],
          cacheDirectory: true
        }
      }
    ]
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"development"'
      },
      'API_PATH': '"/"'
    })
  ],

  performance: {
    maxEntrypointSize: 400000,
    assetFilter: assetFilename => assetFilename.endsWith('.js')
  },

  devtool: 'eval'
}
