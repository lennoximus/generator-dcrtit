const mkdirp = require('mkdirp-promise'),
      chalk = require('chalk'),
      fss = require('fs'),
      path = require('path'),
      HtmlBundler = require('./html-bundler'),
      PaletteReceiver = require('./palette-receiver'),
      JsBundler = require('./js-bundler'),
      StaticBundler = require('./static-bundler')

const AssetsBundler = () => {
  const generator = global.generator,
        {projectName, frameworkName} = generator.props,
        pagesList = generator.props.pagesList.split(' '),
        fontsExtentions = [
          '.eot',
          '.svg',
          '.ttf',
          '.woff'
        ]
  const folderNames = []
  const fontsNames = []

  // FontExts.forEach(font => {
  //   Console.log(filterDir(generator.destinationPath(), font))
  //   FilterDir(generator.destinationPath(), font).forEach(fontFile => {
  //     Const fontName = fontFile.split('.')[0].split('-')[0],
  //     FolderName = fontFile.split('.')[0].split('-')[fontFile.split('.')[0].split('-').length - 1]
  //
  //     If (!folderNames.includes(folderName)) {
  //       FolderNames.push(folderName)
  //     }
  //     If (!fontsNames.includes(fontName)) {
  //       FontsNames.push(fontName)
  //     }
  //   })
  // })

  HtmlBundler()
  JsBundler()
  StaticBundler()
  PaletteReceiver()

  if (frameworkName === 'JQuery') {
    mkdirp('src/img/fish')
      .then()
      .catch(error => {
        console.error(`${chalk.bgRed('Something went wrong while generating ') + chalk.bgCyan('images ')}folder: ${chalk.red(error)}`)
      })
    mkdirp('src/fonts')
      .then(() => {
        mkdirp('src/fonts/bold')
        mkdirp('src/fonts/regular')
      })
      .catch(error => {
        console.error(`${chalk.bgRed('Something went wrong while generating ') + chalk.bgBlack('fonts ')}folder: ${chalk.red(error)}`)
      })
    mkdirp('src/scss')
      .then(() => {
        mkdirp('src/scss/styles/pages')
        mkdirp('src/scss/vendor')
        if (generator.props.pagesList.length !== 0) {
          pagesList.forEach(page => {
            generator.fs.write(`src/scss/styles/pages/_${page}.scss`, `.p-${page} {\n\n}`)
          })
        }
        generator.fs.write('src/scss/styles/_global.scss', '* {\r\n  box-sizing: border-box;\r\n}\r\n\r\nhtml {\r\n  width: 100%;\r\n\r\n}\r\n\r\nbody {\r\n  width: 100%;\r\n}\n\n.g {\n\n}')
        generator.fs.write('src/scss/styles/_freq.scss', '.f {\n\n}')
        generator.fs.copy(generator.templatePath('../utils/styles'), generator.destinationPath('src/scss/utils'))
        generator.fs.write('src/scss/index.scss', '@import \'utils\/normalize\';\r\n@import \'utils\/variables\';\r\n@import \'utils\/mixins\';\r\n@import \'utils\/fonts\';\r\n\r\n@import \'styles\/global\';\r\n@import \'styles\/freq\';\r\n')
        if (generator.props.pagesList.length !== 0) {
          pagesList.forEach(page => {
            generator.fs.append('src/scss/index.scss', `@import 'styles/pages/${page}';\r\n`)
          })
        }
      })
      .catch(error => {
        console.error(`${chalk.bgRed('Something went wrong while generating ') + chalk.bgBlue('styles ')}folder: ${chalk.red(error)}`)
      })
  }
  else if (frameworkName === 'VueJS') {
    mkdirp('src/img/fish')
      .then()
      .catch(error => {
        console.error(`${chalk.bgRed('Something went wrong while generating ') + chalk.bgCyan('images ')}folder: ${chalk.red(error)}`)
      })
    mkdirp('src/fonts')
      .then(() => {
        mkdirp('src/fonts/bold')
        mkdirp('src/fonts/regular')
      })
      .catch(error => {
        console.error(`${chalk.bgRed('Something went wrong while generating ') + chalk.bgBlack('fonts ')}folder: ${chalk.red(error)}`)
      })
    mkdirp('src/scss')
      .then(() => {
        mkdirp('src/scss/styles/pages')
        mkdirp('src/scss/vendor')
        if (generator.props.pagesList.length !== 0) {
          pagesList.forEach(page => {
            generator.fs.write(`src/scss/styles/pages/_${page}.scss`, `.p-${page} {\n\n}`)
          })
        }
        generator.fs.write('src/scss/styles/_global.scss', '* {\r\n  box-sizing: border-box;\r\n}\r\n\r\nhtml {\r\n  width: 100%;\r\n\r\n}\r\n\r\nbody {\r\n  width: 100%;\r\n}\n\n.g {\n\n}')
        generator.fs.write('src/scss/styles/_freq.scss', '.f {\n\n}')
        generator.fs.copy(generator.templatePath('../utils/styles'), generator.destinationPath('src/scss/utils'))
        generator.fs.write('src/scss/index.scss', '@import \'utils\/normalize\';\r\n@import \'utils\/variables\';\r\n@import \'utils\/mixins\';\r\n@import \'utils\/fonts\';\r\n\r\n@import \'styles\/global\';\r\n@import \'styles\/freq\';')
        if (generator.props.pagesList.length !== 0) {
          pagesList.forEach(page => {
            generator.fs.append('src/scss/index.scss', `@import 'styles/pages/${page}';\r\n`)
          })
        }
      })
      .catch(error => {
        console.error(`${chalk.bgRed('Something went wrong while generating ') + chalk.bgBlue('styles ')}folder: ${chalk.red(error)}`)
      })
  }
}

module.exports = AssetsBundler
