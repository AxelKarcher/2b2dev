/*
** Copyright 2b2dev - All Rights Reserved
** Unauthorized copying of this file, via any medium is strictly prohibited
** Proprietary and confidential
** Written by Alexandre Chetrit <alexandre.chetrit@epitech.eu>
*/

const header = [
  '',
  '** Copyright 2b2dev - All Rights Reserved',
  '** Unauthorized copying of this file, via any medium is strictly prohibited',
  '** Proprietary and confidential',
  {
    pattern: 'Written by \\w+ \\w+ <[\\w.-]+@[\\w-]+.\\w+>$',
    template: '** Written by Alexandre Chetrit <alexandre.chetrit@epitech.eu>'
  },
  ''
]

module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: [
    'standard'
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module'
  },
  plugins: [
    '@typescript-eslint',
    'header',
    'eslint-plugin-import-helpers'
  ],
  rules: {
    'no-unused-vars': ['warn', { vars: 'all', args: 'none', ignoreRestSiblings: false }],
    'header/header': ['error', 'block', header, 2],
    'import-helpers/order-imports': [
      'warn',
      {
        newlinesBetween: 'always',
        groups: [
          'module',
          '/^@middlewares/',
          '/^@services/',
          '/^@models/',
          '/^@entities/',
          '/^@routes/',
          '/^@config/',
          ['parent', 'sibling', 'index'],
          '/^~/'
        ],
        alphabetize: { order: 'asc', ignoreCase: true }
      }
    ]
  }
}
