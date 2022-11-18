module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
  },
  extends: 'airbnb-base',
  overrides: [
  ],
  parserOptions: {
    ecmaVersion: 'latest',
  },
  rules: {
    'max-len': 0,
    'consistent-return': 0,
    'no-return-await': 0,
    'prefer-destructuring': 0,
  },
};
