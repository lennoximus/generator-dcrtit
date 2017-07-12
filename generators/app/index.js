const Generator = require('yeoman-generator'),
      chalk = require('chalk'),
      yosay = require('yosay'),
      mkdirp = require('mkdirp'),
      fsExtra = require('fs-extra')

module.exports = class extends Generator {
  prompting () {
    // Have Yeoman greet the user.
    this.log(yosay(
      `Welcome to the wondrous ${chalk.red('dcrtit')} generator!`
    ))

    const prompts = [
      {
        type: 'input',
        name: 'projectName',
        message: 'Enter your project name',
        default: this.appname
      },
      {
        type: 'list',
        name: 'frameworkName',
        message: 'What framework would you like to use?',
        choices: ['JQuery', 'VueJS']
      }
    ]

    return this.prompt(prompts).then(props => {
      // To access props later use this.props.someAnswer;
      this.props = props
    })
  }

  writing () {
    const frameworkName = this.props.frameworkName,
          projectName = this.props.projectName

    switch (frameworkName) {
      case 'JQuery':
        this.fs.copy(this.templatePath('../configs/.eslintrc.json'), this.destinationPath('.eslintrc.json'))
        this.fs.copy(this.templatePath('../configs/.gitignore'), this.destinationPath('.gitignore'))
        this.fs.copy(this.templatePath('../configs/csscomb.json'), this.destinationPath('csscomb.json'))
        this.fs.copy(this.templatePath('../configs/gulpfile.js'), this.destinationPath('gulpfile.js'))
        this.fs.copyTpl(this.templatePath('index.html'), this.destinationPath('src/html/index.html'), {title: projectName})
        fsExtra.writeJson('package.json', {
          name: projectName,
          version: '1.0.0',
          description: '',
          main: 'index.js',
          scripts: {
            test: 'echo "Error: no test specified" && exit 1'
          },
          author: '',
          license: 'ISC',
          devDependencies: {
            'gulp': '^3.9.1',
            'gulp-autoprefixer': '^4.0.0',
            'gulp-clean': '^0.3.2',
            'gulp-combine-mq': '^0.4.0',
            'gulp-csso': '^3.0.0',
            'gulp-csstree': '^1.0.1',
            'gulp-rename': '^1.2.2',
            'gulp-sass': '^3.1.0'
          },
          dependencies: {
            'jquery': '^3.2.1' //eslint-disable-line
          }
        }, error => {
          if (error) {
            console.error(`${chalk.bgRed('Something went wrong while generating ') + chalk.bgBlue('package.json ')}file: ${chalk.red(error)}`)
          }
        })
        mkdirp('src/js', error => {
          if (error) {
            console.error(`${chalk.bgRed('Something went wrong while generating ') + chalk.bgYellow('javascript ')}folder: ${chalk.red(error)}`)
          }
          else {
            this.fs.write('src/js/main.js', '$(\'document\').ready(() => {\n})')
          }
        })
        mkdirp('src/img/fish', error => {
          if (error) {
            console.error(`${chalk.bgRed('Something went wrong while generating ') + chalk.bgCyan('images ')}folder: ${chalk.red(error)}`)
          }
        })
        mkdirp('src/fonts', error => {
          if (error) {
            console.error(`${chalk.bgRed('Something went wrong while generating ') + chalk.bgBlack('fonts ')}folder: ${chalk.red(error)}`)
          }
          else {
            mkdirp('src/fonts/bold', error => {
              if (error) {
                console.error(`${chalk.bgRed('Something went wrong while generating ') + chalk.bgBlack('fonts ')}folder: ${chalk.red(error)}`)
              }
            })
            mkdirp('src/fonts/regular', error => {
              if (error) {
                console.error(`${chalk.bgRed('Something went wrong while generating ') + chalk.bgBlack('fonts ')}folder: ${chalk.red(error)}`)
              }
            })
          }
        })
        mkdirp('src/scss', error => {
          if (error) {
            console.error(`${chalk.bgRed('Something went wrong while generating ') + chalk.bgBlue('styles ')}folder: ${chalk.red(error)}`)
          }
          else {
            mkdirp('src/scss/styles/pages')
            this.fs.write('src/scss/styles/_global.scss', '* {\r\n  box-sizing: border-box;\r\n}\r\n\r\nhtml {\r\n  width: 100%;\r\n\r\n}\r\n\r\nbody {\r\n  width: 100%;\r\n}\n\n.g {\n\n}')
            this.fs.write('src/scss/styles/_freq.scss', '.f {\n\n}')
            this.fs.copy(this.templatePath('../utils/styles'), this.destinationPath('src/scss/utils'))
            mkdirp('src/scss/vendor')
            this.fs.write('src/scss/index.scss', '@import \'utils\/normalize\';\r\n@import \'utils\/variables\';\r\n@import \'utils\/mixins\';\r\n@import \'utils\/fonts\';\r\n\r\n@import \'styles\/global\';\r\n@import \'styles\/freq\';')
          }
        })

        break
      case 'VueJS':
        mkdirp('src')
        fsExtra.writeJson('src/package.json', {
          name: projectName,
          version: '1.0.0',
          description: '',
          main: 'index.js',
          scripts: {
            build: 'gulp build && webpack --config webpack.production.js --progress',
            start: 'node webpack.server.js'
          },
          author: '',
          license: 'ISC',
          devDependencies: {
            'babel-core': '^6.25.0',
            'babel-loader': '^7.1.1',
            'babel-plugin-transform-runtime': '^6.23.0',
            'babel-preset-es2015': '^6.24.1',
            'babel-preset-stage-0': '^6.24.1',
            'express': '^4.15.2',
            'gulp': '^3.9.1',
            'gulp-autoprefixer': '^4.0.0',
            'gulp-clean': '^0.3.2',
            'gulp-combine-mq': '^0.4.0',
            'gulp-csso': '^3.0.0',
            'gulp-csstree': '^1.0.1',
            'gulp-rename': '^1.2.2',
            'gulp-sass': '^3.1.0',
            'optimize-js-plugin': '0.0.4',
            'serve-static': '^1.12.1',
            'vue-loader': '^13.0.0',
            'vue-template-compiler': '^2.3.4',
            'webpack': '^3.0.0',
            'webpack-dev-middleware': '^1.11.0',
            'webpack-hot-middleware': '^2.18.1'
          },
          dependencies: {
            'axios': '^0.16.2',
            'babel-runtime': '^6.23.0',
            'bluebird': '^3.5.0',
            'vue': '^2.3.4',
            'vue-carousel': '^0.6.4',
            'vue-router': '^2.7.0',
            'vuex': '^2.2.1'
          },
          eslintConfig: {
            env: {
              browser: true,
              node: true
            },
            globals: {
              API_PATH: true,
              Promise: true
            },
            plugins: ['html']
          }
        }, error => {
          if (error) {
            console.error(`${chalk.bgRed('Something went wrong while generating ') + chalk.bgBlue('package.json ')}file: ${chalk.red(error)}`)
          }
        })
        this.fs.copy(this.templatePath('../configs/.gitignore'), this.destinationPath('.gitignore'))
        this.fs.copy(this.templatePath('../configs/.babelrc'), this.destinationPath('src/.babelrc'))
        this.fs.copy(this.templatePath('../configs/.eslintrc.json'), this.destinationPath('src/.eslintrc.json'))
        this.fs.copy(this.templatePath('../configs/csscomb.json'), this.destinationPath('src/csscomb.json'))
        this.fs.copy(this.templatePath('../configs/gulpfile_vue.js'), this.destinationPath('src/gulpfile.js'))
        this.fs.copy(this.templatePath('../configs/webpack.config.js'), this.destinationPath('src/webpack.config.js'))
        this.fs.copy(this.templatePath('../configs/webpack.production.js'), this.destinationPath('src/webpack.production.js'))
        this.fs.copy(this.templatePath('../configs/webpack.server.js'), this.destinationPath('src/webpack.server.js'))
        this.fs.copyTpl(this.templatePath('vuejs/index_vue.html'), this.destinationPath('src/html/index.html'), {title: projectName})
        mkdirp('src/js', error => {
          if (error) {
            console.error(`${chalk.bgRed('Something went wrong while generating ') + chalk.bgYellow('javascript ')}folder: ${chalk.red(error)}`)
          }
          else {
            mkdirp('src/js/client/components/common')
            mkdirp('src/js/client/components/pages')
            mkdirp('src/js/client/router')
            mkdirp('src/js/client/store')
            mkdirp('src/js/client/')
            this.fs.copy(this.templatePath('vuejs/router'), this.destinationPath('src/js/client/router'))
            this.fs.copy(this.templatePath('vuejs/store'), this.destinationPath('src/js/client/store'))
            this.fs.copy(this.templatePath('vuejs/index.js'), this.destinationPath('src/js/client/index.js'))
            this.fs.copy(this.templatePath('vuejs/polyfill.js'), this.destinationPath('src/js/client/polyfill.js'))
            this.fs.copy(this.templatePath('vuejs/components/Index.vue'), this.destinationPath('src/js/client/components/App.vue'))
          }
        })
        mkdirp('src/img/fish', error => {
          if (error) {
            console.error(`${chalk.bgRed('Something went wrong while generating ') + chalk.bgCyan('images ')}folder: ${chalk.red(error)}`)
          }
        })
        mkdirp('src/fonts', error => {
          if (error) {
            console.error(`${chalk.bgRed('Something went wrong while generating ') + chalk.bgBlack('fonts ')}folder: ${chalk.red(error)}`)
          }
          else {
            mkdirp('src/fonts/bold', error => {
              if (error) {
                console.error(`${chalk.bgRed('Something went wrong while generating ') + chalk.bgBlack('fonts ')}folder: ${chalk.red(error)}`)
              }
            })
            mkdirp('src/fonts/regular', error => {
              if (error) {
                console.error(`${chalk.bgRed('Something went wrong while generating ') + chalk.bgBlack('fonts ')}folder: ${chalk.red(error)}`)
              }
            })
          }
        })
        mkdirp('src/scss', error => {
          if (error) {
            console.error(`${chalk.bgRed('Something went wrong while generating ') + chalk.bgBlue('styles ')}folder: ${chalk.red(error)}`)
          }
          else {
            mkdirp('src/scss/styles/pages')
            this.fs.write('src/scss/styles/_global.scss', '* {\r\n  box-sizing: border-box;\r\n}\r\n\r\nhtml {\r\n  width: 100%;\r\n\r\n}\r\n\r\nbody {\r\n  width: 100%;\r\n}\n\n.g {\n\n}')
            this.fs.write('src/scss/styles/_freq.scss', '.f {\n\n}')
            this.fs.copy(this.templatePath('../utils/styles'), this.destinationPath('src/scss/utils'))
            mkdirp('src/scss/vendor')
            this.fs.write('src/scss/index.scss', '@import \'utils\/normalize\';\r\n@import \'utils\/variables\';\r\n@import \'utils\/mixins\';\r\n@import \'utils\/fonts\';\r\n\r\n@import \'styles\/global\';\r\n@import \'styles\/freq\';')
          }
        })

        break
      default:
        break
    }
  }

  install () {
    if (this.props.frameworkName !== 'VueJS') {
      this.installDependencies({
        npm: true,
        bower: false,
        yarn: false
      })
    }
  }
}

