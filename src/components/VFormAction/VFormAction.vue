<template>
  <ant-col
    v-bind="getColProps"
  >
    <ant-row :justify="justify">
      <ant-button
        v-bind="getResetBtnProps"
        @click="emits('reset')"
      >
        {{ getResetBtnProps?.text }}
      </ant-button>
      <ant-button
        v-if="submitBtn"
        v-bind="getSubmitBtnProps"
        @click="emits('submit')"
      >
        {{ getSubmitBtnProps?.text }}
      </ant-button>
    </ant-row>
  </ant-col>
</template>

<script lang="ts" setup name="VFormAction">
import { computed, PropType } from 'vue'
import { Row as AntRow, Col as AntCol, Button as AntButton } from 'ant-design-vue'
import { calColProps } from '@/utils'
import { VJustify, VFormActionBtnProps } from '@/types/VFormProps'

const defaultResetBtnProps: VFormActionBtnProps = {
  text: '重置',
  type: 'default'
}
const defaultSubmitBtnProps: VFormActionBtnProps = {
  text: '提交',
  type: 'primary'
}

const props = defineProps({
  actCol: {
    type: [Number, String, Object],
    default: 24
  },
  justify: {
    type: String as PropType<VJustify>,
    default: 'end'
  },
  resetBtn: {
    type: [Boolean, Object],
    default: true
  },
  submitBtn: {
    type: [Boolean, Object],
    default: true
  }
})

const getColProps = computed(() => calColProps(props.actCol))
const getSubmitBtnProps = computed(() => {
  if (!props.submitBtn) {
    return
  }
  if (typeof props.submitBtn === 'object') {
    return Object.assign(defaultSubmitBtnProps, props.submitBtn)
  }
  return defaultSubmitBtnProps
})
const getResetBtnProps = computed(() => {
  if (!props.resetBtn) {
    return
  }
  if (typeof props.resetBtn === 'object') {
    return Object.assign(defaultResetBtnProps, props.resetBtn)
  }
  return defaultResetBtnProps
})

const emits = defineEmits(['reset', 'submit'])
</script>