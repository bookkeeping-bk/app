/*
 * @Author: Mojie
 * @Date: 2021-06-15 14:31:23
 */

import { createLogger, createStore } from 'vuex'

const modulesFiles = import.meta.globEager('./modules/*.ts')
const modules: any = {}
const debug = import.meta.env.VITE_VUEX_DEBUG === 'true'

for (const path in modulesFiles) {
  const moduleName = path.replace(/^\.\/modules\/(.*)\.\w+$/, '$1')
  modules[moduleName] = modulesFiles[path].default
}

export default createStore({
  modules,
  plugins: debug ? [createLogger()] : [],
  strict: debug,
})
