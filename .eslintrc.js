const aliases = require('./aliases');

module.exports = {
  extends: 'airbnb',
  env: {
    node: true,
    es6: true,
    browser: true,
    jest: true,
  },
  parser: 'babel-eslint',
  rules: {
    'react/jsx-filename-extension': [1, { 'extensions': ['.js', '.jsx'] }],
    'react/jsx-one-expression-per-line': 0,
    'react/react-in-jsx-scope': 0,
    'jsx-a11y/label-has-associated-control': [ 2, {'required': {'every': [ 'id' ]}}],
    'import/no-extraneous-dependencies': 0, // ['error, {'devDependencies': false, 'optionalDependencies': true, 'peerDependencies': true }],
    'jsx-a11y/anchor-is-valid': 0, // for next.js Link
  },
  settings: {
    'import/resolver': {
      alias: {
        map: aliases.relativeAliases,
        extensions: ['.ts', '.js', '.jsx', '.json'],
      },
    },
  },
};