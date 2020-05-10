module.exports = {
  root: true,
  env: {
    es6: true,
    node: true,
  },
  extends: [
    'standard',
    'typescript',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 11,
    sourceType: 'module',
  },
  plugins: [
    '@typescript-eslint',
  ],
  rules: {
    indent: ['error', 2, { SwitchCase: 1 }],
    quotes: ['error', 'single'],
    'comma-dangle': ['error', 'always-multiline'],
    semi: ['error', 'always'],
    'no-extra-semi': 'error',
    'space-before-function-paren': ['error', 'never'],
    '@typescript-eslint/no-use-before-define': ['error', { functions: false }],
  },
};
