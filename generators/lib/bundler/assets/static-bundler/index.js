const mkdirp = require('mkdirp-promise'),
      chalk = require('chalk')

const StaticBundler = () => {
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
}

module.exports = StaticBundler
