import { createOptions } from "./rollup.base-config";

const config = createOptions("tsconfig.esm.json", {
  format: 'esm',
  dir: 'dist/esm',
})

export default config
