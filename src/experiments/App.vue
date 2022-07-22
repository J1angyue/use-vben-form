<template>
  <v-form
    :colon="false"
    :schemas="schemas"
    :model="model"
    :rules="rules"
    name="uForm1"
  />
</template>

<script lang="ts" setup>
import { VFormSchema } from '@t/VFormProps'
import { reactive } from 'vue'

const model = reactive({
  nam: '张三',
  addr: '山东省临沂市'
})

const rules = {
  addr: [
    { required: true, message: 'Please input address.' }
  ]
}

const schemas: VFormSchema[] = [
  {
    field: 'nam',
    component: 'Input',
    label: '姓名',
    required: true,
    colon: false
  },
  {
    field: 'addr',
    component: 'Input',
    label: '地址',
    rules: [
      { required: true, message: 'PLZ input address.' }
    ],
    componentProps: {
      disabled: true
    }
  }
]
</script>