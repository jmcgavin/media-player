// @ts-check
const stylistic = require('@stylistic/eslint-plugin')

const { rules: stylisticRules } = stylistic.configs.customize({
  indent: 2,
  quotes: 'single',
  semi: false,
  arrowParens: true,
  commaDangle: 'always-multiline',
  jsx: true
})

module.exports = {
  root: true,
  env: {
    browser: true,
    es2020: true
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  ignorePatterns: [
    '.eslintrc.cjs',
    'dist',
    'dist-electron',
    'release',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: [
      './tsconfig.json',
      './tsconfig.node.json'
    ],
    tsconfigRootDir: __dirname,
  },
  plugins: [
    '@typescript-eslint',
    'react-refresh',
    '@stylistic'
  ],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended-type-checked',
    'plugin:@typescript-eslint/stylistic-type-checked',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:react/jsx-runtime',
    'plugin:import/recommended',
    'plugin:import/typescript',
    'plugin:import/electron',
    'plugin:@stylistic/recommended-extends',
  ],
  rules: {
    ...stylisticRules,
    'max-len': [
      'warn',
      { 
        'code': 100,
        'tabWidth': 2,
        'ignoreComments': true,
        'ignoreStrings': true,
        'ignoreUrls': true,
        'ignoreTemplateLiterals': true,
      },
    ],
    'react-refresh/only-export-components': [
      'warn',
      {
        'allowConstantExport': true
      }
    ],
    'sort-imports': [
      'warn',
      {
        'ignoreDeclarationSort': true
      }
    ],
    'import/order': [
      'warn',
      {
        'groups': [
          [
            'builtin',
            'external'
          ],
          'internal',
          [
            'sibling',
            'parent',
            'index'
          ]
        ],
        'pathGroups': [
          {
            'pattern': '~**',
            'group': 'internal'
          }
        ],
        'pathGroupsExcludedImportTypes': [],
        'newlines-between': 'always',
        'alphabetize': {
          'order': 'asc',
          'caseInsensitive': true
        },
        'warnOnUnassignedImports': true
      },
    ],
  },
}
