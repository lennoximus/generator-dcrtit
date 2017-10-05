const HtmlBundler = () => {
  const generator = global.generator,
        {projectName, frameworkName} = generator.props,
        pagesLength = generator.props.pagesList.length,
        pages = generator.props.pagesList.split(' '),
        destPath = 'src/html/'

  let tempPath

  console.log(pages, pagesLength)

  if (frameworkName === 'JQuery') {
    tempPath = 'jquery/'
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
}

module.exports = HtmlBundler
