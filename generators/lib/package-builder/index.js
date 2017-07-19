const chalk = require('chalk'),
      fsExtra = require('fs-extra')

const PackageBuilder = (frameworkName, projectName) => {
  if (frameworkName === 'JQuery') {
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
        'jquery': '^3.2.1' // eslint-disable-line
      }
    })
  }
  else if (frameworkName === 'VueJS') {
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
  }
}

module.exports = PackageBuilder

