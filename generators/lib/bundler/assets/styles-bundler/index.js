const mkdirp = require('mkdirp-promise'),
      chalk = require('chalk')

const StylesBundler = () => {
  const generator = global.generator,
        {projectName, frameworkName} = generator.props,
        pagesLength = generator.props.pagesList.length,
        pages = generator.props.pagesList.split(' ')

  if (frameworkName === 'JQuery') {
    mkdirp('src/scss')
      .then(() => {
        mkdirp('src/scss/styles/pages')
        mkdirp('src/scss/vendor')
        if (pagesLength !== 0) {
          pages.forEach(page => {
            generator.fs.write(`src/scss/styles/pages/_${page}.scss`, `.p-${page} {\n\n}`)
          })
        }
        generator.fs.write('src/scss/styles/_global.scss', '* {\r\n  box-sizing: border-box;\r\n}\r\n\r\nhtml {\r\n  width: 100%;\r\n\r\n}\r\n\r\nbody {\r\n  width: 100%;\r\n}\n\n.g {\n\n}')
        generator.fs.write('src/scss/styles/_freq.scss', '.f {\n\n}')
        generator.fs.copy(generator.templatePath('../utils/styles'), generator.destinationPath('src/scss/utils'))
        generator.fs.write('src/scss/index.scss', '@import \'utils\/normalize\';\r\n@import \'utils\/variables\';\r\n@import \'utils\/mixins\';\r\n@import \'utils\/fonts\';\r\n\r\n@import \'styles\/global\';\r\n@import \'styles\/freq\';\r\n')
        if (pagesLength !== 0) {
          pages.forEach(page => {
            generator.fs.append('src/scss/index.scss', `@import 'styles/pages/${page}';\r\n`)
          })
        }
      })
      .catch(error => {
        console.error(`${chalk.bgRed('Something went wrong while generating ') + chalk.bgBlue('styles ')}folder: ${chalk.red(error)}`)
      })
  }
  else if (frameworkName === 'VueJS') {
    const {bundleType} = generator.props

    if (bundleType === 'Single bundle (No SSR)') {
      mkdirp('src/scss')
        .then(() => {
          mkdirp('src/scss/styles/pages')
          mkdirp('src/scss/vendor')
          if (pagesLength !== 0) {
            pages.forEach(page => {
              generator.fs.write(`src/scss/styles/pages/_${page}.scss`, `.p-${page} {\n\n}`)
            })
          }
          generator.fs.write('src/scss/styles/_global.scss', '* {\r\n  box-sizing: border-box;\r\n}\r\n\r\nhtml {\r\n  width: 100%;\r\n\r\n}\r\n\r\nbody {\r\n  width: 100%;\r\n}\n\n.g {\n\n}')
          generator.fs.write('src/scss/styles/_freq.scss', '.f {\n\n}')
          generator.fs.copy(generator.templatePath('../utils/styles'), generator.destinationPath('src/scss/utils'))
          generator.fs.write('src/scss/index.scss', '@import \'utils\/normalize\';\r\n@import \'utils\/variables\';\r\n@import \'utils\/mixins\';\r\n@import \'utils\/fonts\';\r\n\r\n@import \'styles\/global\';\r\n@import \'styles\/freq\';')
          if (pagesLength !== 0) {
            pages.forEach(page => {
              generator.fs.append('src/scss/index.scss', `@import 'styles/pages/${page}';\r\n`)
            })
          }
        })
        .catch(error => {
          console.error(`${chalk.bgRed('Something went wrong while generating ') + chalk.bgBlue('styles ')}folder: ${chalk.red(error)}`)
        })
    }
  }
}

module.exports = StylesBundler
