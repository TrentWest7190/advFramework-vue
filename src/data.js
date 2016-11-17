const textData = [{
  'id': 1,
  'text': 'the first test text string'
}, {
  'id': 2,
  'text': 'the second test text string'
}, {
  'id': 3,
  'text': 'test screen for counters'
}, {
  'id': 4,
  'text': 'inventory test'
}, {
  'id': 5,
  'text': 'doota doot doo'
}]

const buttonData = [{
  'id': 1,
  'text': 'go forward',
  'action': [{
    'type': 'loadScreen',
    'target': 2
  }]
}, {
  'id': 2,
  'text': 'go back',
  'action': [{
    'type': 'loadScreen',
    'target': 1
  }]
}, {
  'id': 3,
  'text': 'activate flag',
  'action': [{
    'type': 'setFlag',
    'target': {
      'flagName': 'testFlag',
      'operation': 'setValue',
      'value': true
    }
  }]
}, {
  'id': 4,
  'text': 'show up'
}, {
  'id': 5,
  'text': 'counter is equal'
}, {
  'id': 6,
  'text': 'counter is less'
}, {
  'id': 7,
  'text': 'counter is greater'
}, {
  'id': 8,
  'text': '3rd screen',
  'action': [{
    'type': 'loadScreen',
    'target': 3
  }]
}, {
  'id': 9,
  'text': 'increase counter by 1',
  'action': [{
    'type': 'setFlag',
    'target': {
      'flagName': 'testCounter',
      'operation': 'plus',
      'value': 1
    }
  }]
}, {
  'id': 10,
  'text': 'descrease counter by 1',
  'action': [{
    'type': 'setFlag',
    'target': {
      'flagName': 'testCounter',
      'operation': 'minus',
      'value': 1
    }
  }]
}, {
  'id': 11,
  'text': 'pick up horn',
  'action': [{
    'type': 'getItem',
    'target': {
      'itemName': 'horn',
      'amount': 1
    }

  }]
}, {
  'id': 12,
  'text': 'play horn',
  'action': [{
    'type': 'displayText',
    'target': {
      'id': 5
    }
  }]
}, {
  'id': 13,
  'text': 'drop horn',
  'action': [{
    'type': 'dropItem',
    'target': {
      'itemName': 'horn'
    }
  }]
}]

const screenData = [{
  'id': 1,
  'text': 1,
  'buttons': [
    { 'id': 1 },
    { 'id': 3 }
  ]
}, {
  'id': 2,
  'text': 2,
  'buttons': [
    { 'id': 2 }, {
      'id': 4,
      'conditional': [{
        'flag': 'testFlag',
        'condition': 'is',
        'value': true
      }]
    },
    { 'id': 8 }
  ]
}, {
  'id': 3,
  'text': 3,
  'buttons': [{
    'id': 5,
    'conditional': [{
      'flag': 'testCounter',
      'condition': 'is',
      'value': 10
    }]
  }, {
    'id': 6,
    'conditional': [{
      'flag': 'testCounter',
      'condition': 'lessThan',
      'value': 10
    }]
  }, {
    'id': 7,
    'conditional': [{
      'flag': 'testCounter',
      'condition': 'greaterThan',
      'value': 10
    }]
  },
  { 'id': 9 },
  { 'id': 10 }
  ]
}, {
  'id': 4,
  'text': 4,
  'buttons': [
    { 'id': 11 }, {
      'id': 12,
      'conditional': [{
        'type': 'inventory',
        'condition': 'has',
        'value': 'horn'
      }]
    }, {
      'id': 13,
      'conditional': [{
        'type': 'inventory',
        'condition': 'has',
        'value': 'horn'
      }]
    }
  ]
}]

const flagData = [{
  'flagName': 'testFlag',
  'defaultValue': false
}, {
  'flagName': 'testCounter',
  'defaultValue': 10
}]

const inventoryData = [{
  'itemName': 'oldKey',
  'text': 'An old key',
  'uses': 1
}, {
  'itemName': 'horn',
  'text': 'A funny horn'
}]

export {textData, buttonData, screenData, flagData, inventoryData}
