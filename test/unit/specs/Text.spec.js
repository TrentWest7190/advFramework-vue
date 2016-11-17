import Text from 'src/store/structure/text'

describe('Text Data Object', () => {
  it('handles text as a string', () => {
    const t = new Text({
      'id': 1,
      'text': 'test text'
    })
    expect(t.getText()).to.equal('test text')
  })
})
