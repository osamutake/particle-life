const compiler = require('@riotjs/compiler')
const path = require('path')
const sass = require('sass')

compiler.registerPreprocessor('css', 'scss', function (code, { options }) {
  const { file } = options

  const { css } = sass.renderSync({
    data: code,
    includePaths: [path.dirname(file)]
  })

  return {
    code: css.toString(),
    map: null
  }
})

exports.handlers = {
  beforeParse: function (e) {
    if (e.filename.match(/\.riot$/)) {
      const { code } = compiler.compile(e.source, {comments: true})
      e.source = code
    }
  }
}
