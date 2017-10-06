const HtmlBundler = () => {
  const generator = global.generator,
        {projectName, frameworkName} = generator.props,
        pagesLength = generator.props.pagesList.length,
        pages = generator.props.pagesList.split(' '),
        destPath = 'src/html/'

  if (frameworkName === 'JQuery') {
    const tempPath = 'jquery/'

    generator.fs.copyTpl(generator.templatePath(`${tempPath}index.html`),
      generator.destinationPath(`${destPath}index.html`),
      {
        title: projectName,
        pageName: 'main'
      })
    if (pagesLength !== 0) {
      pages.forEach(page => {
        generator.fs.copyTpl(generator.templatePath(`${tempPath}index.html`),
          generator.destinationPath(`${destPath + page}.html`),
          {
            title: projectName,
            pageName: page
          })
      })
    }
  }
  else if (frameworkName === 'VueJS') {
    const tempPath = 'vuejs/'

    generator.fs.copyTpl(generator.templatePath(`${tempPath}index.html`),
      generator.destinationPath(`${destPath}index.html`),
      {title: projectName})
  }
}

module.exports = HtmlBundler
