<template>
  <ant-form
    class="v-form ant-row"
    v-bind="getBindProps"
  >
    <slot name="header" />
    <v-form-item
      v-for="schema in schemas"
      :key="schema.field"
      :schema="schema"
      :form-disabled="disabled"
      :model="getBindProps.model"
    >
      <slot
        v-if="schema.slot && !schema.render"
        :name="schema.slot"
        :schema="schema"
      />
    </v-form-item>
    <v-form-action
      v-if="!action"
      v-bind="getActionProps"
      @reset="onReset"
      @submit="onSubmit"
    />
    <slot name="footer" />
  </ant-form>
</template>

<script lang="ts" setup>
import { computed, useAttrs } from 'vue'
import { Form as AntForm, FormProps } from 'ant-design-vue'
import VFormItem from '@c/FormItem/VFormItem.vue'
import VFormAction from '@c/VFormAction/VFormAction.vue'
import type { VFormProps, VFormSchema } from '@t/VFormProps'

const attrs = useAttrs()

const props = defineProps({
  schemas: {
    type: Array<VFormSchema>,
    default: () => []
  },
  disabled: {
    type: Boolean,
    default: false
  },
  action: {
    type: [Boolean, Object],
    default: undefined
  }
})

const getBindProps = computed(() => Object.assign(
  {},
  attrs,
  (props as VFormProps)) as FormProps
)
const getActionProps = computed(() => {
  if(!props.action || typeof props.action === 'boolean') {
    return
  }
  return props.action
})

function onReset() {
  console.log('reset')
}
function onSubmit() {
  console.log('submit')
}
</script>