import typescript from '@rollup/plugin-typescript';

import pkg from './package.json';

const external = Object.keys(pkg.dependencies || {});

const outOptions = {
  // dir: 'dist',
};

export default {
  input: 'src/index.ts',
  external,
  output: [
    {
      ...outOptions,
      file: pkg.main,
      format: 'cjs'
    },
    {
      ...outOptions,
      file: pkg.module,
      format: 'es' // the preferred format
    },
    {
      ...outOptions,
      file: pkg.browser,
      format: 'iife',
      name: 'PolyCoderFun' // the global which can be used in a browser
     }
  ],
  plugins: [typescript({ typescript: require('typescript') })],
}
