const mkdirp = require('mkdirp-promise'),
      chalk = require('chalk')

const StaticBundler = () => {
  const generator = global.generator,
        {projectName, frameworkName} = generator.props

  if (frameworkName === 'JQuery') {
    mkdirp('src/img/fish')
      .then()
      .catch(error => {
        console.error(`${chalk.bgRed('Something went wrong while generating ') + chalk.bgCyan('images ')}folder: ${chalk.red(error)}`)
      })
    mkdirp('src/fonts')
      .then()
      .catch(error => {
        console.error(`${chalk.bgRed('Something went wrong while generating ') + chalk.bgBlack('fonts ')}folder: ${chalk.red(error)}`)
      })
  }
  else if (frameworkName === 'VueJS') {
    const {bundleType} = generator.props

    if (bundleType === 'Single bundle (No SSR)') {
      mkdirp('src/img/fish')
        .then()
        .catch(error => {
          console.error(`${chalk.bgRed('Something went wrong while generating ') + chalk.bgCyan('images ')}folder: ${chalk.red(error)}`)
        })
      mkdirp('src/fonts')
        .then()
        .catch(error => {
          console.error(`${chalk.bgRed('Something went wrong while generating ') + chalk.bgBlack('fonts ')}folder: ${chalk.red(error)}`)
        })
    }
  }
}

module.exports = StaticBundler
