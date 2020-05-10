import { createOptions } from "./rollup.base-config";

const config = createOptions("tsconfig.json", {
  format: 'cjs',
  dir: 'dist/cjs',
})

export default config
