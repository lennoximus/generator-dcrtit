const mkdirp = require('mkdirp-promise'),
      chalk = require('chalk'),
      fss = require('fs'),
      path = require('path'),
      GetColors = require('get-image-colors'),
      HtmlBundler = require('./html-bundler')

function filterDir (startPath, filter) {
  if (!fss.existsSync(startPath)) { //eslint-disable-line
    console.log('No such directory found:', startPath)

    return
  }

  const files = fss.readdirSync(startPath) //eslint-disable-line
  const resultArray = []

  for (let i = 0; i < files.length; i++) {
    const filename = path.join(startPath, files[i])
    const stat = fss.lstatSync(filename) //eslint-disable-line

    if (stat.isDirectory()) {
      filterDir(filename, filter) // Recurse
    }
    else if (filename.indexOf(filter) >= 0) {
      // Console.log('-- found: ', filename.split('\\'))
      const pathArray = filename.split('\\')

      resultArray.push(pathArray[pathArray.length - 1])
    }
  }

  if (resultArray.length !== 0) {
    return resultArray
  }
}

const AssetsBundler = () => {
  const generator = global.generator,
        {projectName, frameworkName} = generator.props,
        pagesList = generator.props.pagesList.split(' '),
        paletteArray = filterDir(generator.destinationPath(), '.png'),
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

  if (frameworkName === 'JQuery') {

    mkdirp('src/js')
      .then(() => generator.fs.write('src/js/main.js', '$(\'document\').ready(() => {\n})'))
      .catch(error => {
        console.error(`${chalk.bgRed('Something went wrong while generating ') + chalk.bgYellow('javascript ')}folder: ${chalk.red(error)}`)
      })
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
    if (paletteArray !== undefined && paletteArray.length !== 0) {
      paletteArray.forEach(palette => {
        GetColors(palette)
          .then(colors => {
            generator.fs.append('src/scss/utils/_variables.scss', `$c-color: ${colors.map(color => color.hex())[0]};\r\n`)
          })
      })
    }
  }
  else if (frameworkName === 'VueJS') {
    generator.fs.copyTpl(generator.templatePath('vuejs/index_vue.html'),
      generator.destinationPath('src/html/index.html'),
      {title: generator.props.projectName})
    mkdirp('src/js')
      .then(() => {
        mkdirp('src/js/client/components/common')
        mkdirp('src/js/client/components/pages')
        mkdirp('src/js/client/router')
        mkdirp('src/js/client/store')
        mkdirp('src/js/client/')
        generator.fs.copy(generator.templatePath('vuejs/store'), generator.destinationPath('src/js/client/store'))
        generator.fs.copy(generator.templatePath('vuejs/index.js'), generator.destinationPath('src/js/client/index.js'))
        generator.fs.copy(generator.templatePath('vuejs/polyfill.js'), generator.destinationPath('src/js/client/polyfill.js'))
        generator.fs.copy(generator.templatePath('vuejs/components/Index.vue'), generator.destinationPath('src/js/client/components/App.vue'))
        if (generator.props.pagesList.length !== 0) {
          pagesList.forEach(page => {
            generator.fs.copyTpl(generator.templatePath('vuejs/components/Page.vue'),
              generator.destinationPath(`src/js/client/components/pages/${page}.vue`),
              {pageName: page})
          })
          generator.fs.copyTpl(generator.templatePath('vuejs/router/index.js'),
            generator.destinationPath('src/js/client/router/index.js'),
            {pages: pagesList})
        }
        else {
          generator.fs.copyTpl(generator.templatePath('vuejs/router/index.js'),
            generator.destinationPath('src/js/client/router/index.js'),
            {pages: ''})
        }
      })
      .catch(error => {
        console.error(`${chalk.bgRed('Something went wrong while generating ') + chalk.bgYellow('javascript ')}folder: ${chalk.red(error)}`)
      })
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
    if (paletteArray !== undefined && paletteArray.length !== 0) {
      paletteArray.forEach(palette => {
        GetColors(palette)
          .then(colors => {
            generator.fs.append('src/scss/utils/_variables.scss', `$c-color: ${colors.map(color => color.hex())[0]};\r\n`)
          })
      })
    }
  }
}

module.exports = AssetsBundler
