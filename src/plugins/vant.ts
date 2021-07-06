/*
 * @Author: Mojie
 * @Date: 2021-06-11 10:53:28
 */

import { App } from '@vue/runtime-core'
import {
  Button,
  PullRefresh,
  List,
  Empty,
  Popup,
  NavBar,
  Form,
  Field,
  RadioGroup,
  Radio,
  Picker,
  DatetimePicker,
  Tabs,
  Tab,
  Icon,
} from 'vant'

export default function (app: App): void {
  app.use(Button)
  app.use(PullRefresh)
  app.use(List)
  app.use(Empty)
  app.use(Popup)
  app.use(NavBar)
  app.use(Form)
  app.use(Field)
  app.use(RadioGroup)
  app.use(Radio)
  app.use(Picker)
  app.use(DatetimePicker)
  app.use(Tabs)
  app.use(Tab)
  app.use(Icon)
}
