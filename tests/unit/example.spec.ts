import { shallowMount } from '@vue/test-utils'
import app from '@/example/app.vue'

describe('app.vue', () => {
  it('renders props.msg when passed', () => {
    const msg = 'new message'
    const wrapper = shallowMount(app, {
      propsData: {msg}
    })
    expect(wrapper.text()).toMatch(msg)
  })
})
