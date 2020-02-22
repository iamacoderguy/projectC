module.exports = {
  root: true,
  env: {
    es6: true,
    node: true,
  },
  extends: 'plugin:react/recommended',
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: ['react', '@typescript-eslint'],
  rules: {
    'indent': ['error', 2, { 'SwitchCase': 1 }],
    'quotes': ['error', 'single'],
    'comma-dangle': ['error', 'always-multiline'],
    'semi': ['error', 'always'],
    'no-extra-semi': 'error',
  },
  settings: {
    react: {
        version: require('./package.json').dependencies.react,
    },
  },
};
