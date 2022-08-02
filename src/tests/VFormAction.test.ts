import { mount } from '@vue/test-utils'
import VFormAction from '@c/VFormAction/VFormAction.vue'
import { nextTick } from 'vue'

test('VFormActionProps',async () => {
  const props = {
    resetBtn: { text: 'reset-text' },
    submitBtn: { text: 'submit-text' }
  }

  const wrapper = await mount(VFormAction, {
    props
  })

  expect(wrapper.findAll('button').map(btn => btn.text()).join('+'))
  .toBe(`${props.resetBtn.text}+${props.submitBtn.text}`)

  wrapper.setProps({ actCol: 12 })
  await nextTick()
  expect(wrapper.find('div').classes('ant-col-12'))
  .toBe(true)

  wrapper.setProps({ actCol: '100px' })
  await nextTick()
  expect(wrapper.find('div').element.style.width)
  .toBe('100px')

})