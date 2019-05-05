module.exports = {
  root: true,
  'extends': [
    'plugin:vue/essential',
    '@vue/standard'
  ],
  rules: {
    // allow async-await
    'generator-star-spacing': 'off',
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'vue/no-parsing-error': [2, {
      'x-invalid-end-tag': false
    }],
    "space-before-function-paren": [0, "always"],
    "semi": [0,'always'],
    "one-var": 0,
    "quotes": 0,
    "eqeqeq": 0,
    "comma-spacing": 0,
    'no-undef': 'off',
    'camelcase': 'off',
    'no-tabs': 'off'
  },
  parserOptions: {
    parser: 'babel-eslint'
  }
}
