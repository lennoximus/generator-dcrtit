const Generator = require('yeoman-generator'),
      chalk = require('chalk'),
      yosay = require('yosay'),
      mkdirp = require('mkdirp'),
      PackageBuilder = require('../lib/package-builder'),
      ConfigBundler = require('../lib/bundler/config'),
      AssetsBundler = require('../lib/bundler/assets')

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
        message: 'Enter your project name:',
        default: this.appname
      },
      {
        type: 'list',
        name: 'frameworkName',
        message: 'What framework would you like to use?',
        choices: ['JQuery', 'VueJS']
      },
      {
        type: 'input',
        name: 'pagesList',
        message: 'Enter pages to generate separated by space:'
      }
    ]


    return this.prompt(prompts).then(props => {
      // To access props later use this.props.someAnswer;
      this.props = props
    })
  }

  writing () {
    global.generator = this
    mkdirp('src')
    PackageBuilder()
    ConfigBundler()
    AssetsBundler()
  }

  install () {
    // If (this.props.frameworkName !== 'VueJS') {
    //   This.installDependencies({
    //     Npm: true,
    //     Bower: false,
    //     Yarn: false
    //   })
    // }
  }
}

