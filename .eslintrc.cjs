/* eslint-env node */
module.exports = {
  extends: [
    'next',
    'next/core-web-vitals',
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/stylistic',
  ],
  plugins: ['@typescript-eslint'],
  parser: '@typescript-eslint/parser',
  globals: {
    React: 'readonly',
  },
  rules: {
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': 'warn',
  },
  root: true,
};
