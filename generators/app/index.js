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
        this.fs.copyTpl(
          this.templatePath('index.html'),
          this.destinationPath('src/html/index.html'),
          {title: projectName}
        )
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
      default:
        break
    }
  }

  install () {
    this.installDependencies({
      npm: true,
      bower: false,
      yarn: false
    })
  }
}

