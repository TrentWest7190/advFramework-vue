const ENUM_STATIC = 'static'
const ENUM_LOOP = 'loop'

export default class {
  constructor (textObj) {
    this.id = textObj.id
    this.textType = typeof textObj.text
    this.text = textObj.text
    this.displayType = textObj.displayType || 'static'
    this.pointer = 0
  }

  getId () {
    return this.id
  }

  getText () {
    if (this.textType === 'string') {
      return this.text
    } else {
      if (this.displayType === ENUM_STATIC) return this.text[this.pointer]
      else if (this.displayType === ENUM_LOOP) return this.text[this.pointer++]
    }
  }

  getDisplayType () {
    return this.displayType
  }
}
