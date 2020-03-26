module.exports = {
  root: true,
  env: {
    es6: true,
    node: true
  },
  extends: ['standard', 'typescript'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  globals: {
    'Atomics': 'readonly',
    'SharedArrayBuffer': 'readonly'
  },
  plugins: ['@typescript-eslint'],
  rules: {
    'indent': ['error', 2, { 'SwitchCase': 1 }],
    'quotes': ['error', 'single'],
    'comma-dangle': ['error', 'always-multiline'],
    'semi': ['error', 'always'],
    'no-extra-semi': 'error',
    '@typescript-eslint/no-use-before-define': ['error', { 'functions': false, }]
  },
};