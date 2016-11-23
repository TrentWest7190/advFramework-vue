import Paragraph from './structure/paragraph'
import _ from 'lodash'

class ScreenCompiler {
  constructor (data) {
    this.compiledScreens = []
    this.screenData = data.screenData
    this.textData = data.textData
    this.buttonData = data.buttonData
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
      var compiledParagraph = new Paragraph(_.merge(uncompiledParagraph, this.findDataObject(this.textData, uncompiledParagraph, 'paragraphId')))
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

  findDataObject (whatToSearch, findWithin, searchFor) {
    return _.find(whatToSearch, function (value) {
      return findWithin[searchFor] === value[searchFor]
    })
  }
}

export default ScreenCompiler
