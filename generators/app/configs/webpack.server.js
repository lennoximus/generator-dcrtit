const app = require('express')(),
      staticServer = require('serve-static'),
      webpackConfig = require('./webpack.config.js'),
      webpack = require('webpack'),
      webpackMiddleware = require('webpack-dev-middleware'),
      hotMiddleware = require('webpack-hot-middleware'),
      path = require('path'),
      compiler = webpack(webpackConfig)

app.use(webpackMiddleware(compiler, {
  noInfo: false,
  publicPath: webpackConfig.output.publicPath,
  stats: {colors: true},
  headers: {'Access-Control-Allow-Origin': '*'}
}))

app.use(hotMiddleware(compiler, {heartbeat: 500}))

app.use(staticServer(
  path.resolve(__dirname, '../dist'),
  {index: false})
)

app.get('*', (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.sendFile(path.resolve(__dirname, '../dist/index.html'))
})

app.listen(1488)
  .on('connection', sock => sock.setNoDelay(true))