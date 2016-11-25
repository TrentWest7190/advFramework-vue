class ScreenCompiler {
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
    return Object.assign(buttonObject, this.getByAttribute(this.buttonData, buttonObject.buttonId, 'buttonId'))
  }

  compileButtonsForScreen (screenButtons) {
    return screenButtons.map(this.compileSingleButton, this)
  }

  compileFlags () {
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

  getByAttribute (array, match, attr) {
    return array.find(child => child[attr] === match)
  }
}

export default ScreenCompiler
