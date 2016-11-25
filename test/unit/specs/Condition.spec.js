import Condition from 'src/components/constructs/Condition'

const flags = {
  'trueFlag': true,
  'falseFlag': false,
  'numberFlag': 1
}

const items = [
  {
    'itemName': 'testItem'
  }
]

describe('Condition', () => {
  it('Can handle logical operator "is"', () => {
    let testCondition = new Condition([{
      'type': 'flag',
      'flag': 'trueFlag',
      'condition': 'is',
      'value': true
    }], flags)

    expect(testCondition.checkConditions()).to.equal(true)
  })

  it('Can handle logical operator "greaterThan"', () => {
    let testCondition = new Condition([{
      'type': 'flag',
      'flag': 'numberFlag',
      'condition': 'greaterThan',
      'value': 0
    }], flags)

    expect(testCondition.checkConditions()).to.equal(true)
  })

  it('Can handle logical operator "lessThan"', () => {
    let testCondition = new Condition([{
      'type': 'flag',
      'flag': 'numberFlag',
      'condition': 'lessThan',
      'value': 2
    }], flags)

    expect(testCondition.checkConditions()).to.equal(true)
  })

  it('Can handle logical operator "has"', () => {
    let testCondition = new Condition([{
      'type': 'inventory',
      'condition': 'has',
      'value': 'testItem'
    }], flags, items)

    expect(testCondition.checkConditions()).to.equal(true)
  })

  it('Returns true when there is no condition to check', () => {
    let testCondition = new Condition()

    expect(testCondition.checkConditions()).to.equal(true)
  })

  it('Returns false when there is an invalid condition type', () => {
    let testCondition = new Condition([{
      'type': 'notReal',
      'condition': 'fake',
      'value': 'wrong'
    }])

    expect(testCondition.checkConditions()).to.equal(false)
  })
})
