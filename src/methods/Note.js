export default class Note {
  constructor() {
    this.isOpened = false
    this.isFocused = false
    this.isFullScreen = false;
    this.text = "",
    this.isSavedNotes = false
    this.savedNotes = [{ "title":'hey',content:"sample note" },{ "title":'This is my second boo',content:"sample second note hehehe " }]
  }
}
