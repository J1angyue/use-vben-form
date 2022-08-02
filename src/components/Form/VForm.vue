<template>
  <ant-form
    class="v-form ant-row"
    v-bind="getBindProps"
    @submit="onFormSubmit"
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
      @submit="onActionSubmit"
    />
    <slot name="footer" />
  </ant-form>
</template>

<script lang="ts" setup>
import { computed, useAttrs, ref, watch, onMounted, unref, Ref } from 'vue'
import { Form as AntForm, FormProps } from 'ant-design-vue'
import VFormItem from '@c/FormItem/VFormItem.vue'
import VFormAction from '@c/VFormAction/VFormAction.vue'
import type { VFormProps, VFormSchema, VFormActions } from '@t/VFormProps'
import { cloneDeep, merge } from 'lodash'
import { NamePath } from 'ant-design-vue/lib/form/interface'

const attrs = useAttrs()
const emits = defineEmits(['register', 'reset', 'submit'])

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
  },
  strictModelKeysBySchemas: {
    type: Boolean,
    default: false
  }
})

const antFormRef = ref<VFormActions | null>(null)

const schemasRef = ref<VFormSchema[]>([])
watch(
  () => props.schemas,
  (newSchemas) => (schemasRef.value = cloneDeep(unref(newSchemas))),
  { deep: false }
)

const modelRef = ref(getFormModel())
watch(
  () => attrs.model,
  (newModel) => (modelRef.value = cloneDeep(unref(newModel))),
  { deep: false }
)

const getBindProps = computed(
  () => Object.assign(
    {
      model: modelRef.value
    },
    attrs,
    (props as VFormProps)
  ) as FormProps
)
const getActionProps = computed(() => {
  if(!props.action || typeof props.action === 'boolean') {
    return
  }
  return props.action
})

function insertSchemas(
  schemas: VFormSchema | VFormSchema[],
  schemaList: VFormSchema[] | Ref<VFormSchema[]>,
  index: number
) {
  schemaList = unref(schemaList)
  if (index > schemaList.length || index < 0) {
    return
  }
  Array.isArray(schemas)
    ? schemaList.splice(index, 0, ...schemas)
    : schemaList.splice(index, 0, schemas)
}


function validate(nameList?: NamePath[]) {
  return Promise.resolve(unref(antFormRef.value)?.validate(nameList))
}
function clearValidate(nameList?: NamePath[]) {
  unref(antFormRef.value)?.clearValidate(nameList)
}
function validateThenSubmit(
  {
    nameList,
    beforeSubmit
  }: {
    nameList?: NamePath[],
    beforeSubmit?: () => Promise<unknown>
  } = {}
) {
  return validate(nameList).then(beforeSubmit).then()
}
function setFieldsValue(values: unknown) {
  merge(modelRef.value, values)
}
function resetFields(nameList?: NamePath[]) {
  unref(antFormRef.value)?.resetFields(nameList)
}
function appendSchemas(schemas: VFormSchema | VFormSchema[]) {
  insertSchemas(schemas, schemasRef, unref(schemasRef).length)
}
function addSchemaBefore(field: string, schemas: VFormSchema | VFormSchema[]) {
  const fieldIdx = schemasRef.value.findIndex(v => v.field === field)
  insertSchemas(schemas, schemasRef, fieldIdx)
}
function addSchemaAfter(field: string, schemas: VFormSchema | VFormSchema[]) {
  const fieldIdx = schemasRef.value.findIndex(v => v.field === field)
  insertSchemas(schemas, schemasRef, fieldIdx + 1)
}
function updateSchemas(schemas: VFormSchema | VFormSchema[]) {
  schemas = Array.isArray(schemas) ? schemas : [schemas]
  const schemasMap = new Map<string | NamePath, VFormSchema>()
  schemas.forEach(schema => schemasMap.set(schema.field, schema))
  schemasRef.value.forEach((schema) => {
    if (!schemasMap.has(schema.field)) {
      return
    }
    merge(schema, schemasMap.get(schema.field))
  })
}
function removeSchemas(fields: string | string[]) {
  fields = Array.isArray(fields) ? fields : [fields]
  for (const field of fields) {
    const index = schemasRef.value.findIndex(schema => schema.field === field)
    if (index < 0) {
      continue
    }
    schemasRef.value.splice(index, 1)
  }
}

const formActions: VFormActions = {
  validate,
  clearValidate,
  validateThenSubmit,
  setFieldsValue,
  resetFields,
  appendSchemas,
  addSchemaBefore,
  addSchemaAfter,
  updateSchemas,
  removeSchemas
}

function getFormModel() {
  let model = unref(attrs.model)
  if (!model) {
    return
  }
  model = cloneDeep(model)
  if (props.strictModelKeysBySchemas) {
    // TODO: 将不存在于 schemas 中的 model 键删掉
  }
  return model
}

function onFormSubmit(event: Event) {
  event.preventDefault()
  onActionSubmit()
}

function onReset() {
  emits('reset')
}
function onActionSubmit() {
  emits('submit')
}

onMounted(() => {
  emits('register', formActions)
})
</script>