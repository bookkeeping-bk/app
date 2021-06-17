/*
 * @Author: Mojie
 * @Date: 2021-06-11 10:53:28
 */

import { App } from '@vue/runtime-core'
import { Button, PullRefresh, List, Empty, Popup, NavBar } from 'vant'

export default function (app: App) {
  app.use(Button)
  app.use(PullRefresh)
  app.use(List)
  app.use(Empty)
  app.use(Popup)
  app.use(NavBar)
}
