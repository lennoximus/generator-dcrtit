const mkdirp = require('mkdirp-promise'),
      chalk = require('chalk')

const JsBundler = () => {
  const generator = global.generator,
        {projectName, frameworkName} = generator.props,
        pagesLength = generator.props.pagesList.length,
        pages = generator.props.pagesList.split(' ')

  if (frameworkName === 'JQuery') {
    const destPath = 'src/js/'

    mkdirp(destPath)
      .then(() => generator.fs.write(`${destPath}main.js`, '$(\'document\').ready(() => {\n})'))
      .catch(error => console.error(`${chalk.bgRed('Something went wrong while generating ') + chalk.bgYellow('javascript ')}folder: ${chalk.red(error)}`))
  }
  else if (frameworkName === 'VueJS') {
    const tempPath = 'vuejs/',
          destPath = 'src/js/'

    mkdirp(destPath)
      .then(() => {
        mkdirp(`${destPath}client/components/common`)
        mkdirp(`${destPath}client/components/pages`)
        mkdirp(`${destPath}client/router`)
        mkdirp(`${destPath}client/store`)
        mkdirp(`${destPath}client/`)
        generator.fs.copy(generator.templatePath(`${tempPath}store`), generator.destinationPath(`${destPath}client/store`))
        generator.fs.copy(generator.templatePath(`${tempPath}index.js`), generator.destinationPath(`${destPath}client/index.js`))
        generator.fs.copy(generator.templatePath(`${tempPath}polyfill.js`), generator.destinationPath(`${destPath}client/polyfill.js`))
        generator.fs.copy(generator.templatePath(`${tempPath}components/Index.vue`), generator.destinationPath(`${destPath}client/components/App.vue`))
        if (pagesLength !== 0) {
          pages.forEach(page => {
            generator.fs.copyTpl(generator.templatePath(`${tempPath}components/Page.vue`),
              generator.destinationPath(`${destPath}client/components/pages/${page}.vue`),
              {pageName: page})
          })
          generator.fs.copyTpl(generator.templatePath(`${tempPath}router/index.js`),
            generator.destinationPath(`${destPath}client/router/index.js`),
            {pages})
        }
        else {
          generator.fs.copyTpl(generator.templatePath(`${tempPath}router/index.js`),
            generator.destinationPath(`${destPath}client/router/index.js`),
            {pages: ''})
        }
      })
      .catch(error => {
        console.error(`${chalk.bgRed('Something went wrong while generating ') + chalk.bgYellow('javascript ')}folder: ${chalk.red(error)}`)
      })
  }
}

module.exports = JsBundler
