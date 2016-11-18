import Text from 'src/store/structure/text'

describe('Text Data Object', () => {
  it('handles text as a string', () => {
    const t = new Text({
      'id': 1,
      'text': 'test text'
    })
    expect(t.getTextType()).to.equal('string')
    expect(t.getLoadedText()).to.equal('test text')
  })

  it('handles an array of strings', () => {
    const t = new Text({
      'id': 1,
      'text': ['first string', 'second string']
    })
    expect(t.getTextType()).to.equal('array')
    expect(t.getLoadedText()).to.equal('first string')
    t.incrementPointer()
    t.loadTextFromStore()
    expect(t.getLoadedText()).to.equal('second string')
  })

  it('handles a string object', () => {
    const t = new Text({
      'id': 1,
      'text': {'default': 'first string', 'second': 'second string'}
    })
    expect(t.getTextType()).to.equal('object')
    expect(t.getLoadedText()).to.equal('first string')
    t.loadTextFromStore('second')
    expect(t.getLoadedText()).to.equal('second string')
  })

  it('can continuously loop through an array', () => {
    const t = new Text({
      'id': 1,
      'text': ['first string', 'second string'],
      'displayType': 'loop'
    })
    expect(t.getLoadedText()).to.equal('first string')
    t.loadTextFromStore()
    expect(t.getLoadedText()).to.equal('second string')
    t.loadTextFromStore()
    expect(t.getLoadedText()).to.equal('first string')
  })

  it('will stop at the end of an array if it\'s not supposed to loop', () => {
    const t = new Text({
      'id': 1,
      'text': ['first string', 'second string'],
      'displayType': 'toEnd'
    })
    expect(t.getLoadedText()).to.equal('first string')
    t.loadTextFromStore()
    expect(t.getLoadedText()).to.equal('second string')
    t.loadTextFromStore()
    expect(t.getLoadedText()).to.equal('second string')
  })
})
