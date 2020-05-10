import typescript from '@rollup/plugin-typescript';

import pkg from './package.json';

const external = Object.keys(pkg.dependencies || {});

export default {
  input: 'src/index.ts',
  external,
  output: [
    {
      file: pkg.main,
      format: 'cjs'
    },
    {
      file: pkg.module,
      format: 'es' // the preferred format
    },
    {
      file: pkg.browser,
      format: 'iife',
      name: 'PolyCoderFun' // the global which can be used in a browser
     }
  ],
  plugins: [typescript({ typescript: require('typescript') })],
}
