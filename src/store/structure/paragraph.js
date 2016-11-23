// import _ from 'lodash'

class Paragraph {
  constructor (paragraph) {
    if (typeof paragraph === 'string') {
      this.content = paragraph
    }
    for (var property in paragraph) {
      this[property] = paragraph[property]
    }
  }
}

export default Paragraph
