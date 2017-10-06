const GetColors = require('get-image-colors')

function filterDir (startPath, filter) {
  if (!fss.existsSync(startPath)) { //eslint-disable-line
    console.log('No such directory found:', startPath)

    return
  }

  const files = fss.readdirSync(startPath) //eslint-disable-line
  const resultArray = []

  for (let i = 0; i < files.length; i++) {
    const filename = path.join(startPath, files[i])
    const stat = fss.lstatSync(filename) //eslint-disable-line

    if (stat.isDirectory()) {
      filterDir(filename, filter) // Recurse
    }
    else if (filename.indexOf(filter) >= 0) {
      // Console.log('-- found: ', filename.split('\\'))
      const pathArray = filename.split('\\')

      resultArray.push(pathArray[pathArray.length - 1])
    }
  }

  if (resultArray.length !== 0) {
    return resultArray
  }
}

const PaletteReceiver = () => {
  const generator = global.generator,
        paletteArray = filterDir(generator.destinationPath(), '.png')

  if (paletteArray !== undefined && paletteArray.length !== 0) {
    paletteArray.forEach(palette => {
      GetColors(palette)
        .then(colors => {
          generator.fs.append('src/scss/utils/_variables.scss', `$c-color: ${colors.map(color => color.hex())[0]};\r\n`)
        })
    })
  }
}

module.exports = PaletteReceiver
