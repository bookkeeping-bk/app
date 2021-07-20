/*
 * @Author: Mojie
 * @Date: 2021-07-16 17:42:17
 */

if (import.meta.env.VITE_VCONSOLE === 'true') {
  import('vconsole').then((module) => {
    const VConsole = module.default
    new VConsole()
  })
}
