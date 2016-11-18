import _ from 'lodash'

const ENUM_TOEND = 'toEnd'
const ENUM_LOOP = 'loop'

export default class {
  constructor (textObj, onlyString) {
    this.textType = onlyString ? this.setupTextType(textObj) : this.setupTextType(textObj.text)
    this.textStore = this.setupText(textObj.text, this.textType)
    this.displayType = textObj.displayType || 'static'
    this.pointer = this.getTextType() === 'object' ? 'default' : 0
    this.loadedText = []
    this.loadTextFromStore()
  }

  setupTextType (textObj) {
    if (_.isArray(textObj)) return 'array'
    else return typeof textObj
  }

  getTextType () {
    return this.textType
  }

  setupText (textObj, textType) {
    if (textType === 'string' || textType === 'object') return textObj
    if (textType === 'array') return this.textArrayToObject(textObj)
  }

  loadTextFromStore (pointer = this.pointer) {
    // if the textStore is a string, there's only one thing to load
    if (this.getTextType() === 'string') this.loadedText.push(this.textStore)
    // if the textStore is an object or array, load it from the pointer
    else this.loadedText[0] = this.textStore[pointer]

    // if the textStore loops or goes to the end, increment the pointer
    // so that the next time this is called it will pull the subsequent value from the store
    if (this.displayType === ENUM_LOOP || this.displayType === ENUM_TOEND) this.incrementPointer()
  }

  addTextFromChild (childText) {
    this.loadedText.push(childText.loadTextFromStore())
  }

  getLoadedText (index = 0) {
    return this.loadedText[index]
  }

  incrementPointer () {
    let storeSize = _.keys(this.textStore).length
    if (this.pointer++ >= storeSize - 1 && this.displayType === ENUM_LOOP) this.pointer = 0
    else this.pointer = storeSize - 1
    return this.pointer
  }

  textArrayToObject (textArray) {
    let counter = 0
    return _.transform(textArray, function (result, value) {
      result[counter++] = value
      return result
    }, {})
  }
}
