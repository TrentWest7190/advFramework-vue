import _ from 'lodash'

class ScreenCompiler {
  constructor (data) {
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
      var compiledParagraph = _.merge(uncompiledParagraph, this.findDataObject(this.textData, uncompiledParagraph, 'paragraphId'))
      compiledParagraphsForScreen.push(compiledParagraph)
    }
    return compiledParagraphsForScreen
  }

  compileButtonsForScreen (screenButtons) {
    var compiledButtonsForScreen = []
    for (var index in screenButtons) {
      var uncompiledButton = screenButtons[index]
      var compiledButton = _.merge(uncompiledButton, this.findDataObject(this.buttonData, uncompiledButton, 'buttonId'))
      compiledButtonsForScreen.push(compiledButton)
    }
    return compiledButtonsForScreen
  }

  compileFlags () {
    return _.reduce(this.flagData, function (endObj, flag) {
      endObj[flag.flagName] = flag.defaultValue
      return endObj
    }, {})
  }

  findDataObject (whatToSearch, findWithin, searchFor) {
    return _.find(whatToSearch, function (value) {
      return findWithin[searchFor] === value[searchFor]
    })
  }
}

export default ScreenCompiler
