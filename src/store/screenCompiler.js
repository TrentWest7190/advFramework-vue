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
  }

  compileScreens () {
    for (var index in this.screenData) {
      var screen = this.screenData[index]
      screen.paragraphs = this.compileParagraphsForScreen(screen.paragraphs)
      screen.buttons = this.compileButtonsForScreen(screen.buttons)
      this.compiledScreens.push(screen)
    }
    return this.compiledScreens
  }

  compileParagraphsForScreen (screenParagraphs) {
    var compiledParagraphsForScreen = []
    for (var index in screenParagraphs) {
      var uncompiledParagraph = screenParagraphs[index]
      var compiledParagraph = Object.assign(uncompiledParagraph, this.getByAttribute(this.textData, uncompiledParagraph.paragraphId, 'paragraphId'))
      compiledParagraphsForScreen.push(compiledParagraph)
    }
    return compiledParagraphsForScreen
  }

  compileButtonsForScreen (screenButtons) {
    var compiledButtonsForScreen = []
    for (var index in screenButtons) {
      var uncompiledButton = screenButtons[index]
      var compiledButton = Object.assign(uncompiledButton, this.getByAttribute(this.buttonData, uncompiledButton.buttonId, 'buttonId'))
      compiledButtonsForScreen.push(compiledButton)
    }
    return compiledButtonsForScreen
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
