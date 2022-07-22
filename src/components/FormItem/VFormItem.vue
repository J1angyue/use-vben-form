<script lang="tsx">
import { defineComponent, PropType, VNode } from 'vue'
import { Form, Col } from 'ant-design-vue'
import { VFormSchema, VFormItemProps } from '@t/VFormProps'
import compMapApi from '@/componentMap'
import { calColProps } from '@u/index'

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
  const show = schema[showField] ?? true
  if (typeof show === 'boolean') {
    return show
  }
  if (typeof show === 'function') {
    return show({ schema })
  }
  return !!show
}

function getDisabled (props: VFormItemProps, schema: VFormSchema) {
  return schema.componentProps?.disabled ?? props.formDisabled
}

function getRenderRes(schema: VFormSchema, slot: VNode | VNode[] | undefined) {
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

export default defineComponent({
  name: 'VFormItem',
  components: { AntFormItem: Form.Item, AntCol: Col },
  props: vFormItemProps,
  setup(props, { slots }) {
    return () => {
      const { schema, model } = props

      if (!getIsSchemaShow(schema, 'ifShow')) {
        return
      }

      if (typeof schema.render === 'function') {
        return getRenderRes(schema, schema.render({ schema, model }),)
      }

      if (schema.slot) {
        return getRenderRes(schema, slots.default?.({ schema, model }))
      }

      const comp = schema.component && compMapApi.get(schema.component)
      if (schema.component && comp) {
        const modelField = schema.modelField || schema.field
        const slot = <comp
            {...schema.componentProps}
            vModel:value={model[modelField]}
            disabled={getDisabled(props, schema)}
          />
        return getRenderRes(schema, slot)
      }
    }
  }
})
</script>