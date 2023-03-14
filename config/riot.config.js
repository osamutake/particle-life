import { registerPreprocessor } from '@riotjs/compiler'
import { dirname } from 'path'
import sass from 'sass'

registerPreprocessor('css', 'scss', function (code, { options }) {
  const { file } = options

  const { css } = sass.renderSync({
    data: code,
    includePaths: [dirname(file)]
  })

  return {
    code: css.toString(),
    map: null
  }
})
