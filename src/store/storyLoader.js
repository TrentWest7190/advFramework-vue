import $ from 'jquery'

class StoryLoader {
  constructor (storyName) {
    this.storyName = storyName
  }

  loadStory (storyName = this.storyName) {
    return $.ajax('/static/stories/' + storyName, {async: false})
  }
}

export default StoryLoader
