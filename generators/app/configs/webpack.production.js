const path = require('path'),
      webpack = require('webpack'),
      OptimizeJsPlugin = require('optimize-js-plugin')

module.exports = {
  entry: path.resolve(__dirname, './js/client/index.js'),

  resolve: {
    alias: {
      axios: 'axios/dist/axios.min',
      bluebird: 'bluebird/js/browser/bluebird.core.min'
    }
  },

  output: {
    path: path.resolve(__dirname, '../public/js'),
    publicPath: '/js/',
    filename: 'main.[hash].js'
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
          minified: true
        }
      }
    ]
  },

  plugins: [
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      },
      'API_PATH': '"/"'
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: false,
      beautify: false,
      comments: false,
      compress: {
        sequences: true,
        booleans: true,
        loops: true,
        unused: true,
        warnings: false,
        drop_console: false, // eslint-disable-line camelcase
        unsafe: true
      },
      mangle: {except: ['document']}
    }),
    new OptimizeJsPlugin({
      sourceMap: false
    })
  ],

  performance: {
    maxEntrypointSize: 400000,
    assetFilter: assetFilename => assetFilename.endsWith('.js')
  }
}
