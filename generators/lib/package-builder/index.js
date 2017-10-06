const chalk = require('chalk'),
      fsExtra = require('fs-extra')

const PackageBuilder = () => {
  const generator = global.generator,
        {projectName, frameworkName} = generator.props

  if (frameworkName === 'JQuery') {
    const packageFile = {
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
    }

    generator.fs.writeJSON(generator.destinationPath('package.json'), packageFile)
  }
  else if (frameworkName === 'VueJS') {
    const {bundleType} = generator.props

    if (bundleType === 'Single bundle (No SSR)') {
      const packageFile = {
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
      }

      generator.fs.writeJSON(generator.destinationPath('src/package.json'), packageFile)
    }
    else if (bundleType === 'Single bundle (With SSR)') {
      const packageFile = {
        name: projectName,
        version: '1.0.0',
        description: '',
        main: 'dist/js/main.js',
        scripts: {
          'build': 'webpack --config webpack.client.prod.js --progress && webpack --config webpack.ssr.prod.js --progress && cd ../dist/server && npm i',
          'build:dev': 'webpack --config webpack.client.dev-nohot.js --progress && webpack --config webpack.ssr.dev.js --progress && cd ../dist/server && npm i',
          'start': 'node client-dev-server.js',
          'unb': 'unbemify --S ../dist/client/css/main.css --F ../dist/client/js/main.js ../dist/server/vue-ssr-server-bundle.json'
        },
        repository: {
          type: 'git',
          url: ''
        },
        author: '',
        license: 'ISC',
        bugs: {
          url: ''
        },
        homepage: '',
        dependencies: {
          'axios': '^0.16.2',
          'babel-runtime': '^6.26.0',
          'bluebird': '^3.5.1',
          'moment': '^2.18.1',
          'normalize-wheel': '^1.0.1',
          'qs': '^6.5.1',
          'v-img': '^0.1.2',
          'v-mask': '^1.3.0',
          'vue': '^2.4.4',
          'vue-carousel': '^0.6.5',
          'vue-router': '^2.7.0',
          'vue-server-renderer': '^2.4.4',
          'vue-slider-component': '^2.4.1',
          'vue-style-loader': '^3.0.3',
          'vuex': '^2.4.1'
        },
        devDependencies: {
          'autoprefixer': '^7.1.4',
          'babel-core': '^6.26.0',
          'babel-loader': '^7.1.2',
          'babel-plugin-transform-runtime': '^6.23.0',
          'babel-preset-es2015': '^6.24.1',
          'babel-preset-stage-0': '^6.24.1',
          'copy-webpack-plugin': '^4.1.1',
          'css-loader': '^0.28.7',
          'css-mqpacker': '^6.0.1',
          'css-validator-loader': '0.0.1',
          'express': '^4.16.1',
          'extract-text-webpack-plugin': '^3.0.1',
          'html-minifier': '^3.5.5',
          'html-minifier-loader': '^1.4.0',
          'html-webpack-plugin': '^2.30.1',
          'node-sass': '^4.5.3',
          'optimize-js-plugin': '0.0.4',
          'postcss-csso': '^2.0.0',
          'postcss-flexbugs-fixes': '^3.2.0',
          'postcss-loader': '^2.0.6',
          'postcss-mq-keyframes': '^0.3.0',
          'sass-loader': '^6.0.6',
          'style-loader': '^0.19.0',
          'vue-loader': '^13.0.5',
          'vue-template-compiler': '^2.4.4',
          'webpack': '^3.6.0',
          'webpack-dev-middleware': '^1.12.0',
          'webpack-hot-middleware': '^2.19.1'
        },
        eslintConfig: {
          env: {
            browser: true,
            node: true
          },
          globals: {
            API_PATH: true,
            Promise: true,
            global: true
          },
          plugins: ['html']
        }
      }

      generator.fs.writeJSON(generator.destinationPath('src/package.json'), packageFile)
    }
  }
}

module.exports = PackageBuilder

