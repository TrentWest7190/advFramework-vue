class StoryBuilder {
  constructor (data) {
    if (data) {
      this.fillData(data)
    }
  }

  fillData (data) {
    this.compiledScreens = []
    this.screenData = data.screenData
    this.textData = data.textData
    this.buttonData = data.buttonData
    this.flagData = data.flagData
    this.inventoryData = data.inventoryData
    this.config = data.config
  }

  compileScreens () {
    return this.screenData.map(this.compileSingleScreen, this)
  }

  compileSingleScreen (screen) {
    screen.paragraphs = this.compileParagraphsForScreen(screen.paragraphs)
    screen.buttons = this.compileButtonsForScreen(screen.buttons)
    return screen
  }

  compileSingleParagraph (textObject) {
    return typeof textObject === 'string' ? textObject : Object.assign(textObject, this.getByAttribute(this.textData, textObject.paragraphId, 'paragraphId'))
  }

  compileParagraphsForScreen (screenParagraphs) {
    return screenParagraphs.map(this.compileSingleParagraph, this)
  }

  compileSingleButton (buttonObject) {
    let isString = typeof buttonObject === 'string'
    let buttonData = this.getByAttribute(this.buttonData, isString ? buttonObject : buttonObject.buttonId, 'buttonId')
    if (isString) {
      return buttonData
    } else {
      return Object.assign(buttonObject, buttonData)
    }
  }

  compileButtonsForScreen (screenButtonData) {
    return screenButtonData.map(function (button, index, buttonArray) {
      if (typeof button.children !== 'undefined') {
        console.log('Detected button tree with text', button.text)
        button.children = this.compileButtonsForScreen(button.children)
        return button
      } else {
        return this.compileSingleButton(button)
      }
    }, this)
  }

  compileFlags () {
    if (typeof this.flagData === 'undefined') return
    return this.flagData.reduce(function (endObj, flag) {
      endObj[flag.flagName] = flag.defaultValue
      return endObj
    }, {})
  }

  compileItem (itemData) {
    let inventoryItem = JSON.parse(JSON.stringify(itemData))
    Object.assign(inventoryItem, this.getByAttribute(this.inventoryData, inventoryItem.itemName, 'itemName'))
    return inventoryItem
  }

  getInventoryData () {
    return this.inventoryData
  }

  getConfiguration () {
    return this.config
  }

  getByAttribute (array, match, attr) {
    return array.find(child => child[attr] === match)
  }
}

export default StoryBuilder
