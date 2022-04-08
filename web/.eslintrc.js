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
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'standard'
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 12,
    sourceType: 'module'
  },
  plugins: [
    'react',
    'header',
    'eslint-plugin-import-helpers'
  ],
  settings: {
    react: {
      version: 'detect'
    }
  },
  rules: {
    'no-unused-vars': ['warn', { vars: 'all', args: 'none', ignoreRestSiblings: false }],
    'react/jsx-uses-react': 'off',
    'react/prop-types': 'off',
    'react/react-in-jsx-scope': 'off',
    'react/jsx-curly-brace-presence': ['error', { props: 'always', children: 'never' }],
    'header/header': ['error', 'block', header, 2],
    'import-helpers/order-imports': [
      'warn',
      {
        newlinesBetween: 'always',
        groups: [
          [
            '/^react$/', '/^prop-types$/', '/^react-i18next/'
          ],
          'module',
          ['/^services/', '/^config/'],
          ['/^views/'],
          ['/^components/'],
          '/^assets/',
          ['parent', 'sibling', 'index'],
          '/^~/'
        ],
        alphabetize: { order: 'asc', ignoreCase: true }
      }
    ]
  }
}
