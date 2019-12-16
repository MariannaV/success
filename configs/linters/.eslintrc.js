const path = require('path'),
  root = path.resolve(__dirname, '../..')

module.exports = {
  env: {
    browser: true,
  },
  parserOptions: {
    ecmaVersion: 2019,
  },
  plugins: [
    'import',
    // 'promise',
    /*'security',*/
    // 'json',
    // 'optimize-regex',
    // 'compat',
    // 'deprecate',
    // 'sonarjs',
    // 'unicorn',
    'prettier',
  ],
  extends: [
    // 'eslint:recommended',
    // 'airbnb',
    // 'esnext',
    'plugin:import/errors',
    'plugin:import/warnings',
    // 'plugin:promise/recommended',
    // 'plugin:security/recommended',
    // 'plugin:you-dont-need-lodash-underscore/compatible',
    // 'plugin:compat/recommended',
    // 'plugin:sonarjs/recommended',
    // 'plugin:unicorn/recommended',
    // 'standard',
    // 'plugin:prettier/recommended',
    'prettier',
  ],
  rules: {
    'one-var': 0,
    'spaced-comment': 0,
    'no-param-reassign': 1,
    'no-use-before-define': 0,
    'no-unused-vars': 1,
    'no-shadow': 1,
    'prefer-template': 0,
    'prefer-rest-params': 1,
    'global-require': 0,

    'import/no-extraneous-dependencies': 0, //because of Yarn Workspaces
    'import/prefer-default-export': 0,
    'no-unused-expressions': 0,
  },
  settings: {
    'import/resolver': {
      node: {
        paths: [`${root}/src`],
        extensions: ['.js', '.json'],
      },
    },
  },
}
