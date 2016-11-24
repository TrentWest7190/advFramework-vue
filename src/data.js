const textData = [
  {
    'paragraphId': 1,
    'textContent': 'The first test string.'
  },
  {
    'paragraphId': 2,
    'textContent': '%{isTestFlagTrue}',
    'replacements':
    {
      'isTestFlagTrue':
      {
        'condition': [
          {
            'type': 'flag'
            'playerObject': 'testFlag',
            'condition': 'is',
            'value': true
          }
        ],
        'evaluateTrue': 'the flag is true',
        'evaluateFalse': 'the flag is false'
      }
    }
  }
]

const buttonData = [{
  'buttonId': 1,
  'text': 'go forward',
  'action': [{
    'type': 'loadScreen',
    'target': 2
  }]
}, {
  'buttonId': 2,
  'text': 'go back',
  'action': [{
    'type': 'loadScreen',
    'target': 1
  }]
}, {
  'buttonId': 3,
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
  'buttonId': 4,
  'text': 'show up'
}, {
  'buttonId': 5,
  'text': 'counter is equal'
}, {
  'buttonId': 6,
  'text': 'counter is less'
}, {
  'buttonId': 7,
  'text': 'counter is greater'
}, {
  'buttonId': 8,
  'text': '3rd screen',
  'action': [{
    'type': 'loadScreen',
    'target': 3
  }]
}, {
  'buttonId': 9,
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
  'buttonId': 10,
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
  'buttonId': 11,
  'text': 'pick up horn',
  'action': [{
    'type': 'getItem',
    'target': {
      'itemName': 'horn',
      'amount': 1
    }

  }]
}, {
  'buttonId': 12,
  'text': 'play horn',
  'action': [{
    'type': 'displayText',
    'target': {
      'buttonId': 5
    }
  }]
}, {
  'buttonId': 13,
  'text': 'drop horn',
  'action': [{
    'type': 'dropItem',
    'target': {
      'itemName': 'horn'
    }
  }]
}, {
  'buttonId': 14,
  'text': 'cycle text',
  'action': [{
    'type': 'cycleText'
  }]
}, {
  'buttonId': 15,
  'text': 'load new text',
  'action': [{
    'type': 'loadText',
    'target': 'second'
  }]
}, {
  'buttonId': 16,
  'text': 'bash horn',
  'action': [{
    'type': 'useItem',
    'target': {
      'itemName': 'horn',
      'subtractUses': 1
    }
  },
    {
      'type': 'displayText',
      'target': 'You pound out the horn into a fine mist'
    }]
}]

const screenData = [
  {
    'screenId': 1,
    'paragraphs': [
      {
        'paragraphId': 1
      }
    ],
    'buttons': [
      {
        'buttonId': 1
      },
      {
        'buttonId': 3
      }
    ]
  },
  {
    'screenId': 2,
    'paragraphs': [
      {
        'paragraphId': 2
      }
    ],
    'buttons': [
      {
        'buttonId': 2
      },
      {
        'buttonId': 4,
        'conditional': [
          {
            'flag': 'testFlag',
            'condition': 'is',
            'value': true
          }
        ]
      },
      {
        'buttonId': 8
      }
    ]
  },
  {
    'screenId': 3,
    'paragraphs': [
      {
        'paragraphId': 3,
        'conditional': [
          {
            'flag': 'testFlag',
            'condition': 'is',
            'value': true
          }
        ]
      }
    ],
    'buttons': [
      {
        'buttonId': 5,
        'conditional': [
          {
            'flag': 'testCounter',
            'condition': 'is',
            'value': 10
          }
        ]
      },
      {
        'buttonId': 6,
        'conditional': [
          {
            'flag': 'testCounter',
            'condition': 'lessThan',
            'value': 10
          }
        ]
      },
      {
        'buttonId': 7,
        'conditional': [
          {
            'flag': 'testCounter',
            'condition': 'greaterThan',
            'value': 10
          }
        ]
      },
      {
        'buttonId': 9
      },
      {
        'buttonId': 10
      }
    ]
  },
  {
    'screenId': 4,
    'paragraphs': [
      {
        'paragraphId': 4
      }
    ],
    'buttons': [
      {
        'buttonId': 11
      },
      {
        'buttonId': 12,
        'conditional': [
          {
            'type': 'inventory',
            'condition': 'has',
            'value': 'horn'
          }
        ]
      },
      {
        'buttonId': 13,
        'conditional': [
          {
            'type': 'inventory',
            'condition': 'has',
            'value': 'horn'
          }
        ]
      },
      {
        'buttonId': 16,
        'conditional': [
          {
            'type': 'inventory',
            'condition': 'has',
            'value': 'horn'
          }
        ]
      }
    ]
  },
  {
    'screenId': 5,
    'paragraphs': [
      {
        'paragraphId': 7
      }
    ],
    'buttons': [
      {
        'buttonId': 15
      }
    ]
  }
]

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
