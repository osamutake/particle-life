import * as esbuild from 'esbuild'
import fs from 'node:fs'
import * as riot from '@riotjs/compiler'
import * as path from 'path'
import sass from 'sass'

riot.registerPreprocessor('css', 'scss', (code, { options }) => {
  const { file } = options

  let result = sass.compileString(
    code, {
      loadPaths: [path.dirname(file)],
      sourceMap: true,
      color: true,
      verbose: true,
    }
  )

  const map = {...result.sourceMap}
  map.sources = [file]
  map.file = path.basename(file)

  return {
    code: result.css,
    map: map
  }
})

const riotPlugin = {
  name: 'riot',
  setup(build) {
    // Load ".txt" files and return an array of words
    build.onLoad({ filter: /\.riot$/ }, async (args) => {
      let src = await fs.promises.readFile(args.path, 'utf8')
      let {code, map} = riot.compile(src);

      map.sources = [path.relative(process.cwd(), args.path)];
      map.file = path.basename(args.path);
      map = Buffer.from(JSON.stringify(map)).toString('base64');
    
      code += `\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,${map}`;
    
      return {
        contents: code,
        loader: 'js',
      }
    })
  },
}

const options = {}
process.argv.slice(2).forEach((arg)=>{
  if(arg.slice(0,2) == '--') {
    let [k, v] = arg.split('=')
    let array = (v || '').split(',')
    if(!v) v = true
    if(v == 'true') v = true
    if(v == 'false') v = false
    options[k.slice(2)] = array.length == 1 ? v : array
  } else {
    options.entryPoints ??= []
    options.entryPoints.push(arg)
  }
})

//  entryPoints: ['src/index.js'],
//  bundle: true,
//  outfile: 'dist/particle-life.js',
//  plugins: [riotPlugin],
//  sourcemap: 'inline'

options.plugins = [riotPlugin]
await esbuild.build(options)
