const HtmlBundler = require('./html-bundler'),
      PaletteReceiver = require('./palette-receiver'),
      JsBundler = require('./js-bundler'),
      StaticBundler = require('./static-bundler'),
      StylesBundler = require('./styles-bundler')

const AssetsBundler = () => {
  HtmlBundler()
  JsBundler()
  StylesBundler()
  StaticBundler()
  PaletteReceiver()
}

module.exports = AssetsBundler
