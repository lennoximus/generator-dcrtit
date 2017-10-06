const fsExtra = require('fs-extra')

const ConfigBundler = () => {
  const generator = global.generator,
        {frameworkName} = generator.props

  fsExtra.copy(generator.templatePath('../configs/.gitignore'), generator.destinationPath('.gitignore'))
  if (frameworkName === 'JQuery') {
    fsExtra.copy(
      generator.templatePath('../configs/global/'),
      generator.destinationPath()
    )
    fsExtra.copy(
      generator.templatePath('../configs/jquery/'),
      generator.destinationPath('')
    )
  }
  else if (frameworkName === 'VueJS') {
    const {bundleType} = generator.props

    if (bundleType === 'Single bundle (No SSR)') {
      fsExtra.copy(
        generator.templatePath('../configs/global/'),
        generator.destinationPath('src')
      )
      fsExtra.copy(
        generator.templatePath('../configs/vuejs/sb-no-ssr'),
        generator.destinationPath('src')
      )
    }
    else if (bundleType === 'Single bundle (With SSR)') {
      fsExtra.copy(
        generator.templatePath('../configs/global/'),
        generator.destinationPath('src')
      )
      fsExtra.copy(
        generator.templatePath('../configs/vuejs/sb-ssr'),
        generator.destinationPath('src')
      )
    }
  }
}

module.exports = ConfigBundler
