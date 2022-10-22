<template>
  <v-form
    :colon="false"
    :schemas="schemas"
    :model="model"
    :rules="rules"
    strict-model-keys-by-schemas
    name="uForm1"
  />
</template>

<script lang="ts" setup>
import { VFormSchema } from '@t/VFormProps'
import { h } from 'vue'

const model = {
  nam: '张三',
  addr: {
    usually: {
      province: '山东',
      city: '临沂'
    }
  }
}

const rules = {
  // 'addr[usually[province]]': [
  //   { required: true, message: 'Please input address.' }
  // ]
}

const schemas: VFormSchema[] = [
  {
    field: 'nam',
    component: 'Input',
    label: '姓名',
    required: true,
    colon: false,
    // componentProps: {
    //   addonBefore: 'http://'
    // },
    componentSlots: {
      addonBefore: () => h('button', ['addonBefore']),
      addonAfter: () => h('button', ['addonAfter'])
    }
  },
  {
    field: ['addr', 'usually', 'province'],
    component: 'Input',
    label: '地址',
    // rules: [
    //   { required: true, message: 'PLZ input address.' }
    // ],
    componentProps: {
      disabled: false
    }
  }
]
</script>