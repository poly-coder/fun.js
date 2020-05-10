import typescript from '@rollup/plugin-typescript';

import pkg from './package.json';

const external = pkg.dependencies ? Object.keys(pkg.dependencies) : [];

export function createOptions(tsconfig, output) {
  return {
    input: 'src/index.ts',
    external,
    output,
    plugins: [typescript({ tsconfig })],
  };
}
