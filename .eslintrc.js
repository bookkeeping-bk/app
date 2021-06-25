/**
 * @Author: Mojie
 * @Date: 2021-06-10 17:29:23
 */

module.exports = {
  // root: true,
  env: {
    browser: true,
    es2021: true,
    node: true,
  },

  parser: 'vue-eslint-parser',

  parserOptions: {
    parser: '@typescript-eslint/parser',
    ecmaVersion: 2020,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },

  extends: [
    'plugin:vue/vue3-recommended',
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended', // typescript-eslint推荐规则
    // 'prettier/@typescript-eslint',
    'plugin:prettier/recommended', // 使用prettier中的样式规范，且如果使得ESLint会检测prettier的格式问题，同样将格式问题以error的形式抛出. 确保在最后一个.
  ],
  rules: {
    'no-undef': 0,
  },
}
