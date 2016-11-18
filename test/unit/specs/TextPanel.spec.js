import Vue from 'vue'
import TextPanel from 'src/components/TextPanel'
import Text from 'src/store/structure/text'

function createTextPanel (component, propsData) {
  const Ctor = Vue.extend(component)
  const vm = new Ctor({ propsData }).$mount()
  return vm
}

const singleStringText = new Text({
  'text': 'this is a single text string'
})

describe('TextPanel.vue', () => {
  it('should correctly render a single string', () => {
    const vm = createTextPanel(TextPanel, {
      'textData': singleStringText
    })
    expect(vm.$el.querySelector('#text-panel pre').textContent)
      .to.equal('this is a single text string')
  })
})
