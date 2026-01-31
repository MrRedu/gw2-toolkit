import nextVitals from 'eslint-config-next/core-web-vitals'
import nextTs from 'eslint-config-next/typescript'
import { defineConfig, globalIgnores } from 'eslint/config'

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Ejemplos para agregar plugins
  // {
  //   plugins: {
  //     'simple-import-sort': simpleImportSort,
  //   },
  //   rules: {
  //     'simple-import-sort/imports': 'error',
  //     'simple-import-sort/exports': 'error',
  //   },
  // },
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    '.next/**',
    'out/**',
    'build/**',
    'next-env.d.ts',
  ]),
])

export default eslintConfig
