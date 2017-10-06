const path = require('path'),
      webpack = require('webpack'),
      VueSSRServerPlugin = require('vue-server-renderer/server-plugin'),
      CopyWebpackPlugin = require('copy-webpack-plugin')

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
  entry: path.resolve(__dirname, './js/entry-server.js'),

  output: {
    path: path.resolve(__dirname, '../dist/server'),
    libraryTarget: 'commonjs2',
    filename: 'ssr-bundle.js'
  },

  target: 'node',

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
        loader: 'babel-loader?cacheDirectory'
      }
    ]
  },

  plugins: [
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env': {NODE_ENV: '"development"'},
      'API_PATH': '"/api/"'
    }),
    new VueSSRServerPlugin(),
    new CopyWebpackPlugin([{from: './js/server/**/*'}])
  ],

  performance: {
    maxEntrypointSize: 400000,
    assetFilter: assetFilename => assetFilename.endsWith('.js')
  }
}
