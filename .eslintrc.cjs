module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  settings: {
    react: {
      version: 'detect',
    },
  },
  ignorePatterns: [ 'dist', 'dist-electron', 'release', '.eslintrc.cjs' ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: [ './tsconfig.json', './tsconfig.node.json' ],
    tsconfigRootDir: __dirname,
  },
  plugins: [ 'react-refresh' ],
  extends: [
    'standard',
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:react/jsx-runtime',
    'plugin:import/recommended',
    'plugin:import/electron',
    'plugin:import/typescript',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'eslint-config-prettier',
  ],
  rules: {
    'react-refresh/only-export-components': [ 'warn', { allowConstantExport: true } ],
  },
}
