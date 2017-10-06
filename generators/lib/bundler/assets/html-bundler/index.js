const HtmlBundler = () => {
  const generator = global.generator,
        {projectName, frameworkName} = generator.props,
        pagesLength = generator.props.pagesList.length,
        pages = generator.props.pagesList.split(' ')

  if (frameworkName === 'JQuery') {
    generator.fs.copyTpl(generator.templatePath('jquery/index.html'),
      generator.destinationPath('src/html/index.html'),
      {
        title: projectName,
        pageName: 'main'
      })
    if (pagesLength !== 0) {
      pages.forEach(page => {
        generator.fs.copyTpl(generator.templatePath('jquery/index.html'),
          generator.destinationPath(`src/html/${page}.html`),
          {
            title: projectName,
            pageName: page
          })
      })
    }
  }
  else if (frameworkName === 'VueJS') {
    const {bundleType} = generator.props

    if (bundleType === 'Single bundle (No SSR)') {
      generator.fs.copyTpl(generator.templatePath('vuejs/sb-no-ssr/index.html'),
        generator.destinationPath('src/html/index.html'),
        {title: projectName}
      )
    }
  }
}

module.exports = HtmlBundler
