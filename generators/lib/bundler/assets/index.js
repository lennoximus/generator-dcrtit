const mkdirp = require('mkdirp-promise'),
      chalk = require('chalk')

const AssetsBundler = (generatorInstance, frameworkName) => {
  const pagesList = generatorInstance.props.pagesList.split(' ')

  if (frameworkName === 'JQuery') {
    generatorInstance.fs.copyTpl(generatorInstance.templatePath('index.html'),
      generatorInstance.destinationPath('src/html/index.html'),
      {
        title: generatorInstance.props.projectName,
        pageName: 'main'
      })
    if (generatorInstance.props.pagesList.length !== 0) {
      pagesList.forEach(page => {
        generatorInstance.fs.copyTpl(generatorInstance.templatePath('index.html'),
          generatorInstance.destinationPath(`src/html/${page}.html`),
          {
            title: generatorInstance.props.projectName,
            pageName: page
          })
      })
    }
    mkdirp('src/js')
      .then(() => generatorInstance.fs.write('src/js/main.js', '$(\'document\').ready(() => {\n})'))
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
        if (generatorInstance.props.pagesList.length !== 0) {
          pagesList.forEach(page => {
            generatorInstance.fs.write(`src/scss/styles/pages/_${page}.scss`, `.p-${page} {\n\n}`)
          })
        }
        generatorInstance.fs.write('src/scss/styles/_global.scss', '* {\r\n  box-sizing: border-box;\r\n}\r\n\r\nhtml {\r\n  width: 100%;\r\n\r\n}\r\n\r\nbody {\r\n  width: 100%;\r\n}\n\n.g {\n\n}')
        generatorInstance.fs.write('src/scss/styles/_freq.scss', '.f {\n\n}')
        generatorInstance.fs.copy(generatorInstance.templatePath('../utils/styles'), generatorInstance.destinationPath('src/scss/utils'))
        generatorInstance.fs.write('src/scss/index.scss', '@import \'utils\/normalize\';\r\n@import \'utils\/variables\';\r\n@import \'utils\/mixins\';\r\n@import \'utils\/fonts\';\r\n\r\n@import \'styles\/global\';\r\n@import \'styles\/freq\';\r\n')
        if (generatorInstance.props.pagesList.length !== 0) {
          pagesList.forEach(page => {
            generatorInstance.fs.append('src/scss/index.scss', `@import 'styles/pages/${page}';\r\n`)
          })
        }
      })
      .catch(error => {
        console.error(`${chalk.bgRed('Something went wrong while generating ') + chalk.bgBlue('styles ')}folder: ${chalk.red(error)}`)
      })
  }
  else if (frameworkName === 'VueJS') {
    generatorInstance.fs.copyTpl(generatorInstance.templatePath('vuejs/index_vue.html'),
      generatorInstance.destinationPath('src/html/index.html'),
      {title: generatorInstance.props.projectName})
    mkdirp('src/js')
      .then(() => {
        mkdirp('src/js/client/components/common')
        mkdirp('src/js/client/components/pages')
        mkdirp('src/js/client/router')
        mkdirp('src/js/client/store')
        mkdirp('src/js/client/')
        generatorInstance.fs.copy(generatorInstance.templatePath('vuejs/store'), generatorInstance.destinationPath('src/js/client/store'))
        generatorInstance.fs.copy(generatorInstance.templatePath('vuejs/index.js'), generatorInstance.destinationPath('src/js/client/index.js'))
        generatorInstance.fs.copy(generatorInstance.templatePath('vuejs/polyfill.js'), generatorInstance.destinationPath('src/js/client/polyfill.js'))
        generatorInstance.fs.copy(generatorInstance.templatePath('vuejs/components/Index.vue'), generatorInstance.destinationPath('src/js/client/components/App.vue'))
        if (generatorInstance.props.pagesList.length !== 0) {
          pagesList.forEach(page => {
            generatorInstance.fs.copyTpl(generatorInstance.templatePath('vuejs/components/Page.vue'),
              generatorInstance.destinationPath(`src/js/client/components/pages/${page}.vue`),
              {pageName: page})
          })
          generatorInstance.fs.copyTpl(generatorInstance.templatePath('vuejs/router/index.js'),
            generatorInstance.destinationPath('src/js/client/router/index.js'),
            {pages: pagesList})
        }
        else {
          generatorInstance.fs.copyTpl(generatorInstance.templatePath('vuejs/router/index.js'),
            generatorInstance.destinationPath('src/js/client/router/index.js'),
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
        if (generatorInstance.props.pagesList.length !== 0) {
          pagesList.forEach(page => {
            generatorInstance.fs.write(`src/scss/styles/pages/_${page}.scss`, `.p-${page} {\n\n}`)
          })
        }
        generatorInstance.fs.write('src/scss/styles/_global.scss', '* {\r\n  box-sizing: border-box;\r\n}\r\n\r\nhtml {\r\n  width: 100%;\r\n\r\n}\r\n\r\nbody {\r\n  width: 100%;\r\n}\n\n.g {\n\n}')
        generatorInstance.fs.write('src/scss/styles/_freq.scss', '.f {\n\n}')
        generatorInstance.fs.copy(generatorInstance.templatePath('../utils/styles'), generatorInstance.destinationPath('src/scss/utils'))
        generatorInstance.fs.write('src/scss/index.scss', '@import \'utils\/normalize\';\r\n@import \'utils\/variables\';\r\n@import \'utils\/mixins\';\r\n@import \'utils\/fonts\';\r\n\r\n@import \'styles\/global\';\r\n@import \'styles\/freq\';')
        if (generatorInstance.props.pagesList.length !== 0) {
          pagesList.forEach(page => {
            generatorInstance.fs.append('src/scss/index.scss', `@import 'styles/pages/${page}';\r\n`)
          })
        }
      })
      .catch(error => {
        console.error(`${chalk.bgRed('Something went wrong while generating ') + chalk.bgBlue('styles ')}folder: ${chalk.red(error)}`)
      })
  }
}

module.exports = AssetsBundler
