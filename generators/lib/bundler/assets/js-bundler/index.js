const mkdirp = require('mkdirp-promise'),
      chalk = require('chalk')

String.prototype.capitalize = function () {
  return this.replace(/^./, function (match) {
    return match.toUpperCase()
  })
}

const JsBundler = () => {
  const generator = global.generator,
        {projectName, frameworkName} = generator.props,
        pagesLength = generator.props.pagesList.length,
        pages = generator.props.pagesList.split(' ')

  if (frameworkName === 'JQuery') {
    mkdirp('src/js/')
      .then(() => generator.fs.write('src/js/main.js', '$(\'document\').ready(() => {\n})'))
      .catch(error => console.error(`${chalk.bgRed('Something went wrong while generating ') + chalk.bgYellow('javascript ')}folder: ${chalk.red(error)}`))
  }
  else if (frameworkName === 'VueJS') {
    const {bundleType} = generator.props

    if (bundleType === 'Single bundle (No SSR)') {
      mkdirp('src/js/')
        .then(() => {
          mkdirp('src/js/client/components/common')
          mkdirp('src/js/client/components/pages')
          mkdirp('src/js/client/router')
          mkdirp('src/js/client/store')
          mkdirp('src/js/client/')
          generator.fs.copy(generator.templatePath('vuejs/sb-no-ssr/store'), generator.destinationPath('src/js/client/store'))
          generator.fs.copy(generator.templatePath('vuejs/sb-no-ssr/index.js'), generator.destinationPath('src/js/client/index.js'))
          generator.fs.copy(generator.templatePath('vuejs/sb-no-ssr/polyfill.js'), generator.destinationPath('src/js/client/polyfill.js'))
          generator.fs.copy(generator.templatePath('vuejs/sb-no-ssr/components/Index.vue'), generator.destinationPath('src/js/client/components/App.vue'))
          if (pagesLength !== 0) {
            pages.forEach(page => {
              generator.fs.copyTpl(generator.templatePath('vuejs/sb-no-ssr/components/Page.vue'),
                generator.destinationPath(`src/js/client/components/pages/${page.capitalize()}.vue`),
                {pageName: page})
            })
            generator.fs.copyTpl(generator.templatePath('vuejs/sb-no-ssr/router/index.js'),
              generator.destinationPath('src/js/client/router/index.js'),
              {pages})
          }
          else {
            generator.fs.copyTpl(generator.templatePath('vuejs/sb-no-ssr/router/index.js'),
              generator.destinationPath('src/js/client/router/index.js'),
              {pages: ''})
          }
        })
        .catch(error => {
          console.error(`${chalk.bgRed('Something went wrong while generating ') + chalk.bgYellow('javascript ')}folder: ${chalk.red(error)}`)
        })
    }
  }
}

module.exports = JsBundler
