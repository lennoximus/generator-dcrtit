const fsExtra = require('fs-extra')

const ConfigBundler = () => {
  const generator = global.generator,
        {frameworkName} = generator.props,
        configRootPath = {
          global: '../configs/global/',
          jquery: '../configs/jquery/',
          vuejs: '../configs/vuejs/'
        },
        destPath = {
          jquery: '',
          vuejs: 'src/'
        }

  fsExtra.copy(generator.templatePath(`${configRootPath.global}.gitignore`), generator.destinationPath('.gitignore'))
  if (frameworkName === 'JQuery') {
    const globalFiles = ['.eslintrc.json', 'csscomb.json'],
          jqueryFiles = ['gulpfile.js']

    globalFiles.forEach(file =>
      fsExtra.copy(
        generator.templatePath(configRootPath.global + file),
        generator.destinationPath(destPath.jquery + file)
      )
    )
    jqueryFiles.forEach(file =>
      fsExtra.copy(
        generator.templatePath(configRootPath.jquery + file),
        generator.destinationPath(destPath.jquery + file)
      )
    )
  }
  else if (frameworkName === 'VueJS') {
    const globalFiles = ['.eslintrc.json', 'csscomb.json'],
          vuejsFiles = [
            '.babelrc',
            'gulpfile.js',
            'webpack.config.js',
            'webpack.production.js',
            'webpack.server.js'
          ]

    globalFiles.forEach(file =>
      fsExtra.copy(
        generator.templatePath(configRootPath.global + file),
        generator.destinationPath(destPath.vuejs + file)
      )
    )
    vuejsFiles.forEach(file =>
      fsExtra.copy(
        generator.templatePath(configRootPath.vuejs + file),
        generator.destinationPath(destPath.vuejs + file)
      )
    )
  }
}

module.exports = ConfigBundler
