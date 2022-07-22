import type { App, Component } from 'vue'

const components: Record<string, Component> = import.meta.glob('./*/V*.vue', {
  eager: true,
  import: 'default'
})

export default function installVComponents(app: App) {
  for (const dir in components) {
    const comp = components[dir]
    const compName = comp.name || dir.match(/(\w*).vue/)?.[1]
    compName && app.component(compName, comp)
  }
}