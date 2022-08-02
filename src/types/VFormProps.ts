import { ComponentType } from '@t/ComponentType'
import { ButtonProps as AntButtonProps } from 'ant-design-vue'
import type {
  NamePath as AntNamePath,
  Rule as AntRule
} from 'ant-design-vue/lib/form/interface'
import type { VNode } from 'vue'

export declare type VJustify = 'space-around' | 'space-between' | 'center' | 'end' | 'start'

interface VBasicColProps {
  // flex 布局填充
  flex?: string | number;
  // 栅格左侧的间隔格数
  offset?: number;
  // flex 栅格顺序
  order?: 	number;
  // 	栅格向左移动格数
  pull?: number;
  // 栅格向右移动格数
  push?: number;
  // 栅格占位格数，为 0 时 display: none;
  span?: number;
}

export interface VColProps extends VBasicColProps {
  style?: Partial<CSSStyleDeclaration>;
  // ≥2000px 栅格数
  xxxl?: number | VBasicColProps;
  // <576px
  xs?: number | VBasicColProps;
  // ≥576px
  sm?: number | VBasicColProps;
  // ≥768px
  md?: number | VBasicColProps;
  // ≥992px
  lg?: number | VBasicColProps;
  // ≥1200px
  xl?: number | VBasicColProps;
  // ≥1600px
  xxl?: number | VBasicColProps;
}

export interface VFormSechmaCbParam {
  schema?: VFormSchema;
  schemas?: VFormSchema[];
  model?: Record<string, unknown>;
}

export interface VFormSchema {
  // 对应 VFormProps.model 的字段
  field: string | AntNamePath;
  // 与 v-model:modelValue 绑定的字段
  modelField?: string;
  // 表单项文本标题
  label?: string | VNode | VNode[];
  // 表单项次级文本标题
  subLable?: string;
  // label 标签布局，快捷设置：数字值时是为赋值 span="x"，字符串 { style: { width: '666px' } }
  labelCol?: VColProps | string | number;
  component?: ComponentType;
  componentProps?: Record<string, unknown>;
  required?: boolean;
  // 该表单项验证规则，会覆盖 <v-form /> 的 rules
  rules?: AntRule[];
  // FormItem-Col 布局，快捷设置：数字值时是为赋值 span="x"，字符串 { style: { width: '666px' } }
  itemCol?: VColProps | string | number;
  // <v-form /> 中设置插槽
  slot?: string;
  // 完全的渲染能力方法，有 render 时， slot 不生效
  render?: (param: VFormSechmaCbParam) => VNode | VNode[];
  // 表单项是否 display: none;
  isShow?: boolean | ((param: VFormSechmaCbParam) => boolean);
  // 是否生成该表单项DOM元素
  ifShow?: boolean | ((param: VFormSechmaCbParam) => boolean);
  // 是否显示冒号
  colon?: boolean;
}

export interface VFormItemProps {
  schema?: VFormSchema,
  schemas?: VFormSchema[],
  model?: Record<string, unknown>,
  formDisabled?: boolean
}

// ant-form 原有 props
interface AntFormProps {
  // Form.Item 是否显示冒号，默认值 true
  colon?: boolean;
  // 是否隐藏所有表单项的必选标记
  hideRequiredMark?: boolean;
  // label 标签布局，快捷设置：数字值时是为赋值 span="x"、字符串： { style: { width: '666px' } }
  labelCol?: VColProps | string | number;
  // label 文本是否换行，默认值 false
  labelWrap?: boolean;
  // label 文本左右对齐，默认值 'left'
  labelAlign?: 'left' | 'right';
  // 表单布局，默认值'horizontal'
  layout?: 'horizontal' | 'vertical' | 'inline';
  // 表单数据对象
  model?: unknown;
  // 表单名称，会作为表单字段 id 前缀使用
  name?: string;
  // 表单验证规则，会被 schema 中同字段 rules 覆盖
  rules?: Record<string, AntRule>;
  // 提交失败自动滚动到第一个错误字段，默认值 false
  scrollToFirstError?: boolean;
  // 是否在 rules 属性改变后立即触发一次验证，默认值 true
  validateOnRuleChange?: boolean;
  // 统一设置字段校验规则，默认值'change'
  validateTrigger?: string | string[];
  // 输入控件设置布局样式，不含 label
  wrapperCol?: VColProps;
}

export interface VFormActionBtnProps extends AntButtonProps {
  // 按钮上的文字
  text?: string;
}

export interface VFormActionProps {
  // 整行的布局选项，快捷设置：数字值时是为赋值 span="x"、字符串： { style: { width: '666px' } }
  actCol?: string | number | VColProps;
  // 水平方向（flex 主轴）的布局
  justify?: VJustify;
  // falsely 不显示重置按钮，true 显示并使用默认 props，object 显示并使用给定 props
  resetBtn?: VFormActionBtnProps | boolean;
  // 同上
  submitBtn?: VFormActionBtnProps | boolean;
}

export interface VFormProps extends AntFormProps {
  schemas: VFormSchema[];
  // <v-form /> 内 model 的键严格由每个 schema.field 组成
  strictModelKeysBySchemas?: boolean;
  // 是否禁用所有表单项
  disabled?: boolean;
  // falsely 不显示“提交、重置”按钮行， true 显示并使用默认配置， object 显示并使用给定配置
  action?: boolean | VFormActionProps;
  // 是否在 <v-form /> 挂载后自动聚焦第一个输入元素
  autoFocusFirstItem?: boolean;
}

export interface VFormActions {
  // 验证
  validate: (nameList?: AntNamePath[]) => Promise<unknown>;
  // 清除验证
  clearValidate: (nameList?: AntNamePath[]) => void;
  // 验证 + 触发 submit， beforeSubmit 在 validate() 调用后和 submit() 前调用
  validateThenSubmit: (params?: {
    nameList?: AntNamePath[]
    beforeSubmit?: () => Promise<unknown>
  }) => Promise<unknown>
  // 设置 model 字段值
  setFieldsValue: (values: unknown) => void;
  // 重置表单
  resetFields: (nameList?: AntNamePath[]) => void;
  // 在末尾追加 schema，可直接传单个 schema 也可传 schema 数组
  appendSchemas: (schema: VFormSchema | VFormSchema[]) => void;
  // 在 field 的 schema `前`增加
  addSchemaBefore: (field: string, schemas: VFormSchema | VFormSchema[]) => void;
  // 在 field 的 schema `后`增加
  addSchemaAfter: (field: string, schemas: VFormSchema | VFormSchema[]) => void;
  // 更新 schema
  updateSchemas: (schemas: VFormSchema | VFormSchema[]) => void;
  // 删除 schema
  removeSchemas: (fields: string | string[]) => void;
}
