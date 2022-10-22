<script lang="tsx">
import { defineComponent, PropType, reactive, VNode, computed, unref } from 'vue'
import { Form, Col } from 'ant-design-vue'
import { VFormSchema, VFormItemProps, ComponentSlots, AntNamePath } from '@t/VFormProps'
import compMapApi from '@/componentMap'
import { calColProps } from '@u/index'
import { cloneDeep, get, isEmpty, isFunction } from 'lodash'

const vFormItemProps = {
  schema: {
    type: Object as PropType<VFormSchema>,
    required: true,
    default: () => ({})
  },
  schemas: {
    type: Array as PropType<Array<VFormSchema>>,
    default: () => []
  },
  model: {
    type: Object as PropType<Record<string, unknown>>,
    default: () => ({})
  },
  formDisabled: {
    type: Boolean,
    default: false
  }
}

function getIsSchemaShow(schema: VFormSchema, showField: 'isShow' | 'ifShow'): boolean {
  schema = unref(schema)
  const show = schema[showField] ?? true
  if (typeof show === 'boolean') {
    return show
  }
  if (typeof show === 'function') {
    return show({ schema })
  }
  return !!show
}

function getDisabled(props: VFormItemProps, schema: VFormSchema) {
  return schema.componentProps?.disabled ?? props.formDisabled
}

function getRenderRes(schema: VFormSchema, slot?: VNode | VNode[]) {
  schema = unref(schema)
  return (
    <ant-col
      vShow={getIsSchemaShow(schema, 'isShow')}
      {...calColProps(schema.itemCol)}
    >
      <ant-form-item
        name={schema.field}
        label={schema.label}
        label-col={calColProps(schema.labelCol)}
        colon={schema.colon}
        required={schema.required}
        rules={schema.rules}
      >
        {slot}
      </ant-form-item>
    </ant-col>
  )
}

function getCompSlots(schema: VFormSchema, model: unknown) {
  if (!schema.componentSlots || isEmpty(schema.componentSlots)) {
    return
  }
  return Object.keys(schema.componentSlots).reduce(
    (slots, slotName) => {
      const slot = schema.componentSlots?.[slotName]
      slots[slotName] = typeof slot === 'function'
        ? () => slot({ schema, model })
        : () => slot
      return slots
    },
    {} as ComponentSlots
  )
}

function getVModelBind(model: Record<string, unknown>, field: string | AntNamePath) {
  if (Array.isArray(field)) {
    model = get(model, field.slice(0, field.length - 1))
    return { toBinded: reactive(model), field: field[field.length - 1]}
  }
  return { toBinded: reactive(model), field }
}

export default defineComponent({
  name: 'VFormItem',
  components: { AntFormItem: Form.Item, AntCol: Col },
  props: vFormItemProps,
  setup(props, { slots }) {
    const model = computed(() => props.model)
    const schema = computed(() => cloneDeep(props.schema)) as unknown as VFormSchema

    return () => {
      if (!getIsSchemaShow(schema, 'ifShow')) {
        return
      }
      if (isFunction(unref(schema.render))) {
        return getRenderRes(schema, unref(schema).render?.({ schema, model }))
      }
      if (schema.slot) {
        return getRenderRes(schema, slots.default?.({ schema, model }))
      }

      const comp = compMapApi.get(unref(schema).component)
      if (!comp) {
        return getRenderRes(schema)
      }

      const { toBinded, field } = getVModelBind(
        unref(model),
        unref(schema).modelField || unref(schema).field
      )

      return getRenderRes(
        schema,
        <comp
          {...schema.componentProps}
          disabled={getDisabled(props, schema)}
          vModel={[toBinded[field], 'value']}
        >
          {getCompSlots(schema, model)}
        </comp>
      )
    }
  }
})
</script>