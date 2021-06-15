/**
 * @Author: Mojie
 * @Date: 2021-06-10 16:12:08
 */

module.exports = {
  plugins: {
    autoprefixer: {},
    'postcss-pxtorem': {
      rootValue: 37.5,
      propList: ['*'],
      // selectorBlackList: ['van'], // 过滤不处理所以带有'van-'开头的类名
    },
  },
}
