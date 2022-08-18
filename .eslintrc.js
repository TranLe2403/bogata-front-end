module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
    jest: true
  },
  extends: [
    'plugin:react/recommended',
    'standard-with-typescript',
    'eslint:recommended',
    'plugin:prettier/recommended'
  ],
  overrides: [],
  parserOptions: {
    ecmaVersion: 'latest'
  },
  plugins: ['react'],
  rules: {
    'react/react-in-jsx-scope': 'off'
  }
};