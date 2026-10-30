import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      globals: globals.browser,
    },
  },
  {
    // shadcn/Base UI primitives export their cva variants alongside the
    // component by design, and CLAUDE.md says not to edit these files.
    files: ['src/components/ui/**/*.{ts,tsx}'],
    rules: {
      'react-refresh/only-export-components': 'off',
    },
  },
  {
    // routes.tsx is a route manifest, not a fast-refresh boundary: it exports
    // a data array and holds the React.lazy page references that CLAUDE.md's
    // code standards call for.
    files: ['src/routes.tsx'],
    rules: {
      'react-refresh/only-export-components': 'off',
    },
  },
])
