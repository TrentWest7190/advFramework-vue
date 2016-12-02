class ButtonTree {
  constructor (buttonData) {
    this.currentNode = buttonData
    this.parent = null
  }

  traverseDown (nodeName) {
    this.parent = this.currentNode
    this.currentNode = this.currentNode[nodeName]
  }

  getCurrentNode () {
    return this.currentNode
  }
}
export default ButtonTree
