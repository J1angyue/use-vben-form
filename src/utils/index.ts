import { App, Component } from 'vue'
import { VColProps } from '@t/VFormProps'

export function withInstall (comp: Component, name: string): Component {
  if (!comp || !name) {
    return {}
  }
  function install(app: App) {
    app.component(name ?? comp.name ?? '', comp)
  }
  Object.defineProperty(comp, 'install', { value: install })
  return comp
}

export function calColProps(labelCol: string | number | VColProps = 24): VColProps | undefined {
  if (typeof labelCol === 'number') {
    return { span: labelCol }
  }
  if (typeof labelCol === 'string') {
    return { style: { width: labelCol } }
  }
  return labelCol
}