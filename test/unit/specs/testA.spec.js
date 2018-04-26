import Vue from 'vue'
import  testA from '@/packages/test-a'

describe('testA.vue', () => {
  it('should render correct contents', () => {
    const Constructor = Vue.extend(testA)
    const vm = new Constructor().$mount()
    expect(vm.$el.querySelector('.testA').textContent)
      .toEqual('test A')
  })
})
