const path = require('path'),
      webpack = require('webpack')

function exclude (modules) {
  let pathSep = path.sep

  if (pathSep === '\\') {
    pathSep = '\\\\'
  }

  const moduleRegExps = modules
    .map(modName => new RegExp(`node_modules${pathSep}${modName}`))

  return modulePath => {
    if (/node_modules/.test(modulePath)) {
      for (let i = 0; i < moduleRegExps.length; i++) {
        if (moduleRegExps[i].test(modulePath)) {
          return false
        }
      }

      return true
    }

    return false
  }
}

module.exports = {
  entry: path.resolve(__dirname, './js/entry-client.js'),

  output: {
    path: path.resolve(__dirname, '../dist/client/js'),
    filename: 'main.js',
    publicPath: '/js'
  },

  resolve: {
    unsafeCache: true,
    alias: {
      axios: 'axios/dist/axios.min'
    }
  },

  module: {
    rules: [
      {
        test: /\.vue?$/,
        exclude: exclude(['vue-slider-component']),
        loader: 'vue-loader'
      },
      {
        test: /\.js?$/,
        exclude: exclude(['v-img']),
        loader: 'babel-loader'
      }
    ]
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.optimize.ModuleConcatenationPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env': {NODE_ENV: '"development"'},
      'API_PATH': '"/api/"'
    })
  ],

  performance: {
    maxEntrypointSize: 400000,
    assetFilter: assetFilename => assetFilename.endsWith('.js')
  },

  devtool: 'cheap-eval'
}
