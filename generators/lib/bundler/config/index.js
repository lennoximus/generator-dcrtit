const fsExtra = require('fs-extra')

const ConfigBundler = (generatorInstance, frameworkName) => {
  if (frameworkName === 'JQuery') {
    fsExtra.copy(generatorInstance.templatePath('../configs/.eslintrc.json'), generatorInstance.destinationPath('.eslintrc.json'))
    fsExtra.copy(generatorInstance.templatePath('../configs/.gitignore'), generatorInstance.destinationPath('.gitignore'))
    fsExtra.copy(generatorInstance.templatePath('../configs/csscomb.json'), generatorInstance.destinationPath('csscomb.json'))
    fsExtra.copy(generatorInstance.templatePath('../configs/gulpfile.js'), generatorInstance.destinationPath('gulpfile.js'))
  }
  else if (frameworkName === 'VueJS') {
    fsExtra.copy(generatorInstance.templatePath('../configs/.gitignore'), generatorInstance.destinationPath('.gitignore'))
    fsExtra.copy(generatorInstance.templatePath('../configs/.babelrc'), generatorInstance.destinationPath('src/.babelrc'))
    fsExtra.copy(generatorInstance.templatePath('../configs/.eslintrc.json'), generatorInstance.destinationPath('src/.eslintrc.json'))
    fsExtra.copy(generatorInstance.templatePath('../configs/csscomb.json'), generatorInstance.destinationPath('src/csscomb.json'))
    fsExtra.copy(generatorInstance.templatePath('../configs/gulpfile_vue.js'), generatorInstance.destinationPath('src/gulpfile.js'))
    fsExtra.copy(generatorInstance.templatePath('../configs/webpack.config.js'), generatorInstance.destinationPath('src/webpack.config.js'))
    fsExtra.copy(generatorInstance.templatePath('../configs/webpack.production.js'), generatorInstance.destinationPath('src/webpack.production.js'))
    fsExtra.copy(generatorInstance.templatePath('../configs/webpack.server.js'), generatorInstance.destinationPath('src/webpack.server.js'))
  }
}

module.exports = ConfigBundler
