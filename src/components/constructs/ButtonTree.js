class ButtonTree {
  constructor (buttonData) {
    this._root = null
  }
}

class ButtonNode {
  constructor (nodeData) {
    this.data = nodeData
    this.parent = null
    this.children = []
  }
}

export default ButtonTree
