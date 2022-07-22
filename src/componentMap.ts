import type { Component } from 'vue'
import type { ComponentType } from '@t/ComponentType'

import {
  Input,
  Select,
  Radio,
  Checkbox,
} from 'ant-design-vue'

const componentMap = new Map<ComponentType, Component>()

componentMap.set('Input', Input)
componentMap.set('InputGroup', Input.Group)
componentMap.set('InputPassword', Input.Password)
componentMap.set('InputSearch', Input.Search)
componentMap.set('InputTextArea', Input.TextArea)

componentMap.set('Select', Select)
componentMap.set('RadioGroup', Radio.Group)
componentMap.set('Checkbox', Checkbox)
componentMap.set('CheckboxGroup', Checkbox.Group)

const compMapApi = { get, set, del }

function set(compName: ComponentType, component: Component) {
  componentMap.set(compName, component)
}

function get(compName: ComponentType) {
  return componentMap.get(compName)
}

function del(compName: ComponentType) {
  componentMap.delete(compName)
}

export default compMapApi